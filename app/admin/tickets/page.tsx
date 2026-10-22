import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listAllTickets } from "@/lib/admin-data";
import { formatDate } from "@/lib/devices";
import { TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES, categoryLabel, priorityLabel } from "@/lib/tickets";
import { AppPage, EmptyState, PageHead } from "@/components/app/AppPage";
import { StatusBadge } from "@/components/care/StatusBadge";

export const metadata = { title: "Ticket queue" };

type SearchParams = Promise<{ q?: string; status?: string; priority?: string; category?: string }>;

const pick = (v: string | undefined, allowed: readonly { value: string }[]) => (v && allowed.some((a) => a.value === v) ? v : undefined);

export default function AdminTicketsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <AppPage loading="Loading tickets…">
      <Queue searchParams={searchParams} />
    </AppPage>
  );
}

async function Queue({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const raw = await searchParams;
  const filters = {
    q: (raw.q ?? "").slice(0, 80),
    status: raw.status === "open" ? "open" : pick(raw.status, TICKET_STATUSES),
    priority: pick(raw.priority, TICKET_PRIORITIES),
    category: pick(raw.category, TICKET_CATEGORIES),
  };
  const tickets = await listAllTickets(filters);
  const filtered = Boolean(filters.q || filters.status || filters.priority || filters.category);

  return (
    <>
      <PageHead eyebrow="SmartNest Care" title="Ticket queue" sub={`${tickets.length} ${tickets.length === 1 ? "ticket" : "tickets"}${filtered ? " match your filters" : ""}`} />

      {/* Plain GET form: filters live in the URL, so views can be bookmarked and shared. */}
      <form className="filter-form" method="get" action="/admin/tickets" role="search">
        <div className="form-group">
          <label htmlFor="q">Search</label>
          <input id="q" name="q" type="text" defaultValue={filters.q} placeholder="Reference, title, customer name or email" />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={filters.status ?? ""}>
            <option value="">Any</option>
            <option value="open">Open (not resolved/closed)</option>
            {TICKET_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" defaultValue={filters.priority ?? ""}>
            <option value="">Any</option>
            {TICKET_PRIORITIES.map((p) => <option key={p.value} value={p.value}>{priorityLabel(p.value)}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Type</label>
          <select id="category" name="category" defaultValue={filters.category ?? ""}>
            <option value="">Any</option>
            {TICKET_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="filter-form-actions">
          <button type="submit" className="btn btn--primary">Apply</button>
          {filtered && <Link href="/admin/tickets" className="btn btn--ghost">Clear</Link>}
        </div>
      </form>

      {tickets.length ? (
        <div className="table-wrap">
          <table className="compare data-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Status</th><th>Priority</th><th>Type</th><th>Assigned</th><th>Updated</th></tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>
                    <Link href={`/admin/tickets/${t.id}`} className="row-title">{t.title}</Link>
                    <span className="row-sub ticket-ref">{t.ref}</span>
                  </td>
                  <td>{t.owner?.full_name}<span className="row-sub">{t.owner?.email}</span></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td><span className={`priority priority--${t.priority}`}>{priorityLabel(t.priority)}</span></td>
                  <td>{categoryLabel(t.category)}</td>
                  <td>{t.assignee?.full_name ?? "—"}</td>
                  <td>{formatDate(t.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title={filtered ? "No tickets match" : "No tickets yet"}>
          {filtered ? "Try a different search or clear the filters." : "Customer tickets will appear here as soon as they're submitted."}
        </EmptyState>
      )}
    </>
  );
}
