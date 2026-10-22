import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getDevice, listDeviceReminders, listDeviceTickets, todayISO } from "@/lib/data";
import { deleteDevice } from "@/lib/actions/devices";
import { categoryGuide, categoryLabel, formatDate, warrantyStatus } from "@/lib/devices";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { ConfirmButton } from "@/components/ui/ConfirmButton";
import { StatusBadge } from "@/components/care/StatusBadge";
import { Reminders } from "@/components/app/Reminders";

export const metadata = { title: "Device" };

type Params = Promise<{ id: string }>;

export default function DevicePage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading device…">
      <Device params={params} />
    </AppPage>
  );
}

async function Device({ params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser(`/app/devices/${id}`);
  // Queries are scoped to the signed-in owner, so anyone else gets a plain 404.
  const device = isUuid(id) ? await getDevice(user.id, id) : null;
  if (!device) notFound();

  const today = todayISO();
  const status = warrantyStatus(device.warranty_expiry, today);
  const [tickets, reminders] = await Promise.all([listDeviceTickets(user.id, device.id), listDeviceReminders(user.id, device.id)]);

  return (
    <>
      <p className="back-link"><Link href="/app/devices">← All devices</Link></p>
      <PageHead
        eyebrow={categoryLabel(device.category)}
        title={device.name}
        sub={[device.brand, device.model].filter(Boolean).join(" ") || undefined}
        actions={
          <>
            <Link href={`/app/tickets/new?device=${device.id}`} className="btn btn--primary btn--sm">Report a problem</Link>
            <Link href={`/app/devices/${device.id}/edit`} className="btn btn--ghost btn--sm">Edit</Link>
            <ConfirmButton
              label="Remove"
              title={`Remove ${device.name}?`}
              description="Its details and warranty dates will be deleted. This can't be undone."
              confirmLabel="Remove device"
              action={deleteDevice}
              fields={{ deviceId: device.id }}
            />
          </>
        }
      />

      <div className="app-split app-split--wide">
        <section className="card">
          <h3>Details</h3>
          <dl className="detail-list">
            <div><dt>Category</dt><dd>{categoryLabel(device.category)}</dd></div>
            <div><dt>Room</dt><dd>{device.rooms?.name ?? "Not assigned"}</dd></div>
            <div><dt>Brand</dt><dd>{device.brand ?? "—"}</dd></div>
            <div><dt>Model</dt><dd>{device.model ?? "—"}</dd></div>
            {device.device_catalog && (
              <div>
                <dt>Catalogue type</dt>
                <dd>{device.device_catalog.name}{device.device_catalog.is_sample ? " (sample entry)" : ""}</dd>
              </div>
            )}
            <div><dt>Purchased</dt><dd>{formatDate(device.purchase_date)}</dd></div>
            <div>
              <dt>Warranty</dt>
              <dd>
                {status === "none" ? "Not recorded" : (
                  <span className={`status-chip status-chip--${status}`}>
                    {status === "expired" ? "Expired" : "Until"} {formatDate(device.warranty_expiry)}
                  </span>
                )}
              </dd>
            </div>
            <div><dt>Added</dt><dd>{formatDate(device.created_at)}</dd></div>
          </dl>
          {device.notes && (
            <>
              <h4 className="detail-subhead">Notes</h4>
              <p className="notes">{device.notes}</p>
            </>
          )}
        </section>

        <div className="stack">
          <section className="card">
            <h3>Guides for this device</h3>
            <ul className="guide-links">
              {device.manual_url && (
                <li><a href={device.manual_url} target="_blank" rel="noopener noreferrer">Manufacturer manual ↗</a></li>
              )}
              <li><Link href={categoryGuide(device.category)}>{categoryLabel(device.category)} — full technical guide</Link></li>
              <li><Link href="/installation">Installation &amp; setup manual</Link></li>
              <li><Link href="/security">Security &amp; privacy checklist</Link></li>
              <li><Link href="/troubleshooting">Troubleshooting center</Link></li>
            </ul>
          </section>
          <section className="card">
            <h3>Maintenance</h3>
            <Reminders deviceId={device.id} reminders={reminders} today={today} />
          </section>
          <section className="card">
            <h3>Support tickets</h3>
            {tickets.length ? (
              <ul className="row-list">
                {tickets.map((t) => (
                  <li key={t.id}>
                    <Link href={`/app/tickets/${t.id}`}>{t.title}</Link>
                    <StatusBadge status={t.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted-line">No tickets for this device. <Link href={`/app/tickets/new?device=${device.id}`}>Report a problem</Link> if something isn't working.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
