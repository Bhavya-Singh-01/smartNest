// Phase 2 database rules: homes, rooms, catalogue, devices, saved plans.
// Every private row must be visible and editable only by its owner.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { admin, anonClient, deleteTestUsers, makeAdmin, newUser, type TestUser } from "./helpers.ts";

let alice: TestUser;
let bob: TestUser;
let staff: TestUser;
let aliceHome: string;
let aliceRoom: string;
let bobRoom: string;
let aliceDevice: string;
let catalogBulb: { id: string; category: string };

const planArgs = (items: unknown[], planId: string | null = null) => ({
  p_plan_id: planId,
  p_name: "Starter plan",
  p_home_type: "apartment" as const,
  p_rooms: 3,
  p_priorities: ["lighting"],
  p_budget: 25000,
  p_existing: [] as string[],
  p_warnings: [] as string[],
  p_items: items,
});
const items = [
  { item_key: "bulb", name: "Smart Bulb", category: "Lighting", qty: 3, unit_price: 700, device_category: "lighting", reason: "One per room." },
  { item_key: "hub", name: "Smart Hub", category: "Hub", qty: 1, unit_price: 3500, note: "", device_category: "hub" },
];

before(async () => {
  [alice, bob, staff] = await Promise.all([newUser("alice2"), newUser("bob2"), newUser("staff2")]);
  await makeAdmin(staff);

  const home = await alice.client.from("homes").insert({ name: "Alice Flat", home_type: "apartment", city: "Pune" }).select("id").single();
  if (home.error) throw home.error;
  aliceHome = home.data.id;
  const room = await alice.client.from("rooms").insert({ home_id: aliceHome, name: "Living Room" }).select("id").single();
  if (room.error) throw room.error;
  aliceRoom = room.data.id;

  const bobHome = await bob.client.from("homes").insert({ name: "Bob House", home_type: "house" }).select("id").single();
  if (bobHome.error) throw bobHome.error;
  const bRoom = await bob.client.from("rooms").insert({ home_id: bobHome.data.id, name: "Garage" }).select("id").single();
  if (bRoom.error) throw bRoom.error;
  bobRoom = bRoom.data.id;

  const cat = await alice.client.from("device_catalog").select("id, category").eq("slug", "sample-smart-bulb").single();
  if (cat.error) throw cat.error;
  catalogBulb = cat.data;

  const dev = await alice.client
    .from("user_devices")
    .insert({ name: "Sofa lamp", category: "lighting", room_id: aliceRoom, catalog_id: catalogBulb.id, purchase_date: "2026-01-10", warranty_expiry: "2027-01-10" })
    .select("id")
    .single();
  if (dev.error) throw dev.error;
  aliceDevice = dev.data.id;
});

after(deleteTestUsers);

// ---------- homes & rooms ----------
test("a customer has at most one home", async () => {
  const { error } = await alice.client.from("homes").insert({ name: "Second home", home_type: "house" });
  assert.ok(error, "second home must be rejected");
});

test("homes and rooms are invisible to other customers", async () => {
  const homes = await bob.client.from("homes").select("id").eq("id", aliceHome);
  const rooms = await bob.client.from("rooms").select("id").eq("id", aliceRoom);
  assert.deepEqual(homes.data, []);
  assert.deepEqual(rooms.data, []);
});

test("customers cannot edit or delete another customer's home", async () => {
  await bob.client.from("homes").update({ name: "Hijacked" }).eq("id", aliceHome);
  await bob.client.from("homes").delete().eq("id", aliceHome);
  const { data } = await admin.from("homes").select("name").eq("id", aliceHome).single();
  assert.equal(data?.name, "Alice Flat");
});

test("customers cannot add rooms to another customer's home", async () => {
  const { error } = await bob.client.from("rooms").insert({ home_id: aliceHome, name: "Sneaky room" });
  assert.ok(error, "room insert into someone else's home must fail");
});

test("room names are unique within a home (case-insensitive)", async () => {
  const { error } = await alice.client.from("rooms").insert({ home_id: aliceHome, name: "  living room " });
  assert.ok(error);
});

test("home ownership cannot be transferred", async () => {
  const { error } = await alice.client.from("homes").update({ owner_id: bob.id }).eq("id", aliceHome);
  assert.ok(error, "owner_id is not updatable");
});

