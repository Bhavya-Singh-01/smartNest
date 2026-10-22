import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getTicketForStaff } from "@/lib/admin-data";
import { photoUrl } from "@/lib/data";
import { assignToMe } from "@/lib/actions/admin";
import { categoryLabel as deviceCategoryLabel, formatDate } from "@/lib/devices";
import { categoryLabel, priorityLabel } from "@/lib/tickets";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { StatusBadge } from "@/components/care/StatusBadge";
import { Timeline } from "@/components/care/Timeline";
import { LiveRefresh } from "@/components/care/LiveRefresh";
import { StaffTicketActions } from "@/components/admin/StaffTicketActions";

export const metadata = { title: "Ticket" };

type Params = Promise<{ id: string }>;

export default function AdminTicketPage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading ticket…">
      <StaffTicket params={params} />
    </AppPage>
  );
}

async function StaffTicket({ params }: { params: Params }) {
  const { id } = await params;
  const staff = await requireAdmin();
  const ticket = await getTicketForStaff(id);
  if (!ticket) notFound();
  const photo = await photoUrl(ticket.photo_path);
  const device = ticket.user_devices;

  return (
    <>
      <p className="back-link"><Link href="/admin/tickets">← Ticket queue</Link></p>
      <PageHead
        eyebrow={ticket.ref}
        title={ticket.title}
        sub={<><StatusBadge status={ticket.status} /> <span className="head-meta">{priorityLabel(ticket.priority)} priority · {categoryLabel(ticket.category)} · opened {formatDate(ticket.created_at)}</span></>}
        actions={<LiveRefresh ticketId={ticket.id} />}
      />

      <div className="app-split app-split--wide">
        <div className="stack">
          <StaffTicketActions ticketId={ticket.id} status={ticket.status} />
          <section className="card">
            <h3>History</h3>
            <Timeline updates={ticket.ticket_updates} staffView />
          </section>
        </div>

        <div className="stack">
          <section className="card">
            <h3>Customer</h3>
            <dl className="detail-list">
              <div><dt>Name</dt><dd>{ticket.owner?.full_name}</dd></div>
              <div><dt>Email</dt><dd>{ticket.owner?.email ? <a href={`mailto:${ticket.owner.email}`}>{ticket.owner.email}</a> : "—"}</dd></div>
              <div><dt>Phone</dt><dd>{ticket.owner?.phone ?? "—"}</dd></div>
              <div>
                <dt>Assigned to</dt>
                <dd>
                  {ticket.assignee?.full_name ?? "Nobody yet"}
                </dd>
              </div>
            </dl>
            {ticket.assignee?.full_name !== staff.profile.full_name && ticket.status !== "closed" && (
              <form action={assignToMe}>
                <input type="hidden" name="ticketId" value={ticket.id} />
                <button type="submit" className="btn btn--ghost btn--sm">Assign to me</button>
              </form>
            )}
          </section>

          <section className="card">
            <h3>Problem</h3>
            <p className="notes">{ticket.description}</p>
            {photo && (
              <a href={photo} target="_blank" rel="noopener noreferrer" className="ticket-photo">
                {/* eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from private storage */}
                <img src={photo} alt={`Photo attached to ticket ${ticket.ref}`} width={640} height={480} />
              </a>
            )}
            <dl className="detail-list">
              <div><dt>Room</dt><dd>{ticket.rooms?.name ?? "—"}</dd></div>
              <div><dt>Device</dt><dd>{device ? device.name : "Not linked"}</dd></div>
              {device && (
                <>
                  <div><dt>Device type</dt><dd>{deviceCategoryLabel(device.category)}</dd></div>
                  <div><dt>Brand / model</dt><dd>{[device.brand, device.model].filter(Boolean).join(" ") || "—"}</dd></div>
                  <div><dt>Purchased</dt><dd>{formatDate(device.purchase_date)}</dd></div>
                  <div><dt>Warranty until</dt><dd>{formatDate(device.warranty_expiry)}</dd></div>
                </>
              )}
            </dl>
            {ticket.user_feedback && (
              <>
                <h4 className="detail-subhead">Customer feedback</h4>
                <p className="notes">{"★".repeat(ticket.user_feedback.rating)}{"☆".repeat(5 - ticket.user_feedback.rating)}{ticket.user_feedback.comment ? ` — ${ticket.user_feedback.comment}` : ""}</p>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
