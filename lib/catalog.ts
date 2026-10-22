import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient as createPublicClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { CatalogProduct } from "@/lib/planner";

const PLANNER_FIELDS = "id, name, category, brand, model, est_price_inr, source_url, is_sample, planner_slot, needs_hub";

async function query(supabase: SupabaseClient<Database>): Promise<CatalogProduct[]> {
  const { data, error } = await supabase.from("device_catalog").select(PLANNER_FIELDS).eq("active", true).not("planner_slot", "is", null);
  if (error) throw new Error(`Could not load the device catalogue: ${error.message}`);
  return data;
}

// Public, cached copy for the /planner page. The catalogue is public data, so
// no session is needed; staff edits call updateTag("catalog") to refresh it.
export async function getPlannerCatalog(): Promise<CatalogProduct[]> {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  const { url, key } = getSupabaseEnv();
  return query(createPublicClient<Database>(url, key, { auth: { persistSession: false } }));
}

// Fresh read (no cache) — used when saving a plan so totals use current prices.
export function getPlannerCatalogFresh(supabase: SupabaseClient<Database>): Promise<CatalogProduct[]> {
  return query(supabase);
}
