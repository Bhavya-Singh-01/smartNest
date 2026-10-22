"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { PHOTO_TYPES, type TicketCategory, type TicketPriority } from "@/lib/tickets";
import { isUuid, parseMessage, parseTicket } from "@/lib/validation";
import type { FormState } from "./auth";

function rpcError(action: string, error: { code?: string; message: string }): FormState {
  if (error.code === "22023" || error.code === "P0002") {
    // Expected rule violations from the ticket functions (e.g. ticket closed meanwhile).
    return { status: "error", message: "This ticket changed in the meantime. Refresh the page and try again." };
  }
  console.error(`${action} failed`, error.code, error.message);
  return { status: "error", message: "Something went wrong. Please try again." };
}

export async function createTicket(_prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser("/app/tickets/new");
  const { values, file, errors } = parseTicket(form);
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const supabase = await createClient();
  let photoPath: string | null = null;
  if (file) {
    photoPath = `${user.id}/${randomUUID()}.${PHOTO_TYPES[file.type]}`;
    const upload = await supabase.storage.from("ticket-photos").upload(photoPath, file, { contentType: file.type });
    if (upload.error) {
      console.error("Photo upload failed", upload.error.message);
      return { status: "error", errors: { photo: "The photo couldn't be uploaded. Try a smaller JPG or PNG, or submit without it." }, values };
    }
  }

  const { data, error } = await supabase
    .from("support_tickets")
    .insert({
      device_id: values.deviceId || null,
      room_id: values.roomId || null,
      category: values.category as TicketCategory,
      priority: values.priority as TicketPriority,
      title: values.title,
      description: values.description,
      photo_path: photoPath,
    })
    .select("id")
    .single();
  if (error) {
    if (photoPath) await supabase.storage.from("ticket-photos").remove([photoPath]);
    if (error.code === "42501") return { status: "error", errors: { deviceId: "Choose one of your own devices and rooms." }, values };
    console.error("Create ticket failed", error.code, error.message);
    return { status: "error", message: "Couldn't submit the ticket. Please try again.", values };
  }

  revalidatePath("/app", "layout");
  redirect(`/app/tickets/${data.id}?toast=ticket-created`);
}

export async function replyToTicket(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser("/app/tickets");
  const ticketId = String(form.get("ticketId") ?? "");
  const { message, errors } = parseMessage(form);
  if (!isUuid(ticketId)) return { status: "error", message: "Unknown ticket." };
  if (Object.keys(errors).length) return { status: "error", errors, values: { message } };

  const supabase = await createClient();
  const { error } = await supabase.rpc("customer_reply", { p_ticket_id: ticketId, p_message: message });
  if (error) return { ...rpcError("Reply", error), values: { message } };
  revalidatePath(`/app/tickets/${ticketId}`);
  return { status: "success", message: "Reply sent." };
}

export async function confirmResolution(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser("/app/tickets");
  const ticketId = String(form.get("ticketId") ?? "");
  const rating = Number(form.get("rating"));
  const { message: comment, errors } = parseMessage(form, false);
  if (!isUuid(ticketId)) return { status: "error", message: "Unknown ticket." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { status: "error", errors: { rating: "Choose a rating from 1 to 5." }, values: { message: comment } };
  if (Object.keys(errors).length) return { status: "error", errors, values: { message: comment } };

  const supabase = await createClient();
  const { error } = await supabase.rpc("customer_confirm_resolution", { p_ticket_id: ticketId, p_rating: rating, p_comment: comment });
  if (error) return rpcError("Confirm resolution", error);
  revalidatePath("/app", "layout");
  redirect(`/app/tickets/${ticketId}?toast=ticket-closed`);
}

export async function reopenTicket(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser("/app/tickets");
  const ticketId = String(form.get("ticketId") ?? "");
  const { message, errors } = parseMessage(form);
  if (!isUuid(ticketId)) return { status: "error", message: "Unknown ticket." };
  if (Object.keys(errors).length) return { status: "error", errors: { message: "Tell us what's still wrong." }, values: { message } };

  const supabase = await createClient();
  const { error } = await supabase.rpc("customer_reopen_ticket", { p_ticket_id: ticketId, p_message: message });
  if (error) return { ...rpcError("Reopen", error), values: { message } };
  revalidatePath("/app", "layout");
  redirect(`/app/tickets/${ticketId}?toast=ticket-reopened`);
}
