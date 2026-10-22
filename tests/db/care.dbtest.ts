// Phase 3 database rules: SmartNest Care tickets, lifecycle, privacy, photos.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { admin, deleteTestUsers, makeAdmin, newUser, type TestUser } from "./helpers.ts";

let alice: TestUser;
let bob: TestUser;
let staff: TestUser;
let aliceDevice: string;
let bobDevice: string;

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);

async function openTicket(user: TestUser, extra: Record<string, unknown> = {}) {
  const { data, error } = await user.client
    .from("support_tickets")
    .insert({ category: "device_offline", title: "Lamp keeps going offline", description: "The sofa lamp drops off Wi-Fi every evening.", ...extra })
    .select("id, ref, status")
    .single();
  if (error) throw error;
  return data;
}

const staffSet = (user: TestUser, ticketId: string, status: string | null, message: string | null, internal = false) =>
  user.client.rpc("staff_update_ticket", { p_ticket_id: ticketId, p_status: status as never, p_message: message as never, p_internal: internal });

before(async () => {
  [alice, bob, staff] = await Promise.all([newUser("care-alice"), newUser("care-bob"), newUser("care-staff")]);
  await makeAdmin(staff);
  const a = await alice.client.from("user_devices").insert({ name: "Sofa lamp", category: "lighting" }).select("id").single();
  const b = await bob.client.from("user_devices").insert({ name: "Bob plug", category: "plug" }).select("id").single();
  if (a.error || b.error) throw a.error ?? b.error;
  aliceDevice = a.data.id;
  bobDevice = b.data.id;
});

after(deleteTestUsers);

test("a new ticket gets a unique SN-YYYY-NNNNN reference, status submitted and a 'created' entry", async () => {
  const t1 = await openTicket(alice, { device_id: aliceDevice });
  const t2 = await openTicket(alice);
  assert.match(t1.ref, /^SN-\d{4}-\d{5}$/);
  assert.notEqual(t1.ref, t2.ref);
  assert.equal(t1.status, "submitted");
  const { data } = await alice.client.from("ticket_updates").select("kind, to_status, author_role").eq("ticket_id", t1.id);
  assert.deepEqual(data, [{ kind: "created", to_status: "submitted", author_role: "customer" }]);
});

test("customers can't choose the status or reference when opening a ticket", async () => {
  const { error } = await alice.client.from("support_tickets").insert({ category: "other", title: "Sneaky", description: "Trying to skip the queue.", status: "resolved" });
  assert.ok(error, "status is not insertable");
  const { error: refError } = await alice.client.from("support_tickets").insert({ category: "other", title: "Sneaky", description: "Trying to pick a ref.", ref: "SN-0000-00001" });
  assert.ok(refError, "ref is not insertable");
});

test("customers can't open tickets about someone else's device", async () => {
  const { error } = await alice.client.from("support_tickets").insert({ category: "malfunction", title: "Not mine", description: "This is Bob's device actually.", device_id: bobDevice });
  assert.ok(error);
});

test("tickets are private to their owner; staff see all", async () => {
  const t = await openTicket(alice);
  const asBob = await bob.client.from("support_tickets").select("id").eq("id", t.id);
  assert.deepEqual(asBob.data, []);
  const asStaff = await staff.client.from("support_tickets").select("id").eq("id", t.id);
  assert.equal(asStaff.data?.length, 1);
});

test("nobody can update a ticket row directly", async () => {
  const t = await openTicket(alice);
  for (const user of [alice, staff]) {
    const { error } = await user.client.from("support_tickets").update({ status: "closed" }).eq("id", t.id);
    assert.ok(error, "direct status update must fail");
  }
  const { data } = await admin.from("support_tickets").select("status").eq("id", t.id).single();
  assert.equal(data?.status, "submitted");
});

test("customers can't use staff functions", async () => {
  const t = await openTicket(alice);
  const { error } = await staffSet(alice, t.id, "resolved", "Fixed it myself");
  assert.ok(error);
  assert.match(error.message, /not allowed/);
  const { error: assignError } = await alice.client.rpc("assign_ticket_to_me", { p_ticket_id: t.id });
  assert.ok(assignError);
});

