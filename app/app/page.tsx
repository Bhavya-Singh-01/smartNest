import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getDashboard, getTicketSummary, listDueReminders, todayISO } from "@/lib/data";
import { categoryLabel, formatDate, warrantyStatus } from "@/lib/devices";
import { formatINR } from "@/lib/planner";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { FormAlert } from "@/components/forms/FormParts";
import { StatusBadge } from "@/components/care/StatusBadge";

export const metadata = { title: "My SmartNest" };

type SearchParams = Promise<{ password?: string; denied?: string }>;

export default function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <AppPage loading="Loading your dashboard…">
      <Dashboard searchParams={searchParams} />
    </AppPage>
  );
}

async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser("/app");
  const { password, denied } = await searchParams;
  const today = todayISO();
  const [d, care, maintenance] = await Promise.all([getDashboard(user.id, today), getTicketSummary(user.id), listDueReminders(user.id, today)]);
  const reminderCount = d.warranties.length + maintenance.length;
  const firstName = user.profile.full_name.split(" ")[0];

  return (
    <>
      {password === "updated" && <FormAlert tone="success">Your password has been updated.</FormAlert>}
      {denied === "admin" && <FormAlert tone="error">That area is for SmartNest support staff only.</FormAlert>}

      <PageHead
        eyebrow="Overview"
        title={`Welcome, ${firstName}`}
        sub={d.home ? <>Your home: <strong>{d.home.name}</strong></> : "Start by setting up your home and rooms."}
        actions={
          <>
            {user.profile.role === "admin" && <Link href="/admin" className="btn btn--ghost btn--sm">Support dashboard</Link>}
            <Link href="/app/devices/new" className="btn btn--primary btn--sm">Add a device</Link>
          </>
        }
      />

      <div className="stat-row">
        <Link href="/app/devices" className="stat-cell">
          <strong>{d.deviceCount}</strong>
          <span>Registered {d.deviceCount === 1 ? "device" : "devices"}</span>
        </Link>
        <Link href="/app/plans" className="stat-cell">
          <strong>{d.planCount}</strong>
          <span>Saved {d.planCount === 1 ? "plan" : "plans"}</span>
        </Link>
        <Link href="/app/tickets" className="stat-cell">
          <strong>{care.openCount}</strong>
          <span>Open {care.openCount === 1 ? "ticket" : "tickets"}</span>
        </Link>
        <div className="stat-cell">
          <strong>{reminderCount}</strong>
          <span>{reminderCount === 1 ? "Reminder" : "Reminders"} due</span>
        </div>
      </div>

      {!d.home && (
        <div className="card onboarding">
          <span className="eyebrow">Get started</span>
          <h3>Set up your home in three steps</h3>
          <ol className="onboarding-steps">
            <li><Link href="/app/home">Create your home</Link> and add its rooms.</li>
            <li><Link href="/app/devices/new">Register the devices</Link> you already own, with warranty dates.</li>
            <li><Link href="/planner">Plan what to add next</Link> and save it here.</li>
          </ol>
        </div>
      )}

      <div className="dash-grid">
        <section className="card dash-panel">
          <div className="dash-panel-head">
            <h3>Reminders</h3>
            <Link href="/app/devices" className="text-link">All devices</Link>
          </div>
          {reminderCount ? (
            <ul className="row-list">
              {maintenance.map((m) => (
                <li key={m.id}>
                  <span>
                    <Link href={`/app/devices/${m.user_devices?.id}`}>{m.title}</Link>
                    <span className="row-sub">{m.user_devices?.name}</span>
                  </span>
                  <span className={`status-chip status-chip--${m.due_date < today ? "expired" : "soon"}`}>
                    {m.due_date < today ? "Overdue" : "Due"} {formatDate(m.due_date)}
                  </span>
                </li>
              ))}
              {d.warranties.map((w) => {
                const status = warrantyStatus(w.warranty_expiry, today);
                return (
                  <li key={w.id}>
                    <span>
                      <Link href={`/app/devices/${w.id}`}>{w.name}</Link>
                      <span className="row-sub">Warranty</span>
                    </span>
                    <span className={`status-chip status-chip--${status}`}>
                      {status === "expired" ? "Expired" : "Ends"} {formatDate(w.warranty_expiry)}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="muted-line">Nothing due. Add warranty dates and maintenance reminders on your devices to see them here.</p>
          )}
        </section>

        <section className="card dash-panel">
          <div className="dash-panel-head">
            <h3>Recently added devices</h3>
            <Link href="/app/devices/new" className="text-link">Add device</Link>
          </div>
          {d.recentDevices.length ? (
            <ul className="row-list">
              {d.recentDevices.map((dev) => (
                <li key={dev.id}>
                  <Link href={`/app/devices/${dev.id}`}>{dev.name}</Link>
                  <span className="row-meta">{categoryLabel(dev.category)}{dev.rooms ? ` · ${dev.rooms.name}` : ""}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-line">No devices yet. <Link href="/app/devices/new">Register your first device</Link>.</p>
          )}
        </section>

        <section className="card dash-panel">
          <div className="dash-panel-head">
            <h3>Saved plans</h3>
            <Link href="/planner" className="text-link">New plan</Link>
          </div>
          {d.recentPlans.length ? (
            <ul className="row-list">
              {d.recentPlans.map((p) => (
                <li key={p.id}>
                  <Link href={`/app/plans/${p.id}`}>{p.name}</Link>
                  <span className="row-meta">{formatINR(p.total)} of {formatINR(p.budget)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-line">No saved plans. <Link href="/planner">Open the Planner</Link> and save a setup.</p>
          )}
        </section>

        <section className="card dash-panel">
          <div className="dash-panel-head">
            <h3>SmartNest Care</h3>
            <Link href="/app/tickets/new" className="text-link">Report a problem</Link>
          </div>
          {care.recent.length ? (
            <ul className="row-list">
              {care.recent.map((t) => (
                <li key={t.id}>
                  <Link href={`/app/tickets/${t.id}`}>{t.title}</Link>
                  <StatusBadge status={t.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-line">
              No support tickets. If a device misbehaves, try the <Link href="/troubleshooting">Troubleshooting Center</Link> or{" "}
              <Link href="/app/tickets/new">report a problem</Link>.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
