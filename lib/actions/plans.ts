"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { getPlannerCatalogFresh } from "@/lib/catalog";
import { buildPlan, type HomeType, type Owned, type Priority } from "@/lib/planner";
import { isUuid, validatePlanInput, type FieldErrors, type PlanInput } from "@/lib/validation";

export type SavePlanResult =
  | { status: "saved"; planId: string }
  | { status: "auth" }
  | { status: "error"; message: string; errors?: FieldErrors };

// Saves the planner inputs as a plan. The recommendation is rebuilt here from
// the inputs and the current catalogue, so stored items, prices, reasons and
// totals can't be tampered with by editing the request.
export async function savePlan(input: PlanInput): Promise<SavePlanResult> {
  const user = await getCurrentUser();
  if (!user) return { status: "auth" };

  const errors = validatePlanInput(input);
  if (Object.keys(errors).length) return { status: "error", message: Object.values(errors)[0] ?? "Check the plan details.", errors };

  const supabase = await createClient();
  const catalog = await getPlannerCatalogFresh(supabase);
  const plan = buildPlan(
    {
      homeType: input.homeType as HomeType,
      rooms: input.rooms,
      priorities: input.priorities as Priority[],
      budget: input.budget,
      existing: input.existing as Owned[],
    },
    catalog
  );
  if (!plan.items.length) return { status: "error", message: "This plan has no devices within budget, so there's nothing to save." };

  const { data: planId, error } = await supabase.rpc("save_home_plan", {
    // null creates a new plan; generated RPC types don't mark arguments nullable.
    p_plan_id: input.planId as string,
    p_name: input.name.trim(),
    p_home_type: input.homeType as HomeType,
    p_rooms: input.rooms,
    p_priorities: input.priorities,
    p_budget: input.budget,
    p_existing: input.existing,
    p_warnings: plan.warnings,
    p_items: plan.items.map((item) => ({
      item_key: item.key,
      name: item.name,
      category: item.category,
      qty: item.qty,
      unit_price: item.unitPrice,
      note: item.note ?? null,
      catalog_id: item.catalogId,
      device_category: item.deviceCategory,
      reason: item.reason,
    })),
  });
  if (error) {
    if (error.code === "P0002") return { status: "error", message: "That plan no longer exists." };
    console.error("Save plan failed", error.code, error.message);
    return { status: "error", message: "Couldn't save the plan. Please try again." };
  }

  revalidatePath("/app", "layout");
  return { status: "saved", planId };
}

export async function addPlanToHome(form: FormData) {
  await requireUser("/app/plans");
  const planId = String(form.get("planId") ?? "");
  if (!isUuid(planId)) return;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("add_plan_to_home", { p_plan_id: planId });
  if (error && error.code !== "22023") throw new Error(`Could not add devices: ${error.message}`);
  revalidatePath("/app", "layout");
  redirect(error ? `/app/plans/${planId}?toast=plan-already-added` : `/app/plans/${planId}?toast=plan-added&count=${data}`);
}

export async function deletePlan(form: FormData) {
  await requireUser("/app/plans");
  const planId = String(form.get("planId") ?? "");
  if (isUuid(planId)) {
    const supabase = await createClient();
    const { error } = await supabase.from("home_plans").delete().eq("id", planId);
    if (error) throw new Error(`Could not delete plan: ${error.message}`);
  }
  revalidatePath("/app", "layout");
  redirect("/app/plans?toast=plan-deleted");
}
