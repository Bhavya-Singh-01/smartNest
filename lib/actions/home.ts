"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { isUuid, parseHome, parseRoomName } from "@/lib/validation";
import type { FormState } from "./auth";

const HOME_PATH = "/app/home";

function dbError(action: string, error: { code?: string; message: string }): FormState {
  if (error.code === "23505") return { status: "error", errors: { name: "You already have a room with that name." } };
  console.error(`${action} failed`, error.code, error.message);
  return { status: "error", message: "Couldn't save that. Please try again." };
}

export async function saveHome(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser(HOME_PATH);
  const { values, errors } = parseHome(form);
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const supabase = await createClient();
  const homeId = String(form.get("homeId") ?? "");
  const row = { name: values.name, home_type: values.homeType as "apartment" | "house" | "studio", city: values.city || null };
  const { error } = isUuid(homeId)
    ? await supabase.from("homes").update(row).eq("id", homeId)
    : await supabase.from("homes").insert(row);
  if (error) return { ...dbError("Save home", error), values };

  revalidatePath("/app", "layout");
  redirect(`${HOME_PATH}?toast=${isUuid(homeId) ? "home-saved" : "home-created"}`);
}

export async function addRoom(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser(HOME_PATH);
  const { values, errors } = parseRoomName(form);
  const homeId = String(form.get("homeId") ?? "");
  if (!isUuid(homeId)) return { status: "error", message: "Create your home first." };
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const supabase = await createClient();
  const { error } = await supabase.from("rooms").insert({ home_id: homeId, name: values.name });
  if (error) return { ...dbError("Add room", error), values };

  revalidatePath("/app", "layout");
  return { status: "success", message: `${values.name} added.` };
}

export async function renameRoom(_prev: FormState, form: FormData): Promise<FormState> {
  await requireUser(HOME_PATH);
  const roomId = String(form.get("roomId") ?? "");
  const { values, errors } = parseRoomName(form);
  if (!isUuid(roomId)) return { status: "error", message: "Unknown room." };
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const supabase = await createClient();
  const { data, error } = await supabase.from("rooms").update({ name: values.name }).eq("id", roomId).select("id");
  if (error) return { ...dbError("Rename room", error), values };
  if (!data.length) return { status: "error", message: "That room no longer exists." };

  revalidatePath("/app", "layout");
  return { status: "success", message: "Room renamed.", values };
}

export async function deleteRoom(form: FormData) {
  await requireUser(HOME_PATH);
  const roomId = String(form.get("roomId") ?? "");
  if (isUuid(roomId)) {
    const supabase = await createClient();
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);
    if (error) throw new Error(`Could not delete room: ${error.message}`);
  }
  revalidatePath("/app", "layout");
  redirect(`${HOME_PATH}?toast=room-deleted`);
}
