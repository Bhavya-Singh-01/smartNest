"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/tickets", label: "Tickets" },
  { href: "/admin/catalog", label: "Device catalogue" },
];

// Section navigation for the support dashboard (same pattern as AppNav).
export function AdminNav() {
  return (
    <nav className="app-nav app-nav--admin" aria-label="Support dashboard">
      <div className="container app-nav-inner">
        <span className="app-nav-title">SmartNest Care · Staff</span>
        <div className="app-nav-links">
          <Suspense fallback={<Links pathname={null} />}>
            <ActiveLinks />
          </Suspense>
          <Link href="/app">My SmartNest</Link>
        </div>
      </div>
    </nav>
  );
}

function ActiveLinks() {
  return <Links pathname={usePathname()} />;
}

function Links({ pathname }: { pathname: string | null }) {
  return LINKS.map((l) => {
    const active = pathname !== null && (l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href));
    return (
      <Link key={l.href} href={l.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
        {l.label}
      </Link>
    );
  });
}
