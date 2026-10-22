// Database security tests: run as real users against Supabase and verify Row
// Level Security and column privileges. Creates throwaway users, so it refuses
// to run against anything but a local stack unless ALLOW_REMOTE_DB_TESTS=1.
//
//   npx supabase start && npm run test:db
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { admin, anonClient, deleteTestUsers, makeAdmin, newUser, type TestUser } from "./helpers.ts";

let alice: TestUser;
let bob: TestUser;
let staff: TestUser;

before(async () => {
  // Bob tries to self-assign admin through sign-up metadata; it must be ignored.
  [alice, bob, staff] = await Promise.all([
    newUser("alice", { full_name: "Alice Customer" }),
    newUser("bob", { full_name: "Bob Customer", role: "admin" }),
    newUser("staff", { full_name: "Support Staff" }),
  ]);
  // Admin role is granted only with privileged access (secret key here).
  await makeAdmin(staff);
});

after(deleteTestUsers);

test("sign-up creates a customer profile from metadata", async () => {
  const { data, error } = await alice.client.from("profiles").select("full_name, role").eq("id", alice.id).single();
  assert.equal(error, null);
  assert.deepEqual(data, { full_name: "Alice Customer", role: "customer" });
});

test("role in sign-up metadata is ignored", async () => {
  const { data } = await bob.client.from("profiles").select("role").eq("id", bob.id).single();
  assert.equal(data?.role, "customer");
});

test("customers see only their own profile", async () => {
  const { data, error } = await alice.client.from("profiles").select("id");
  assert.equal(error, null);
  assert.deepEqual(data?.map((r) => r.id), [alice.id]);

  const { data: other } = await alice.client.from("profiles").select("id").eq("id", bob.id);
  assert.deepEqual(other, []);
});

test("anonymous visitors can't read profiles", async () => {
  const anon = anonClient();
  const { data, error } = await anon.from("profiles").select("id");
  assert.ok(error || data?.length === 0, "anon must not read any profile");
});

test("customers can edit their name and phone", async () => {
  const { error } = await alice.client.from("profiles").update({ full_name: "Alice R", phone: "+91 98765 43210" }).eq("id", alice.id);
  assert.equal(error, null);
  const { data } = await alice.client.from("profiles").select("full_name, phone").eq("id", alice.id).single();
  assert.deepEqual(data, { full_name: "Alice R", phone: "+91 98765 43210" });
});

test("customers cannot promote themselves to admin", async () => {
  const { error } = await alice.client.from("profiles").update({ role: "admin" }).eq("id", alice.id);
  assert.ok(error, "role update must be rejected");
  assert.match(error.message, /permission denied/i);
  const { data } = await admin.from("profiles").select("role").eq("id", alice.id).single();
  assert.equal(data?.role, "customer");
});

test("customers cannot edit someone else's profile", async () => {
  const { data } = await alice.client.from("profiles").update({ full_name: "Hacked" }).eq("id", bob.id).select();
  assert.deepEqual(data ?? [], []);
  const { data: bobRow } = await admin.from("profiles").select("full_name").eq("id", bob.id).single();
  assert.equal(bobRow?.full_name, "Bob Customer");
});

test("customers cannot insert or delete profiles", async () => {
  const { error: insertError } = await alice.client.from("profiles").insert({ id: crypto.randomUUID(), full_name: "Ghost" });
  assert.ok(insertError, "insert must be rejected");
  await alice.client.from("profiles").delete().eq("id", alice.id);
  const { data } = await admin.from("profiles").select("id").eq("id", alice.id);
  assert.equal(data?.length, 1, "own profile must survive a delete attempt");
});

test("is_admin() reflects the caller's role", async () => {
  const asCustomer = await alice.client.rpc("is_admin");
  const asStaff = await staff.client.rpc("is_admin");
  assert.equal(asCustomer.data, false);
  assert.equal(asStaff.data, true);
});

test("admins can read every profile", async () => {
  const { data, error } = await staff.client.from("profiles").select("id").in("id", [alice.id, bob.id, staff.id]);
  assert.equal(error, null);
  assert.equal(data?.length, 3);
});
