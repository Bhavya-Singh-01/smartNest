import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTicket, photoUrl } from "@/lib/data";
import { categoryLabel as deviceCategoryLabel, formatDate } from "@/lib/devices";
import { categoryLabel, priorityLabel } from "@/lib/tickets";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { StatusBadge } from "@/components/care/StatusBadge";
import { Timeline } from "@/components/care/Timeline";
import { CustomerTicketActions } from "@/components/care/CustomerTicketActions";
import { LiveRefresh } from "@/components/care/LiveRefresh";

export const metadata = { title: "Support ticket" };

type Params = Promise<{ id: string }>;

export default function TicketPage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading ticket…">
      <Ticket params={params} />
    </AppPage>
  );
}

async function Ticket({ params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser(`/app/tickets/${id}`);
  const ticket = isUuid(id) ? await getTicket(user.id, id) : null;
  if (!ticket) notFound();
  const photo = await photoUrl(ticket.photo_path);

  return (
    <>
      <p className="back-link"><Link href="/app/tickets">← All tickets</Link></p>
      <PageHead
        eyebrow={ticket.ref}
        title={ticket.title}
        sub={<><StatusBadge status={ticket.status} /> <span className="head-meta">Submitted {formatDate(ticket.created_at)}</span></>}
        actions={<LiveRefresh ticketId={ticket.id} />}
      />

      <div className="app-split app-split--wide">
        <div className="stack">
          <section className="card">
            <h3>History</h3>
            <Timeline updates={ticket.ticket_updates} />
          </section>
          <section className="card">
            <CustomerTicketActions ticketId={ticket.id} status={ticket.status} />
          </section>
        </div>

        <div className="stack">
          <section className="card">
            <h3>Details</h3>
            <dl className="detail-list">
              <div><dt>Reference</dt><dd>{ticket.ref}</dd></div>
              <div><dt>Type</dt><dd>{categoryLabel(ticket.category)}</dd></div>
              <div><dt>Priority</dt><dd>{priorityLabel(ticket.priority)}</dd></div>
              <div>
                <dt>Device</dt>
                <dd>{ticket.user_devices ? <Link href={`/app/devices/${ticket.user_devices.id}`}>{ticket.user_devices.name}</Link> : "—"}</dd>
              </div>
              {ticket.user_devices && <div><dt>Device type</dt><dd>{deviceCategoryLabel(ticket.user_devices.category)}</dd></div>}
              <div><dt>Room</dt><dd>{ticket.rooms?.name ?? "—"}</dd></div>
              {ticket.resolved_at && <div><dt>Resolved</dt><dd>{formatDate(ticket.resolved_at)}</dd></div>}
              {ticket.closed_at && <div><dt>Closed</dt><dd>{formatDate(ticket.closed_at)}</dd></div>}
            </dl>
            <h4 className="detail-subhead">Your description</h4>
            <p className="notes">{ticket.description}</p>
            {photo && (
              <>
                <h4 className="detail-subhead">Photo</h4>
                <a href={photo} target="_blank" rel="noopener noreferrer" className="ticket-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from private storage */}
                  <img src={photo} alt={`Photo attached to ticket ${ticket.ref}`} width={640} height={480} />
                </a>
              </>
            )}
            {ticket.user_feedback && (
              <>
                <h4 className="detail-subhead">Your feedback</h4>
                <p className="notes">{"★".repeat(ticket.user_feedback.rating)}{"☆".repeat(5 - ticket.user_feedback.rating)}{ticket.user_feedback.comment ? ` — ${ticket.user_feedback.comment}` : ""}</p>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
