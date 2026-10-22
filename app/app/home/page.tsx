import { requireUser } from "@/lib/auth";
import { getHome } from "@/lib/data";
import { homeTypeLabel } from "@/lib/devices";
import { AppPage, EmptyState, PageHead } from "@/components/app/AppPage";
import { AddRoomForm, HomeForm, RoomRow } from "@/components/app/HomeForms";

export const metadata = { title: "My Home" };

export default function HomePage() {
  return (
    <AppPage loading="Loading your home…">
      <MyHome />
    </AppPage>
  );
}

async function MyHome() {
  const user = await requireUser("/app/home");
  const home = await getHome(user.id);

  if (!home) {
    return (
      <>
        <PageHead eyebrow="My Home" title="Set up your home" sub="Tell us a little about your home. You can change this any time." />
        <div className="card form-card">
          <HomeForm home={null} />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHead
        eyebrow="My Home"
        title={home.name}
        sub={[homeTypeLabel(home.home_type), home.city].filter(Boolean).join(" · ")}
      />
      <div className="app-split app-split--wide">
        <section className="card">
          <h3>Rooms</h3>
          {home.rooms.length ? (
            <ul className="room-list">
              {home.rooms.map((room) => (
                <RoomRow key={room.id} room={room} />
              ))}
            </ul>
          ) : (
            <EmptyState title="No rooms yet">Add the rooms you want to organise devices by — living room, bedrooms, kitchen, entrance.</EmptyState>
          )}
          <AddRoomForm homeId={home.id} />
        </section>
        <section className="card">
          <h3>Home details</h3>
          <HomeForm home={home} />
        </section>
      </div>
    </>
  );
}
