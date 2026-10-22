import { statusLabel } from "@/lib/tickets";

type Update = {
  id: string;
  kind: string;
  author_role: string;
  from_status: string | null;
  to_status: string | null;
  message: string | null;
  created_at: string;
  is_internal?: boolean;
  author?: { full_name: string } | null;
};

function when(ts: string) {
  return new Date(ts).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

// Chronological ticket history. `staffView` shows staff names and internal notes.
export function Timeline({ updates, staffView = false }: { updates: Update[]; staffView?: boolean }) {
  return (
    <ol className="timeline">
      {updates.map((u) => {
        const who = u.author_role === "admin" ? (staffView && u.author ? u.author.full_name : "SmartNest Support") : staffView && u.author ? `${u.author.full_name} (customer)` : "You";
        let title: string;
        switch (u.kind) {
          case "created":
            title = "Ticket submitted";
            break;
          case "status_change":
            title = `${statusLabel(u.from_status ?? "")} → ${statusLabel(u.to_status ?? "")}`;
            break;
          case "staff_reply":
            title = "Reply from support";
            break;
          case "customer_reply":
            title = staffView ? "Customer reply" : "Your reply";
            break;
          case "internal_note":
            title = "Internal note";
            break;
          default:
            title = "Assignment";
        }
        return (
          <li key={u.id} className={`timeline-item timeline-item--${u.kind}${u.is_internal ? " timeline-item--internal" : ""}`}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-body">
              <div className="timeline-head">
                <strong>{title}</strong>
                {u.is_internal && <span className="tag tag--warn">Staff only</span>}
              </div>
              <p className="timeline-meta">
                {who} · <time dateTime={u.created_at}>{when(u.created_at)}</time>
              </p>
              {u.message && <p className="timeline-message">{u.message}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
