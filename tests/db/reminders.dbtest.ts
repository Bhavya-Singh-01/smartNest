// Phase 5: maintenance reminders and device manual links.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { admin, deleteTestUsers, newUser, type TestUser } from "./helpers.ts";

let alice: TestUser;
let bob: TestUser;
let aliceDevice: string;
let bobDevice: string;

before(async () => {
  [alice, bob] = await Promise.all([newUser("rem-alice"), newUser("rem-bob")]);
  const a = await alice.client.from("user_devices").insert({ name: "Front lock", category: "lock" }).select("id").single();
  const b = await bob.client.from("user_devices").insert({ name: "Bob plug", category: "plug" }).select("id").single();
  if (a.error || b.error) throw a.error ?? b.error;
  aliceDevice = a.data.id;
  bobDevice = b.data.id;
});

after(deleteTestUsers);

test("reminders are private to their owner", async () => {
  const { data } = await alice.client.from("maintenance_reminders").insert({ device_id: aliceDevice, title: "Replace batteries", due_date: "2026-11-01" }).select("id").single();
  const asBob = await bob.client.from("maintenance_reminders").select("id").eq("id", data!.id);
  assert.deepEqual(asBob.data, []);
});

test("reminders can only be attached to your own devices", async () => {
  const { error } = await alice.client.from("maintenance_reminders").insert({ device_id: bobDevice, title: "Sneaky", due_date: "2026-11-01" });
  assert.ok(error);
});

test("completing a repeating reminder schedules the next one from its due date", async () => {
  const { data } = await alice.client.from("maintenance_reminders").insert({ device_id: aliceDevice, title: "Clean camera lens", due_date: "2026-10-15", repeat_months: 6 }).select("id").single();
  assert.equal((await alice.client.rpc("complete_reminder", { p_reminder_id: data!.id })).error, null);
  const { data: rows } = await alice.client.from("maintenance_reminders").select("due_date, completed_at").eq("title", "Clean camera lens").order("due_date");
  assert.equal(rows?.length, 2);
  assert.ok(rows?.[0].completed_at);
  assert.deepEqual([rows?.[1].due_date, rows?.[1].completed_at], ["2027-04-15", null]);
});

test("completing a one-off reminder doesn't create another", async () => {
  const { data } = await alice.client.from("maintenance_reminders").insert({ device_id: aliceDevice, title: "Firmware check", due_date: "2026-10-20" }).select("id").single();
  await alice.client.rpc("complete_reminder", { p_reminder_id: data!.id });
  const { data: rows } = await alice.client.from("maintenance_reminders").select("id").eq("title", "Firmware check");
  assert.equal(rows?.length, 1);
  const again = await alice.client.rpc("complete_reminder", { p_reminder_id: data!.id });
  assert.ok(again.error, "already completed");
});

test("another customer can't complete or delete your reminder", async () => {
  const { data } = await alice.client.from("maintenance_reminders").insert({ device_id: aliceDevice, title: "Test smoke alarm", due_date: "2026-12-01" }).select("id").single();
  assert.ok((await bob.client.rpc("complete_reminder", { p_reminder_id: data!.id })).error);
  await bob.client.from("maintenance_reminders").delete().eq("id", data!.id);
  const { data: still } = await admin.from("maintenance_reminders").select("completed_at").eq("id", data!.id).single();
  assert.equal(still?.completed_at, null);
});

test("deleting a device removes its reminders", async () => {
  const d = await alice.client.from("user_devices").insert({ name: "Temp sensor", category: "other" }).select("id").single();
  await alice.client.from("maintenance_reminders").insert({ device_id: d.data!.id, title: "Check battery", due_date: "2026-11-11" });
  await alice.client.from("user_devices").delete().eq("id", d.data!.id);
  const { data } = await admin.from("maintenance_reminders").select("id").eq("device_id", d.data!.id);
  assert.deepEqual(data, []);
});

test("manual links must be https", async () => {
  const bad = await alice.client.from("user_devices").update({ manual_url: "javascript:alert(1)" }).eq("id", aliceDevice);
  assert.ok(bad.error);
  const good = await alice.client.from("user_devices").update({ manual_url: "https://example.com/manual.pdf" }).eq("id", aliceDevice);
  assert.equal(good.error, null);
});