// ---------- catalogue ----------
test("anyone can read the catalogue; only admins can change it", async () => {
  const anon = await anonClient().from("device_catalog").select("slug").eq("slug", "sample-smart-hub");
  assert.equal(anon.data?.length, 1);

  await alice.client.from("device_catalog").update({ name: "Tampered" }).eq("id", catalogBulb.id);
  const { error: insertError } = await alice.client.from("device_catalog").insert({ slug: "fake-item", category: "other", name: "Fake" });
  assert.ok(insertError, "customer insert must fail");
  const after1 = await admin.from("device_catalog").select("name").eq("id", catalogBulb.id).single();
  assert.notEqual(after1.data?.name, "Tampered");

  const staffInsert = await staff.client.from("device_catalog").insert({ slug: "staff-test-item", category: "other", name: "Staff item" }).select("id").single();
  assert.equal(staffInsert.error, null);
  await staff.client.from("device_catalog").delete().eq("id", staffInsert.data!.id);
});

// ---------- devices ----------
test("devices are visible only to their owner (and support staff)", async () => {
  const asBob = await bob.client.from("user_devices").select("id").eq("id", aliceDevice);
  assert.deepEqual(asBob.data, []);
  const asStaff = await staff.client.from("user_devices").select("id").eq("id", aliceDevice);
  assert.equal(asStaff.data?.length, 1);
});

test("support staff can read but not edit customer devices", async () => {
  await staff.client.from("user_devices").update({ name: "Edited by staff" }).eq("id", aliceDevice);
  const { data } = await admin.from("user_devices").select("name").eq("id", aliceDevice).single();
  assert.equal(data?.name, "Sofa lamp");
});

test("a device can't be placed in someone else's room", async () => {
  const insert = await bob.client.from("user_devices").insert({ name: "Spy cam", category: "camera", room_id: aliceRoom });
  assert.ok(insert.error, "insert into another customer's room must fail");
  const move = await alice.client.from("user_devices").update({ room_id: bobRoom }).eq("id", aliceDevice);
  assert.ok(move.error, "moving a device into another customer's room must fail");
});

test("devices can't be created for another user", async () => {
  const { error } = await bob.client.from("user_devices").insert({ name: "Planted", category: "plug", owner_id: alice.id });
  assert.ok(error);
});

test("warranty expiry can't be before the purchase date", async () => {
  const { error } = await alice.client.from("user_devices").insert({ name: "Bad dates", category: "plug", purchase_date: "2026-05-01", warranty_expiry: "2026-01-01" });
  assert.ok(error);
});

test("deleting a room keeps its devices, unassigned", async () => {
  const room = await alice.client.from("rooms").insert({ home_id: aliceHome, name: "Study" }).select("id").single();
  const dev = await alice.client.from("user_devices").insert({ name: "Desk plug", category: "plug", room_id: room.data!.id }).select("id").single();
  await alice.client.from("rooms").delete().eq("id", room.data!.id);
  const { data } = await alice.client.from("user_devices").select("room_id").eq("id", dev.data!.id).single();
  assert.equal(data?.room_id, null);
});

test("other customers can't edit or delete a device", async () => {
  await bob.client.from("user_devices").update({ name: "x" }).eq("id", aliceDevice);
  await bob.client.from("user_devices").delete().eq("id", aliceDevice);
  const { data } = await admin.from("user_devices").select("name").eq("id", aliceDevice).single();
  assert.equal(data?.name, "Sofa lamp");
});

// ---------- plans ----------
test("save_home_plan stores a plan with its items and computed total", async () => {
  const { data: planId, error } = await alice.client.rpc("save_home_plan", planArgs(items));
  assert.equal(error, null);
  const plan = await alice.client.from("home_plans").select("total, plan_items(position, qty, line_total)").eq("id", planId).single();
  assert.equal(plan.data?.total, 3 * 700 + 3500);
  assert.equal(plan.data?.plan_items.length, 2);
});

test("updating a plan replaces its items atomically", async () => {
  const { data: planId } = await alice.client.rpc("save_home_plan", planArgs(items));
  const { error } = await alice.client.rpc("save_home_plan", { ...planArgs([items[0]], planId), p_name: "Renamed" });
  assert.equal(error, null);
  const plan = await alice.client.from("home_plans").select("name, total, plan_items(id)").eq("id", planId).single();
  assert.deepEqual([plan.data?.name, plan.data?.total, plan.data?.plan_items.length], ["Renamed", 2100, 1]);
});

