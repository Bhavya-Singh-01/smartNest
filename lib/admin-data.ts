import "server-only";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { isUuid } from "@/lib/validation";

// Support-staff queries. Each call re-checks the staff role; RLS also only
// returns other customers' rows to staff accounts.

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not load ${what}: ${error.message}`);
}

export async function getTicketStats() {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.from("support_tickets").select("status, priority");
  if (error) fail("ticket stats", error);
  const byStatus: Record<string, number> = {};
  let urgentOpen = 0;
  for (const t of data) {
    byStatus[t.status] = (byStatus[t.status] ?? 0) + 1;
    if (t.status !== "closed" && t.status !== "resolved" && (t.priority === "urgent" || t.priority === "high")) urgentOpen++;
  }
  return { total: data.length, byStatus, urgentOpen };
}

export type TicketFilters = { q?: string; status?: string; priority?: string; category?: string };

// Strip characters with meaning in PostgREST filter syntax.
const cleanSearch = (q: string) => q.replace(/[,()%*\\:"']/g, " ").trim().slice(0, 80);

export async function listAllTickets(filters: TicketFilters) {
  await requireAdmin();
  const supabase = await createClient();
  let query = supabase
    .from("support_tickets")
    .select("id, ref, title, category, priority, status, created_at, updated_at, owner:profiles!support_tickets_owner_id_fkey(full_name, email), assignee:profiles!support_tickets_assigned_to_fkey(full_name)")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (filters.status === "open") query = query.not("status", "in", "(resolved,closed)");
  else if (filters.status) query = query.eq("status", filters.status as never);
  if (filters.priority) query = query.eq("priority", filters.priority as never);
  if (filters.category) query = query.eq("category", filters.category as never);

  const q = cleanSearch(filters.q ?? "");
  if (q) {
    const people = await supabase.from("profiles").select("id").or(`full_name.ilike.%${q}%,email.ilike.%${q}%`).limit(50);
    if (people.error) fail("customers", people.error);
    const ownerFilter = people.data.length ? `,owner_id.in.(${people.data.map((p) => p.id).join(",")})` : "";
    query = query.or(`ref.ilike.%${q}%,title.ilike.%${q}%${ownerFilter}`);
  }
  const { data, error } = await query;
  if (error) fail("tickets", error);
  return data;
}

export async function getTicketForStaff(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("support_tickets")
    .select(
      "id, ref, title, description, category, priority, status, photo_path, created_at, updated_at, resolved_at, closed_at, owner_id, owner:profiles!support_tickets_owner_id_fkey(full_name, email, phone), assignee:profiles!support_tickets_assigned_to_fkey(full_name), user_devices(id, name, category, brand, model, purchase_date, warranty_expiry), rooms(name), user_feedback(rating, comment), ticket_updates(id, kind, author_role, from_status, to_status, message, is_internal, created_at, author:profiles!ticket_updates_author_id_fkey(full_name))"
    )
    .eq("id", id)
    .order("created_at", { referencedTable: "ticket_updates" })
    .maybeSingle();
  if (error) fail("ticket", error);
  return data;
}

export async function listRecentAccounts() {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("id, full_name, email, role, created_at").order("created_at", { ascending: false }).limit(8);
  if (error) fail("accounts", error);
  return data;
}

export async function listCatalogForStaff() {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("device_catalog")
    .select("id, slug, category, name, brand, model, connectivity, est_price_inr, source_url, is_sample, active, planner_slot, needs_hub, updated_at")
    .order("active", { ascending: false })
    .order("category")
    .order("name");
  if (error) fail("catalogue", error);
  return data;
}

export async function getCatalogItem(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("device_catalog")
    .select("id, slug, category, name, brand, model, connectivity, est_price_inr, source_url, is_sample, active, planner_slot, needs_hub")
    .eq("id", id)
    .maybeSingle();
  if (error) fail("catalogue item", error);
  return data;
}
