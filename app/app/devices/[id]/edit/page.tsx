import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getDevice, listCatalog, listRooms, todayISO } from "@/lib/data";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { DeviceForm } from "@/components/app/DeviceForm";

export const metadata = { title: "Edit device" };

type Params = Promise<{ id: string }>;

export default function EditDevicePage({ params }: { params: Params }) {
  return (
    <AppPage loading="Loading device…">
      <EditDevice params={params} />
    </AppPage>
  );
}

async function EditDevice({ params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser(`/app/devices/${id}/edit`);
  const device = isUuid(id) ? await getDevice(user.id, id) : null;
  if (!device) notFound();
  const [rooms, catalog] = await Promise.all([listRooms(user.id), listCatalog()]);

  return (
    <>
      <p className="back-link"><Link href={`/app/devices/${device.id}`}>← {device.name}</Link></p>
      <PageHead eyebrow="Devices" title="Edit device" />
      <div className="card form-card">
        <DeviceForm device={device} rooms={rooms} catalog={catalog} today={todayISO()} />
      </div>
    </>
  );
}
