import { requireUser } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth";
import { formatDate } from "@/lib/devices";
import { ProfileForm } from "@/components/account/ProfileForm";
import { AppPage, PageHead } from "@/components/app/AppPage";

export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <AppPage loading="Loading your account…">
      <Account />
    </AppPage>
  );
}

async function Account() {
  const user = await requireUser("/app/account");
  return (
    <>
      <PageHead
        eyebrow="Account"
        title="Your account"
        sub={`Signed in as ${user.email}`}
        actions={
          <form action={signOut}>
            <button type="submit" className="btn btn--ghost btn--sm">Log out</button>
          </form>
        }
      />
      <div className="grid grid--2 app-split">
        <div className="card">
          <h3>Profile</h3>
          <ProfileForm fullName={user.profile.full_name} phone={user.profile.phone} />
        </div>
        <div className="card">
          <h3>Account details</h3>
          <dl className="detail-list">
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Account type</dt><dd>{user.profile.role === "admin" ? "Support staff" : "Customer"}</dd></div>
            <div><dt>Member since</dt><dd>{formatDate(user.profile.created_at)}</dd></div>
          </dl>
        </div>
      </div>
    </>
  );
}
