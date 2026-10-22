import { requireUser } from "@/lib/auth";
import { listCatalog, listRooms, todayISO } from "@/lib/data";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { DeviceForm } from "@/components/app/DeviceForm";

export const metadata = { title: "Add a device" };

export default function NewDevicePage() {
  return (
    <AppPage loading="Loading…">
      <NewDevice />
    </AppPage>
  );
}

async function NewDevice() {
  const user = await requireUser("/app/devices/new");
  const [rooms, catalog] = await Promise.all([listRooms(user.id), listCatalog()]);
  return (
    <>
      <PageHead eyebrow="Devices" title="Add a device" sub="Register a device you own. Only the name and category are required." />
      <div className="card form-card">
        <DeviceForm rooms={rooms} catalog={catalog} today={todayISO()} />
      </div>
    </>
  );
}
