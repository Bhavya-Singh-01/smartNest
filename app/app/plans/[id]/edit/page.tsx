import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getPlan } from "@/lib/data";
import { getPlannerCatalog } from "@/lib/catalog";
import type { HomeType, Owned, Priority } from "@/lib/planner";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { Planner } from "@/components/planner/Planner";

export const metadata = { title: "Edit plan" };

type Params = Promise<{ id: string }>;

export default function EditPlanPage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading plan…">
      <EditPlan params={params} />
    </AppPage>
  );
}

async function EditPlan({ params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser(`/app/plans/${id}/edit`);
  const plan = isUuid(id) ? await getPlan(user.id, id) : null;
  if (!plan) notFound();
  const catalog = await getPlannerCatalog();

  return (
    <>
      <p className="back-link"><Link href={`/app/plans/${plan.id}`}>← {plan.name}</Link></p>
      <PageHead eyebrow="Saved plan" title="Edit plan" sub="Change the inputs, generate the setup again, then save your changes." />
      <Planner
        catalog={catalog}
        initialPlan={{
          id: plan.id,
          name: plan.name,
          homeType: plan.home_type as HomeType,
          rooms: plan.rooms,
          priorities: plan.priorities as Priority[],
          budget: plan.budget,
          existing: plan.existing as Owned[],
        }}
      />
    </>
  );
}
