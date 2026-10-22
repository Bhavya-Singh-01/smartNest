import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listCatalogForStaff } from "@/lib/admin-data";
import { setCatalogActive } from "@/lib/actions/admin";
import { categoryLabel } from "@/lib/devices";
import { formatINR, SLOTS } from "@/lib/planner";
import { AppPage, PageHead } from "@/components/app/AppPage";

const SLOT_TITLES: Record<string, string> = Object.fromEntries(SLOTS.map((s) => [s.slot, s.title]));

export const metadata = { title: "Device catalogue" };

export default function CatalogPage() {
  return (
    <AppPage loading="Loading catalogue…">
      <Catalog />
    </AppPage>
  );
}

async function Catalog() {
  await requireAdmin();
  const items = await listCatalogForStaff();

  return (
    <>
      <PageHead
        eyebrow="Support tools"
        title="Device catalogue"
        sub="Products customers can pick when registering devices. Mark entries as samples unless you have a source for the details."
        actions={<Link href="/admin/catalog/new" className="btn btn--primary btn--sm">Add entry</Link>}
      />
      <div className="table-wrap">
        <table className="compare data-table">
          <thead>
            <tr><th>Product</th><th>Category</th><th>Planner</th><th>Est. price</th><th>Source</th><th>Visibility</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={item.active ? undefined : "row-muted"}>
                <td>
                  <Link href={`/admin/catalog/${item.id}/edit`} className="row-title">{item.name}</Link>
                  <span className="row-sub">{[item.brand, item.model, item.connectivity].filter(Boolean).join(" · ") || item.slug}</span>
                </td>
                <td>{categoryLabel(item.category)}</td>
                <td>{item.planner_slot ? SLOT_TITLES[item.planner_slot] : "—"}</td>
                <td>{item.est_price_inr !== null ? formatINR(item.est_price_inr) : "—"}</td>
                <td>
                  {item.is_sample ? <span className="tag">Sample</span> : null}{" "}
                  {item.source_url ? <a href={item.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a> : null}
                </td>
                <td>{item.active ? "Visible" : "Hidden"}</td>
                <td>
                  <form action={setCatalogActive}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <input type="hidden" name="active" value={item.active ? "false" : "true"} />
                    <button type="submit" className="btn btn--ghost btn--sm">{item.active ? "Hide" : "Show"}</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hint care-note">Hidden entries stay linked to devices customers already registered; they just can&apos;t be picked for new ones.</p>
    </>
  );
}
