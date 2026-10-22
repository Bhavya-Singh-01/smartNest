import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listDevices, listRooms } from "@/lib/data";
import { isUuid } from "@/lib/validation";
import { AppPage, PageHead } from "@/components/app/AppPage";
import { TicketForm } from "@/components/care/TicketForm";

export const metadata = { title: "Report a problem" };

type SearchParams = Promise<{ device?: string }>;

export default function NewTicketPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <AppPage loading="Loading…">
      <NewTicket searchParams={searchParams} />
    </AppPage>
  );
}

async function NewTicket({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser("/app/tickets/new");
  const { device } = await searchParams;
  const [devices, rooms] = await Promise.all([listDevices(user.id), listRooms(user.id)]);
  const preselect = isUuid(device) && devices.some((d) => d.id === device) ? device : undefined;

  return (
    <>
      <p className="back-link"><Link href="/app/tickets">← All tickets</Link></p>
      <PageHead
        eyebrow="SmartNest Care"
        title="Report a problem"
        sub={<>Before you start, the <Link href="/troubleshooting">Troubleshooting Center</Link> solves many common issues in a few minutes.</>}
      />
      <div className="card form-card">
        <TicketForm devices={devices.map((d) => ({ id: d.id, name: d.name, room_id: d.room_id }))} rooms={rooms} preselectDevice={preselect} />
      </div>
    </>
  );
}
