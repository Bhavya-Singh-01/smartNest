import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getPlan } from "@/lib/data";
import { addPlanToHome, deletePlan } from "@/lib/actions/plans";
import { formatDate, homeTypeLabel } from "@/lib/devices";
import { formatINR, OWNED_LABELS, PRIORITY_LABELS, type Owned } from "@/lib/planner";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { ConfirmButton } from "@/components/ui/ConfirmButton";

export const metadata = { title: "Saved plan" };

type Params = Promise<{ id: string }>;

export default function PlanPage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading plan…">
      <Plan params={params} />
    </AppPage>
  );
}

async function Plan({ params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser(`/app/plans/${id}`);
  const plan = isUuid(id) ? await getPlan(user.id, id) : null;
  if (!plan) notFound();

  const remaining = plan.budget - plan.total;
  const unitCount = plan.plan_items.reduce((n, i) => n + i.qty, 0);
  const byCategory = new Map<string, number>();
  for (const item of plan.plan_items) byCategory.set(item.category, (byCategory.get(item.category) ?? 0) + item.line_total);

  return (
    <>
      <p className="back-link"><Link href="/app/plans">← All plans</Link></p>
      <PageHead
        eyebrow="Saved plan"
        title={plan.name}
        sub={`${homeTypeLabel(plan.home_type)} · ${plan.rooms} ${plan.rooms === 1 ? "room" : "rooms"} · ${plan.priorities.map((x) => PRIORITY_LABELS[x as keyof typeof PRIORITY_LABELS] ?? x).join(", ")}`}
        actions={
          <>
            <Link href={`/app/plans/${plan.id}/edit`} className="btn btn--ghost btn--sm">Edit in Planner</Link>
            <ConfirmButton
              label="Delete"
              title={`Delete “${plan.name}”?`}
              description="The saved plan and its device list will be deleted. This can't be undone."
              confirmLabel="Delete plan"
              action={deletePlan}
              fields={{ planId: plan.id }}
            />
          </>
        }
      />

      <div className="stat-row stat-row--3">
        <div className="stat-cell"><strong>{formatINR(plan.total)}</strong><span>Estimated total</span></div>
        <div className="stat-cell"><strong>{formatINR(plan.budget)}</strong><span>Budget</span></div>
        <div className="stat-cell"><strong>{formatINR(remaining)}</strong><span>Remaining</span></div>
      </div>

      {plan.warnings.length > 0 && (
        <div className="manual-box manual-box--warning">
          <strong className="box-label">Check before you buy</strong>
          <ul>{plan.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      )}

      <div className="app-split app-split--wide">
        <section className="card">
          <h3>Device list</h3>
          <div className="table-wrap table-wrap--flat">
            <table className="compare data-table">
              <thead><tr><th>Item</th><th>Qty</th><th>Unit price</th><th>Line total</th></tr></thead>
              <tbody>
                {plan.plan_items.map((item) => (
                  <tr key={item.position}>
                    <td>
                      <span className="row-title">
                        {item.name}
                        {item.device_catalog?.is_sample ? <span className="tag sample-tag">Sample</span> : item.device_catalog?.source_url ? <a className="source-link" href={item.device_catalog.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a> : null}
                      </span>
                      <span className="row-sub">{item.reason ?? item.category}{item.note ? ` (${item.note}.)` : ""}</span>
                    </td>
                    <td>{item.qty}</td>
                    <td>{formatINR(item.unit_price)}</td>
                    <td>{formatINR(item.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hint">Prices are estimates for planning, not quotes. Saved {formatDate(plan.updated_at)}.</p>
        </section>

        <div className="stack">
          <section className="card">
            <h3>Add to My Home</h3>
            {plan.added_to_home_at ? (
              <p className="muted-line">
                Added on {formatDate(plan.added_to_home_at)}. <Link href="/app/devices">View your devices</Link>
              </p>
            ) : (
              <>
                <p className="muted-line">Bought these? Add all {unitCount} {unitCount === 1 ? "device" : "devices"} to My Home in one step, then set rooms and warranty dates.</p>
                <ConfirmButton
                  label="Add devices to My Home"
                  title={`Add ${unitCount} ${unitCount === 1 ? "device" : "devices"} to My Home?`}
                  description="One device is created per unit (for example “Smart bulb 1”, “Smart bulb 2”). You can edit or remove them later."
                  confirmLabel="Add devices"
                  action={addPlanToHome}
                  fields={{ planId: plan.id }}
                  className="btn btn--primary btn--sm"
                  confirmClassName="btn btn--primary"
                />
              </>
            )}
          </section>

          <section className="card">
            <h3>Cost by category</h3>
            <ul className="row-list">
              {[...byCategory.entries()].map(([cat, total]) => (
                <li key={cat}><span>{cat}</span><span className="row-meta">{formatINR(total)}</span></li>
              ))}
            </ul>
            {plan.existing.length > 0 && (
              <p className="hint">Skipped because you already own: {plan.existing.map((o) => OWNED_LABELS[o as Owned]?.toLowerCase() ?? o).join(", ")}.</p>
            )}
          </section>

          <section className="card">
            <h3>Next steps</h3>
            <ul className="guide-links">
              <li><Link href="/installation">Installation &amp; setup manual</Link></li>
              <li><Link href="/security">Security &amp; privacy checklist</Link></li>
              <li><Link href="/automation">Automation routines</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
