"use server";

import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type { DeviceCategory } from "@/lib/devices";
import { staffNextStatuses, type TicketStatus } from "@/lib/tickets";
import { isUuid, parseCatalogItem, parseMessage } from "@/lib/validation";
import type { FormState } from "./auth";

// Staff actions. requireAdmin() is a convenience check — the SQL functions
// and RLS policies refuse the same operations for non-staff accounts.

function failure(action: string, error: { code?: string; message: string }): FormState {
  if (error.code === "22023") return { status: "error", message: "That change isn't allowed for the ticket's current status. Refresh and try again." };
  if (error.code === "42501") return { status: "error", message: "Your account isn't allowed to do that." };
  console.error(`${action} failed`, error.code, error.message);
  return { status: "error", message: "Something went wrong. Please try again." };
}

// One form handles "change status", "reply" and "internal note" (field: mode).
export async function staffUpdateTicket(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const ticketId = String(form.get("ticketId") ?? "");
  const mode = String(form.get("mode") ?? "");
  const current = String(form.get("currentStatus") ?? "");
  const nextStatus = String(form.get("status") ?? "");
  if (!isUuid(ticketId)) return { status: "error", message: "Unknown ticket." };

  const { message, errors } = parseMessage(form, mode !== "status");
  if (Object.keys(errors).length) return { status: "error", errors, values: { message } };
  if (mode === "status" && !staffNextStatuses(current).includes(nextStatus as TicketStatus)) {
    return { status: "error", errors: { status: "Choose the next status." }, values: { message } };
  }
  if (!["status", "reply", "note"].includes(mode)) return { status: "error", message: "Unknown action." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("staff_update_ticket", {
    p_ticket_id: ticketId,
    // null = no status change (reply / internal note); generated types don't mark args nullable.
    p_status: (mode === "status" ? nextStatus : null) as TicketStatus,
    p_message: (message || null) as string,
    p_internal: mode === "note",
  });
  if (error) return { ...failure("Staff update", error), values: { message } };

  revalidatePath("/admin", "layout");
  return { status: "success", message: mode === "status" ? "Status updated." : mode === "note" ? "Internal note added." : "Reply sent to the customer." };
}

export async function assignToMe(form: FormData) {
  await requireAdmin();
  const ticketId = String(form.get("ticketId") ?? "");
  if (!isUuid(ticketId)) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("assign_ticket_to_me", { p_ticket_id: ticketId });
  if (error) throw new Error(`Could not assign ticket: ${error.message}`);
  revalidatePath("/admin", "layout");
  redirect(`/admin/tickets/${ticketId}?toast=ticket-assigned`);
}

export async function saveCatalogItem(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const itemId = String(form.get("itemId") ?? "");
  const { values, price, errors } = parseCatalogItem(form);
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const row = {
    name: values.name,
    slug: values.slug,
    category: values.category as DeviceCategory,
    brand: values.brand || null,
    model: values.model || null,
    connectivity: values.connectivity || null,
    est_price_inr: price,
    source_url: values.sourceUrl || null,
    is_sample: values.isSample === "on",
    planner_slot: values.plannerSlot || null,
    needs_hub: values.needsHub === "on",
  };
  const supabase = await createClient();
  const { error } = isUuid(itemId)
    ? await supabase.from("device_catalog").update(row).eq("id", itemId)
    : await supabase.from("device_catalog").insert(row);
  if (error) {
    if (error.code === "23505") return { status: "error", errors: { slug: "Another catalogue entry already uses this slug." }, values };
    return { ...failure("Save catalogue item", error), values };
  }
  updateTag("catalog"); // the public planner reads a cached copy
  revalidatePath("/admin", "layout");
  revalidatePath("/app", "layout");
  redirect(`/admin/catalog?toast=${isUuid(itemId) ? "catalog-saved" : "catalog-added"}`);
}

export async function setCatalogActive(form: FormData) {
  await requireAdmin();
  const itemId = String(form.get("itemId") ?? "");
  const active = form.get("active") === "true";
  if (!isUuid(itemId)) return;
  const supabase = await createClient();
  const { error } = await supabase.from("device_catalog").update({ active }).eq("id", itemId);
  if (error) throw new Error(`Could not update catalogue item: ${error.message}`);
  updateTag("catalog");
  revalidatePath("/admin", "layout");
  revalidatePath("/app", "layout");
  redirect(`/admin/catalog?toast=${active ? "catalog-restored" : "catalog-hidden"}`);
}
