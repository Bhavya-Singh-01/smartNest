import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

// Data Access Layer for the current user. Every protected page and Server
// Action goes through these helpers; RLS in the database is the final check.

export type Profile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "full_name" | "phone" | "role" | "created_at"
>;
export type CurrentUser = { id: string; email: string; profile: Profile };

// Deduplicated per request, so layout + page + header share one lookup.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();
  // getUser() verifies the session with Supabase Auth (not just the cookie).
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role, created_at")
    .eq("id", auth.user.id)
    .single();
  if (error) throw new Error(`Could not load profile: ${error.message}`);

  return { id: auth.user.id, email: auth.user.email ?? "", profile };
});

export async function requireUser(nextPath: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser("/admin");
  if (user.profile.role !== "admin") redirect("/app?denied=admin");
  return user;
}
