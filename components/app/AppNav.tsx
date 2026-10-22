"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/app", label: "Overview" },
  { href: "/app/home", label: "My Home" },
  { href: "/app/devices", label: "Devices" },
  { href: "/app/plans", label: "Plans" },
  { href: "/app/tickets", label: "Support" },
  { href: "/app/account", label: "Account" },
];

// Section navigation for My SmartNest. The active highlight reads the URL,
// which needs a Suspense boundary on dynamic routes like /app/devices/[id].
export function AppNav() {
  return (
    <nav className="app-nav" aria-label="My SmartNest">
      <div className="container app-nav-inner">
        <span className="app-nav-title">My SmartNest</span>
        <div className="app-nav-links">
          <Suspense fallback={<AppNavLinks pathname={null} />}>
            <ActiveAppNavLinks />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

function ActiveAppNavLinks() {
  return <AppNavLinks pathname={usePathname()} />;
}

function AppNavLinks({ pathname }: { pathname: string | null }) {
  return LINKS.map((l) => {
    const active = pathname !== null && (l.href === "/app" ? pathname === "/app" : pathname.startsWith(l.href));
    return (
      <Link key={l.href} href={l.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
        {l.label}
      </Link>
    );
  });
}
