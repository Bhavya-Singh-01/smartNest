import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listPlans } from "@/lib/data";
import { formatDate, homeTypeLabel } from "@/lib/devices";
import { formatINR, PRIORITY_LABELS } from "@/lib/planner";
import { AppPage, EmptyState, PageHead } from "@/components/app/AppPage";

export const metadata = { title: "Saved plans" };

export default function PlansPage() {
  return (
    <AppPage loading="Loading your plans…">
      <Plans />
    </AppPage>
  );
}

async function Plans() {
  const user = await requireUser("/app/plans");
  const plans = await listPlans(user.id);

  return (
    <>
      <PageHead
        eyebrow="Planner"
        title="Saved plans"
        sub="Setups you've generated and saved from the Smart Home Planner."
        actions={<Link href="/planner" className="btn btn--primary btn--sm">New plan</Link>}
      />
      {plans.length ? (
        <div className="grid grid--3 plan-grid">
          {plans.map((p) => (
            <Link key={p.id} href={`/app/plans/${p.id}`} className="card plan-card">
              <span className="plan-card-meta">{homeTypeLabel(p.home_type)} · {p.rooms} {p.rooms === 1 ? "room" : "rooms"}</span>
              <h3>{p.name}</h3>
              <span className="plan-card-total">{formatINR(p.total)}</span>
              <span className="plan-card-sub">of {formatINR(p.budget)} budget · {p.itemCount} {p.itemCount === 1 ? "item" : "items"}</span>
              <span className="plan-card-tags">{p.priorities.map((x) => PRIORITY_LABELS[x as keyof typeof PRIORITY_LABELS] ?? x).join(" · ")}</span>
              <span className="plan-card-date">Updated {formatDate(p.updated_at)}</span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="No saved plans yet" action={<Link href="/planner" className="btn btn--primary">Open the Planner</Link>}>
          Generate a setup in the Planner, then save it to compare options and come back to it later.
        </EmptyState>
      )}
    </>
  );
}
