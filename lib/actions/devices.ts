"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { todayISO } from "@/lib/data";
import type { DeviceCategory } from "@/lib/devices";
import { isUuid, parseDevice } from "@/lib/validation";
import type { FormState } from "./auth";

export async function saveDevice(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser("/app/devices");
  const deviceId = String(form.get("deviceId") ?? "");
  const { values, errors } = parseDevice(form, todayISO());
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const row = {
    name: values.name,
    category: values.category as DeviceCategory,
    catalog_id: values.catalogId || null,
    room_id: values.roomId || null,
    brand: values.brand || null,
    model: values.model || null,
    purchase_date: values.purchaseDate || null,
    warranty_expiry: values.warrantyExpiry || null,
    notes: values.notes || null,
    manual_url: values.manualUrl || null,
  };

  const supabase = await createClient();
  const result = isUuid(deviceId)
    ? await supabase.from("user_devices").update(row).eq("id", deviceId).select("id")
    : await supabase.from("user_devices").insert(row).select("id");
  if (result.error) {
    // 42501 = row-level security: e.g. a room id that isn't the user's.
    if (result.error.code === "42501") return { status: "error", errors: { roomId: "Choose one of your rooms." }, values };
    console.error("Save device failed", result.error.code, result.error.message);
    return { status: "error", message: "Couldn't save the device. Please try again.", values };
  }
  if (!result.data.length) return { status: "error", message: "That device no longer exists.", values };

  revalidatePath("/app", "layout");
  redirect(`/app/devices/${result.data[0].id}?toast=${isUuid(deviceId) ? "device-saved" : "device-added"}`);
}

export async function deleteDevice(form: FormData) {
  await requireUser("/app/devices");
  const deviceId = String(form.get("deviceId") ?? "");
  if (isUuid(deviceId)) {
    const supabase = await createClient();
    const { error } = await supabase.from("user_devices").delete().eq("id", deviceId);
    if (error) throw new Error(`Could not delete device: ${error.message}`);
  }
  revalidatePath("/app", "layout");
  redirect("/app/devices?toast=device-deleted");
}