test("staff move tickets through the lifecycle; every step is recorded with author and time", async () => {
  const t = await openTicket(alice);
  for (const [status, msg] of [["under_review", "Looking into it"], ["in_progress", "Router channel is congested"], ["resolved", "Moved to channel 6"]]) {
    const { error } = await staffSet(staff, t.id, status, msg);
    assert.equal(error, null, `${status}: ${error?.message}`);
  }
  const { data: ticket } = await alice.client.from("support_tickets").select("status, resolved_at").eq("id", t.id).single();
  assert.equal(ticket?.status, "resolved");
  assert.ok(ticket?.resolved_at);
  const { data: updates } = await alice.client.from("ticket_updates").select("kind, from_status, to_status, author_id, author_role, created_at").eq("ticket_id", t.id).order("created_at");
  assert.deepEqual(updates?.map((u) => `${u.from_status ?? ""}>${u.to_status}`), [">submitted", "submitted>under_review", "under_review>in_progress", "in_progress>resolved"]);
  assert.ok(updates?.slice(1).every((u) => u.author_id === staff.id && u.author_role === "admin" && u.created_at));
});

test("invalid transitions are rejected", async () => {
  const t = await openTicket(alice);
  const skip = await staffSet(staff, t.id, "resolved", null);
  assert.ok(skip.error, "submitted → resolved skips review");
  await staffSet(staff, t.id, "closed", "Duplicate of an earlier ticket");
  const reopen = await staffSet(staff, t.id, "in_progress", null);
  assert.ok(reopen.error, "closed is final");
  const reply = await staffSet(staff, t.id, null, "Anything else?");
  assert.ok(reply.error, "no replies on closed tickets");
});

test("internal notes are hidden from the customer", async () => {
  const t = await openTicket(alice);
  await staffSet(staff, t.id, null, "Customer's router is a known-bad model", true);
  await staffSet(staff, t.id, null, "Can you tell us your router model?");
  const asCustomer = await alice.client.from("ticket_updates").select("kind, message").eq("ticket_id", t.id).order("created_at");
  assert.deepEqual(asCustomer.data?.map((u) => u.kind), ["created", "staff_reply"]);
  const asStaff = await staff.client.from("ticket_updates").select("kind").eq("ticket_id", t.id);
  assert.ok(asStaff.data?.some((u) => u.kind === "internal_note"));
});

test("a status change can't be marked internal", async () => {
  const t = await openTicket(alice);
  const { error } = await staffSet(staff, t.id, "under_review", "secret move", true);
  assert.ok(error);
});

test("customers reply on their own tickets only", async () => {
  const t = await openTicket(alice);
  assert.equal((await alice.client.rpc("customer_reply", { p_ticket_id: t.id, p_message: "It's a TP-Link Archer C6." })).error, null);
  const bobReply = await bob.client.rpc("customer_reply", { p_ticket_id: t.id, p_message: "hijack" });
  assert.ok(bobReply.error);
  const empty = await alice.client.rpc("customer_reply", { p_ticket_id: t.id, p_message: "   " });
  assert.ok(empty.error, "empty messages are rejected");
});

test("customer can reopen a resolved ticket, or confirm it with a rating", async () => {
  const t = await openTicket(alice);
  await staffSet(staff, t.id, "under_review", null);
  await staffSet(staff, t.id, "resolved", "Please try now");

  const early = await alice.client.rpc("customer_confirm_resolution", { p_ticket_id: t.id, p_rating: 9, p_comment: "" });
  assert.ok(early.error, "rating must be 1-5");

  const reopen = await alice.client.rpc("customer_reopen_ticket", { p_ticket_id: t.id, p_message: "Still dropping at night." });
  assert.equal(reopen.error, null);
  assert.equal((await alice.client.from("support_tickets").select("status").eq("id", t.id).single()).data?.status, "under_review");

  const notResolved = await alice.client.rpc("customer_confirm_resolution", { p_ticket_id: t.id, p_rating: 5, p_comment: "" });
  assert.ok(notResolved.error, "can only confirm a resolved ticket");

  await staffSet(staff, t.id, "resolved", "Replaced the bulb");
  const confirm = await alice.client.rpc("customer_confirm_resolution", { p_ticket_id: t.id, p_rating: 5, p_comment: "Quick and clear help." });
  assert.equal(confirm.error, null);
  const { data } = await alice.client.from("support_tickets").select("status, closed_at, user_feedback(rating, comment)").eq("id", t.id).single();
  assert.equal(data?.status, "closed");
  assert.ok(data?.closed_at);
  assert.deepEqual(data?.user_feedback, { rating: 5, comment: "Quick and clear help." });
});

