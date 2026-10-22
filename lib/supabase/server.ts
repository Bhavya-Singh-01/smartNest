import "server-only";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { getSupabaseEnv } from "./env";

// Supabase client acting as the signed-in user (session from cookies).
// Create one per request; never share across requests.
export async function createClient() {
  // Session checks compare token expiry with the current time (Date.now()),
  // so mark everything that uses this client as request-time only.
  await connection();
  const cookieStore = await cookies();
  const { url, key } = getSupabaseEnv();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components can't write cookies. Safe to skip: proxy.ts
          // refreshes the session cookie on every request.
        }
      },
    },
  });
}
