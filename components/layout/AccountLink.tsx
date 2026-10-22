import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

// Text button on desktop, icon button on phones (see .nav-account in globals.css).
function AccountButton({ href, label, title }: { href: string; label: string; title?: string }) {
  return (
    <Link href={href} className="btn btn--ghost btn--sm nav-account" title={title ?? label} aria-label={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 21a8 8 0 0 1 16 0"></path>
      </svg>
      <span className="nav-account-label">{label}</span>
    </Link>
  );
}

export function LoginLink() {
  return <AccountButton href="/login" label="Log in" />;
}

// Rendered per request inside <Suspense>; the rest of the header stays static.
export async function AccountLink() {
  if (!isSupabaseConfigured()) return <LoginLink />;

  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    unstable_rethrow(error); // let Next.js prerender/redirect signals through
    // A profile lookup failure shouldn't take down every public page; the
    // dashboard surfaces the same error properly.
    console.error("Header account lookup failed", error);
    return <LoginLink />;
  }
  if (!user) return <LoginLink />;

  return <AccountButton href="/app" label="My SmartNest" title={`Signed in as ${user.email}`} />;
}
