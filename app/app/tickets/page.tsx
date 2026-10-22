import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listTickets } from "@/lib/data";
import { formatDate } from "@/lib/devices";
import { categoryLabel } from "@/lib/tickets";
import { AppPage, EmptyState, PageHead } from "@/components/app/AppPage";
import { StatusBadge } from "@/components/care/StatusBadge";

export const metadata = { title: "Support tickets" };

export default function TicketsPage() {
  return (
    <AppPage loading="Loading your tickets…">
      <Tickets />
    </AppPage>
  );
}

async function Tickets() {
  const user = await requireUser("/app/tickets");
  const tickets = await listTickets(user.id);

  return (
    <>
      <PageHead
        eyebrow="SmartNest Care"
        title="Support tickets"
        sub="Report a problem with a device and follow every update from the support team."
        actions={<Link href="/app/tickets/new" className="btn btn--primary btn--sm">Report a problem</Link>}
      />
      {tickets.length ? (
        <div className="table-wrap">
          <table className="compare data-table">
            <thead>
              <tr><th>Ticket</th><th>Status</th><th>Type</th><th>Device</th><th>Last update</th></tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>
                    <Link href={`/app/tickets/${t.id}`} className="row-title">{t.title}</Link>
                    <span className="row-sub ticket-ref">{t.ref}</span>
                  </td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>{categoryLabel(t.category)}</td>
                  <td>{t.user_devices?.name ?? "—"}</td>
                  <td>{formatDate(t.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title="No tickets yet" action={<Link href="/app/tickets/new" className="btn btn--primary">Report a problem</Link>}>
          If a device stops working, describe the problem here and the SmartNest support team will respond on the ticket.
        </EmptyState>
      )}
      <p className="hint care-note">
        For this demonstration, SmartNest Care is staffed by the project team — it&apos;s guidance and troubleshooting, not on-site repairs.
      </p>
    </>
  );
}
