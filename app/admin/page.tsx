import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getTicketStats, listAllTickets, listRecentAccounts } from "@/lib/admin-data";
import { formatDate } from "@/lib/devices";
import { TICKET_STATUSES, priorityLabel } from "@/lib/tickets";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { StatusBadge } from "@/components/care/StatusBadge";

export const metadata = { title: "Support dashboard" };

export default function AdminPage() {
  return (
    <AppPage loading="Loading support dashboard…">
      <AdminOverview />
    </AppPage>
  );
}

async function AdminOverview() {
  const staff = await requireAdmin();
  const [stats, open, accounts] = await Promise.all([getTicketStats(), listAllTickets({ status: "open" }), listRecentAccounts()]);
  const openCount = (stats.byStatus.submitted ?? 0) + (stats.byStatus.under_review ?? 0) + (stats.byStatus.in_progress ?? 0);

  return (
    <>
      <PageHead
        eyebrow="SmartNest Care"
        title="Support dashboard"
        sub={`Signed in as ${staff.profile.full_name} (support staff)`}
        actions={<Link href="/admin/tickets" className="btn btn--primary btn--sm">Open ticket queue</Link>}
      />

      <div className="stat-row">
        <Link href="/admin/tickets?status=open" className="stat-cell"><strong>{openCount}</strong><span>Open tickets</span></Link>
        <Link href="/admin/tickets?status=submitted" className="stat-cell"><strong>{stats.byStatus.submitted ?? 0}</strong><span>New · awaiting review</span></Link>
        <Link href="/admin/tickets?status=open&priority=urgent" className="stat-cell"><strong>{stats.urgentOpen}</strong><span>High / urgent open</span></Link>
        <Link href="/admin/tickets" className="stat-cell"><strong>{stats.total}</strong><span>All tickets</span></Link>
      </div>

      <div className="status-strip" aria-label="Tickets by status">
        {TICKET_STATUSES.map((s) => (
          <Link key={s.value} href={`/admin/tickets?status=${s.value}`} className="status-strip-item">
            <StatusBadge status={s.value} />
            <strong>{stats.byStatus[s.value] ?? 0}</strong>
          </Link>
        ))}
      </div>

      <div className="dash-grid">
        <section className="card dash-panel dash-panel--wide">
          <div className="dash-panel-head">
            <h3>Needs attention</h3>
            <Link href="/admin/tickets?status=open" className="text-link">All open tickets</Link>
          </div>
          {open.length ? (
            <ul className="row-list">
              {open.slice(0, 6).map((t) => (
                <li key={t.id}>
                  <span>
                    <Link href={`/admin/tickets/${t.id}`}>{t.title}</Link>
                    <span className="row-sub">{t.ref} · {t.owner?.full_name} · {priorityLabel(t.priority)}</span>
                  </span>
                  <StatusBadge status={t.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-line">No open tickets. 🎉</p>
          )}
        </section>

        <section className="card dash-panel dash-panel--wide">
          <div className="dash-panel-head">
            <h3>Newest accounts</h3>
          </div>
          <ul className="row-list">
            {accounts.map((a) => (
              <li key={a.id}>
                <span>
                  {a.full_name}
                  <span className="row-sub">{a.email}</span>
                </span>
                <span className="row-meta">{a.role === "admin" ? "Staff" : "Customer"} · {formatDate(a.created_at)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
