import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listDevices, listRooms, todayISO } from "@/lib/data";
import { categoryLabel, formatDate, warrantyStatus } from "@/lib/devices";
import { isUuid } from "@/lib/validation";
import { AppPage, EmptyState, PageHead } from "@/components/app/AppPage";

export const metadata = { title: "Devices" };

type SearchParams = Promise<{ room?: string }>;

export default function DevicesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <AppPage loading="Loading your devices…">
      <Devices searchParams={searchParams} />
    </AppPage>
  );
}

async function Devices({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser("/app/devices");
  const { room } = await searchParams;
  const roomFilter = room === "none" || isUuid(room) ? room : undefined;
  const [devices, rooms] = await Promise.all([listDevices(user.id, roomFilter), listRooms(user.id)]);
  const today = todayISO();
  const activeRoom = rooms.find((r) => r.id === roomFilter);

  return (
    <>
      <PageHead
        eyebrow="My Home"
        title="Devices"
        sub="Everything you've registered, with warranty status at a glance."
        actions={<Link href="/app/devices/new" className="btn btn--primary btn--sm">Add a device</Link>}
      />

      {rooms.length > 0 && (
        <nav className="filter-bar" aria-label="Filter by room">
          <Link href="/app/devices" className={"tab-btn" + (!roomFilter ? " active" : "")}>All rooms</Link>
          {rooms.map((r) => (
            <Link key={r.id} href={`/app/devices?room=${r.id}`} className={"tab-btn" + (roomFilter === r.id ? " active" : "")}>{r.name}</Link>
          ))}
          <Link href="/app/devices?room=none" className={"tab-btn" + (roomFilter === "none" ? " active" : "")}>No room</Link>
        </nav>
      )}

      {devices.length ? (
        <div className="table-wrap">
          <table className="compare data-table">
            <thead>
              <tr><th>Device</th><th>Category</th><th>Room</th><th>Purchased</th><th>Warranty</th></tr>
            </thead>
            <tbody>
              {devices.map((d) => {
                const status = warrantyStatus(d.warranty_expiry, today);
                return (
                  <tr key={d.id}>
                    <td>
                      <Link href={`/app/devices/${d.id}`} className="row-title">{d.name}</Link>
                      {(d.brand || d.model) && <span className="row-sub">{[d.brand, d.model].filter(Boolean).join(" ")}</span>}
                    </td>
                    <td>{categoryLabel(d.category)}</td>
                    <td>{d.rooms?.name ?? "—"}</td>
                    <td>{formatDate(d.purchase_date)}</td>
                    <td>
                      {status === "none" ? "—" : (
                        <span className={`status-chip status-chip--${status}`}>
                          {status === "expired" ? "Expired" : status === "soon" ? "Ends" : "Until"} {formatDate(d.warranty_expiry)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title={roomFilter ? `No devices in ${activeRoom?.name ?? "this view"}` : "No devices yet"}
          action={<Link href="/app/devices/new" className="btn btn--primary">Add a device</Link>}
        >
          {roomFilter
            ? "Devices you place in this room will show up here."
            : "Register the smart devices you own to keep their details, warranty dates and guides in one place."}
        </EmptyState>
      )}
    </>
  );
}
