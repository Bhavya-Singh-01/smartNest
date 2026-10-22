import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadEnv } from "./env.ts";

export const env = loadEnv();
export const admin = createClient(env.url, env.secretKey, { auth: { persistSession: false } });

export type TestUser = { id: string; email: string; client: SupabaseClient };

const PASSWORD = "testPass1234";
const runId = Date.now();
const created: string[] = [];

// Creates a confirmed user and returns a client signed in as them.
export async function newUser(label: string, metadata: Record<string, unknown> = {}): Promise<TestUser> {
  const email = `${label}-${runId}@smartnest.test`;
  const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true, user_metadata: metadata });
  if (error) throw error;
  created.push(data.user.id);
  const client = createClient(env.url, env.publishableKey, { auth: { persistSession: false } });
  const { error: signInError } = await client.auth.signInWithPassword({ email, password: PASSWORD });
  if (signInError) throw signInError;
  return { id: data.user.id, email, client };
}

export async function makeAdmin(user: TestUser) {
  const { error } = await admin.from("profiles").update({ role: "admin" }).eq("id", user.id);
  if (error) throw error;
}

export function anonClient() {
  return createClient(env.url, env.publishableKey, { auth: { persistSession: false } });
}

export async function deleteTestUsers() {
  for (const id of created.splice(0)) await admin.auth.admin.deleteUser(id);
}
