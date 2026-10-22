import "server-only";
import { createClient } from "@/lib/supabase/server";
import { WARRANTY_SOON_DAYS } from "@/lib/devices";

// Scoped to userId: RLS lets support staff read every customer's rows, but My SmartNest shows only the user's own.

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not load ${what}: ${error.message}`);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getHome(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homes")
    .select("id, name, home_type, city, rooms(id, name, created_at, user_devices(count))")
    .eq("owner_id", userId)
    .order("created_at", { referencedTable: "rooms", ascending: true })
    .maybeSingle();
  if (error) fail("your home", error);
  if (!data) return null;
  return {
    ...data,
    rooms: data.rooms.map((r) => ({ id: r.id, name: r.name, deviceCount: r.user_devices[0]?.count ?? 0 })),
  };
}

export async function listRooms(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, homes!inner(owner_id)")
    .eq("homes.owner_id", userId)
    .order("created_at");
  if (error) fail("rooms", error);
  return data.map(({ id, name }) => ({ id, name }));
}

export async function listCatalog() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("device_catalog")
    .select("id, name, category, brand, model, connectivity, est_price_inr, is_sample")
    .eq("active", true)
    .order("category")
    .order("name");
  if (error) fail("the device catalogue", error);
  return data;
}

const DEVICE_FIELDS =
  "id, name, category, brand, model, purchase_date, warranty_expiry, notes, manual_url, created_at, updated_at, room_id, catalog_id, rooms(name), device_catalog(name, connectivity, is_sample)";

export async function listDevices(userId: string, roomId?: string) {
  const supabase = await createClient();
  let query = supabase.from("user_devices").select(DEVICE_FIELDS).eq("owner_id", userId).order("created_at", { ascending: false });
  if (roomId === "none") query = query.is("room_id", null);
  else if (roomId) query = query.eq("room_id", roomId);
  const { data, error } = await query;
  if (error) fail("your devices", error);
  return data;
}

export async function getDevice(userId: string, id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("user_devices").select(DEVICE_FIELDS).eq("owner_id", userId).eq("id", id).maybeSingle();
  if (error) fail("this device", error);
  return data;
}

export async function listPlans(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("home_plans")
    .select("id, name, home_type, rooms, priorities, budget, total, updated_at, plan_items(count)")
    .eq("owner_id", userId)
    .order("updated_at", { ascending: false });
  if (error) fail("your plans", error);
  return data.map((p) => ({ ...p, itemCount: p.plan_items[0]?.count ?? 0 }));
}

export async function getPlan(userId: string, id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("home_plans")
    .select("id, name, home_type, rooms, priorities, budget, total, existing, warnings, added_to_home_at, created_at, updated_at, plan_items(position, item_key, name, category, qty, unit_price, line_total, note, reason, device_catalog(is_sample, source_url))")
    .eq("owner_id", userId)
    .eq("id", id)
    .order("position", { referencedTable: "plan_items" })
    .maybeSingle();
  if (error) fail("this plan", error);
  return data;
}

export async function getDashboard(userId: string, today: string) {
  const supabase = await createClient();
  const soon = new Date(today + "T00:00:00Z");
  soon.setUTCDate(soon.getUTCDate() + WARRANTY_SOON_DAYS);

  const [devices, plans, recentDevices, recentPlans, warranties, home] = await Promise.all([
    supabase.from("user_devices").select("id", { count: "exact", head: true }).eq("owner_id", userId),
    supabase.from("home_plans").select("id", { count: "exact", head: true }).eq("owner_id", userId),
    supabase.from("user_devices").select("id, name, category, created_at, rooms(name)").eq("owner_id", userId).order("created_at", { ascending: false }).limit(4),
    supabase.from("home_plans").select("id, name, total, budget, updated_at").eq("owner_id", userId).order("updated_at", { ascending: false }).limit(3),
    supabase
      .from("user_devices")
      .select("id, name, warranty_expiry")
      .eq("owner_id", userId)
      .not("warranty_expiry", "is", null)
      .lte("warranty_expiry", soon.toISOString().slice(0, 10))
      .order("warranty_expiry")
      .limit(5),
    supabase.from("homes").select("id, name").eq("owner_id", userId).maybeSingle(),
  ]);
  for (const [what, r] of Object.entries({ devices, plans, recentDevices, recentPlans, warranties, home })) {
    if (r.error) fail(what, r.error);
  }
  return {
    deviceCount: devices.count ?? 0,
    planCount: plans.count ?? 0,
    recentDevices: recentDevices.data ?? [],
    recentPlans: recentPlans.data ?? [],
    warranties: warranties.data ?? [],
    home: home.data,
  };
}

// ---------- SmartNest Care (customer) ----------
const TICKET_LIST_FIELDS = "id, ref, title, category, priority, status, created_at, updated_at, user_devices(name)";

export async function listTickets(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("support_tickets").select(TICKET_LIST_FIELDS).eq("owner_id", userId).order("updated_at", { ascending: false });
  if (error) fail("your tickets", error);
  return data;
}

export async function listDeviceTickets(userId: string, deviceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("support_tickets").select("id, ref, title, status, updated_at").eq("owner_id", userId).eq("device_id", deviceId).order("updated_at", { ascending: false });
  if (error) fail("device tickets", error);
  return data;
}

export async function getTicket(userId: string, id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("support_tickets")
    .select(
      "id, ref, title, description, category, priority, status, photo_path, created_at, updated_at, resolved_at, closed_at, device_id, user_devices(id, name, category), rooms(name), user_feedback(rating, comment), ticket_updates(id, kind, author_role, from_status, to_status, message, created_at)"
    )
    .eq("owner_id", userId)
    .eq("id", id)
    .order("created_at", { referencedTable: "ticket_updates" })
    .maybeSingle();
  if (error) fail("this ticket", error);
  return data;
}

export async function getTicketSummary(userId: string) {
  const supabase = await createClient();
  const [open, recent] = await Promise.all([
    supabase.from("support_tickets").select("id", { count: "exact", head: true }).eq("owner_id", userId).neq("status", "closed"),
    supabase.from("support_tickets").select("id, ref, title, status, updated_at").eq("owner_id", userId).order("updated_at", { ascending: false }).limit(4),
  ]);
  if (open.error) fail("tickets", open.error);
  if (recent.error) fail("tickets", recent.error);
  return { openCount: open.count ?? 0, recent: recent.data };
}

// Short-lived link for a private ticket photo (storage policies check access).
export async function photoUrl(path: string | null) {
  if (!path) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("ticket-photos").createSignedUrl(path, 600);
  if (error) {
    console.error("Signed URL failed", error.message);
    return null;
  }
  return data.signedUrl;
}

// ---------- Maintenance reminders ----------
export const REMINDER_SOON_DAYS = 30;

export async function listDeviceReminders(userId: string, deviceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_reminders")
    .select("id, title, due_date, repeat_months, completed_at")
    .eq("owner_id", userId)
    .eq("device_id", deviceId)
    .order("completed_at", { ascending: false, nullsFirst: true })
    .order("due_date")
    .limit(20);
  if (error) fail("reminders", error);
  return data;
}

// Open reminders that are overdue or due within REMINDER_SOON_DAYS.
export async function listDueReminders(userId: string, today: string) {
  const supabase = await createClient();
  const soon = new Date(today + "T00:00:00Z");
  soon.setUTCDate(soon.getUTCDate() + REMINDER_SOON_DAYS);
  const { data, error } = await supabase
    .from("maintenance_reminders")
    .select("id, title, due_date, user_devices(id, name)")
    .eq("owner_id", userId)
    .is("completed_at", null)
    .lte("due_date", soon.toISOString().slice(0, 10))
    .order("due_date")
    .limit(8);
  if (error) fail("reminders", error);
  return data;
}