test("a customer can't confirm or reopen someone else's ticket", async () => {
  const t = await openTicket(alice);
  await staffSet(staff, t.id, "under_review", null);
  await staffSet(staff, t.id, "resolved", null);
  assert.ok((await bob.client.rpc("customer_confirm_resolution", { p_ticket_id: t.id, p_rating: 1, p_comment: "" })).error);
  assert.ok((await bob.client.rpc("customer_reopen_ticket", { p_ticket_id: t.id, p_message: "nope" })).error);
});

test("staff assignment is recorded as an internal entry", async () => {
  const t = await openTicket(alice);
  assert.equal((await staff.client.rpc("assign_ticket_to_me", { p_ticket_id: t.id })).error, null);
  const { data } = await staff.client.from("support_tickets").select("assigned_to").eq("id", t.id).single();
  assert.equal(data?.assigned_to, staff.id);
  const customerView = await alice.client.from("ticket_updates").select("kind").eq("ticket_id", t.id);
  assert.ok(!customerView.data?.some((u) => u.kind === "assignment"));
});

test("profiles now carry the sign-up email for support contact", async () => {
  const { data } = await staff.client.from("profiles").select("email").eq("id", alice.id).single();
  assert.equal(data?.email, alice.email);
});

// ---------- photos ----------
test("customers upload photos only into their own folder", async () => {
  const own = await alice.client.storage.from("ticket-photos").upload(`${alice.id}/${randomUUID()}.png`, PNG, { contentType: "image/png" });
  assert.equal(own.error, null, own.error?.message);
  const other = await alice.client.storage.from("ticket-photos").upload(`${bob.id}/${randomUUID()}.png`, PNG, { contentType: "image/png" });
  assert.ok(other.error, "uploading into another customer's folder must fail");
});

test("the bucket rejects non-images and files over 5 MB", async () => {
  const text = await alice.client.storage.from("ticket-photos").upload(`${alice.id}/${randomUUID()}.png`, new TextEncoder().encode("not an image"), { contentType: "text/plain" });
  assert.ok(text.error, "wrong type");
  const big = await alice.client.storage.from("ticket-photos").upload(`${alice.id}/${randomUUID()}.png`, new Uint8Array(5 * 1024 * 1024 + 1), { contentType: "image/png" });
  assert.ok(big.error, "too large");
});

test("ticket photos are readable by the owner and staff, not other customers", async () => {
  const path = `${alice.id}/${randomUUID()}.png`;
  await alice.client.storage.from("ticket-photos").upload(path, PNG, { contentType: "image/png" });
  const t = await openTicket(alice, { photo_path: path });
  assert.ok(t.id);

  assert.equal((await alice.client.storage.from("ticket-photos").createSignedUrl(path, 60)).error, null);
  assert.equal((await staff.client.storage.from("ticket-photos").createSignedUrl(path, 60)).error, null);
  const asBob = await bob.client.storage.from("ticket-photos").download(path);
  assert.ok(asBob.error, "other customers can't read the photo");
});

test("a ticket can only reference a photo in the owner's folder", async () => {
  const { error } = await alice.client.from("support_tickets").insert({ category: "other", title: "Photo trick", description: "Pointing at Bob's photo path.", photo_path: `${bob.id}/${randomUUID()}.png` });
  assert.ok(error);
});
