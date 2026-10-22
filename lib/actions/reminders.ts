"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { isUuid, parseReminder } from "@/lib/validation";
import type { FormState } from "./auth";

export async function addReminder(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser("/app/devices");
  const deviceId = String(form.get("deviceId") ?? "");
  const { values, errors } = parseReminder(form);
  if (!isUuid(deviceId)) return { status: "error", message: "Unknown device." };
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_reminders").insert({
    device_id: deviceId,
    title: values.title,
    due_date: values.dueDate,
    repeat_months: values.repeat ? Number(values.repeat) : null,
  });
  if (error) {
    console.error("Add reminder failed", error.code, error.message);
    return { status: "error", message: "Couldn't add the reminder. Please try again.", values };
  }
  revalidatePath("/app", "layout");
  return { status: "success", message: "Reminder added." };
}

export async function completeReminder(form: FormData) {
  await requireUser("/app/devices");
  const id = String(form.get("reminderId") ?? "");
  if (!isUuid(id)) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("complete_reminder", { p_reminder_id: id });
  // P0002 = already completed / not yours: nothing to do.
  if (error && error.code !== "P0002") throw new Error(`Could not complete reminder: ${error.message}`);
  revalidatePath("/app", "layout");
}

export async function deleteReminder(form: FormData) {
  await requireUser("/app/devices");
  const id = String(form.get("reminderId") ?? "");
  if (!isUuid(id)) return;
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_reminders").delete().eq("id", id);
  if (error) throw new Error(`Could not delete reminder: ${error.message}`);
  revalidatePath("/app", "layout");
}