test("a plan over budget is rejected and nothing is saved", async () => {
  const before = await alice.client.from("home_plans").select("id");
  const { error } = await alice.client.rpc("save_home_plan", { ...planArgs([{ item_key: "lock", name: "Lock", category: "Security", qty: 3, unit_price: 12000 }]), p_budget: 30000 });
  assert.ok(error, "36,000 total in a 30,000 budget must fail");
  const after2 = await alice.client.from("home_plans").select("id");
  assert.equal(after2.data?.length, before.data?.length);
});

test("invalid priorities are rejected", async () => {
  const { error } = await alice.client.rpc("save_home_plan", { ...planArgs(items), p_priorities: ["lighting", "hacking"] });
  assert.ok(error);
});

test("plans are private, and can't be overwritten by another customer", async () => {
  const { data: planId } = await alice.client.rpc("save_home_plan", planArgs(items));
  const read = await bob.client.from("home_plans").select("id").eq("id", planId);
  assert.deepEqual(read.data, []);
  const overwrite = await bob.client.rpc("save_home_plan", { ...planArgs([], planId), p_name: "Stolen" });
  assert.ok(overwrite.error, "updating someone else's plan must fail");
  const itemsInsert = await bob.client.from("plan_items").insert({ plan_id: planId, position: 99, item_key: "x", name: "x", category: "x", qty: 1, unit_price: 1, line_total: 1 });
  assert.ok(itemsInsert.error, "adding items to someone else's plan must fail");
  const { data } = await admin.from("home_plans").select("name").eq("id", planId).single();
  assert.equal(data?.name, "Starter plan");
});

test("anonymous visitors can't save plans", async () => {
  const { error } = await anonClient().rpc("save_home_plan", planArgs(items));
  assert.ok(error);
});

// ---------- Phase 4: existing devices, reasons, add to My Home ----------
test("plans store existing devices, warnings and per-item reasons", async () => {
  const { data: planId, error } = await alice.client.rpc("save_home_plan", { ...planArgs(items), p_existing: ["lock"], p_warnings: ["Check your hub"] });
  assert.equal(error, null);
  const { data } = await alice.client.from("home_plans").select("existing, warnings, plan_items(item_key, reason, device_category)").eq("id", planId).single();
  assert.deepEqual(data?.existing, ["lock"]);
  assert.deepEqual(data?.warnings, ["Check your hub"]);
  assert.equal(data?.plan_items.find((i) => i.item_key === "bulb")?.reason, "One per room.");
});

test("unknown 'already own' values are rejected", async () => {
  const { error } = await alice.client.rpc("save_home_plan", { ...planArgs(items), p_existing: ["spaceship"] });
  assert.ok(error);
});

test("add_plan_to_home creates one device per unit, only once", async () => {
  const { data: planId } = await alice.client.rpc("save_home_plan", { ...planArgs(items), p_name: "To my home" });
  const before = await alice.client.from("user_devices").select("id", { count: "exact", head: true });
  const { data: added, error } = await alice.client.rpc("add_plan_to_home", { p_plan_id: planId });
  assert.equal(error, null);
  assert.equal(added, 4, "3 bulbs + 1 hub");
  const after = await alice.client.from("user_devices").select("name, category, notes").like("notes", "Added from plan: To my home");
  assert.deepEqual(after.data?.map((d) => d.name).sort(), ["Smart Bulb 1", "Smart Bulb 2", "Smart Bulb 3", "Smart Hub"]);
  assert.ok(after.data?.every((d) => (d.name.startsWith("Smart Bulb") ? d.category === "lighting" : d.category === "hub")));
  const total = await alice.client.from("user_devices").select("id", { count: "exact", head: true });
  assert.equal((total.count ?? 0) - (before.count ?? 0), 4);

  const again = await alice.client.rpc("add_plan_to_home", { p_plan_id: planId });
  assert.ok(again.error, "a plan can only be added once");
});

test("a customer can't add someone else's plan to their home", async () => {
  const { data: planId } = await alice.client.rpc("save_home_plan", planArgs(items));
  const { error } = await bob.client.rpc("add_plan_to_home", { p_plan_id: planId });
  assert.ok(error);
  const bobDevices = await bob.client.from("user_devices").select("id").like("notes", "Added from plan:%");
  assert.deepEqual(bobDevices.data, []);
});
