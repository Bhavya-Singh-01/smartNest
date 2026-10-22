"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import { SEARCH_INDEX } from "@/lib/search-index";

function searchIndex(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;
  return SEARCH_INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.tags.join(" ").toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
  ).slice(0, 8);
}

// Theme lives on <html data-theme>; the inline script in the root layout applies
// the saved choice before first paint. Ivory (light) is the default.
function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem("sn-theme", next);
  } catch {
    // storage unavailable: theme just won't persist
  }
}

export function Header({ account }) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const results = searchIndex(query);

  // Close the search panel on any click outside it.
  useEffect(() => {
    if (!searchOpen) return;
    const onClick = (e) => {
      if (!searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current.focus();
  }, [searchOpen]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <span className="logo-mark">SN</span>
          <span className="brand-word">
            <span style={{ display: "block" }}>SmartNest</span>
            <small>Smart Living, Simplified</small>
          </span>
        </Link>
        <nav className={"main-nav" + (navOpen ? " open" : "")} id="mainNav">
          {/* Reading the URL needs a Suspense boundary on dynamic routes; the
              fallback is the same links without the active highlight. */}
          <Suspense fallback={<NavLinks pathname={null} onNavigate={() => setNavOpen(false)} />}>
            <ActiveNavLinks onNavigate={() => setNavOpen(false)} />
          </Suspense>
        </nav>
        <div className="nav-actions">
          <div className="header-search" ref={searchRef}>
            <button className="icon-btn" id="searchToggle" title="Search the manual" aria-label="Search" onClick={() => setSearchOpen((o) => !o)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg>
            </button>
            <div className={"header-search-panel" + (searchOpen ? "" : " hidden")} id="searchPanel">
              <div className="search-box">
                <span className="search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  id="globalSearch"
                  placeholder="Search: lock, Matter, Wi-Fi, installation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results?.length) {
                      router.push(results[0].url);
                      closeSearch();
                    }
                  }}
                />
              </div>
              <div className={"header-search-results" + (results ? "" : " hidden")} id="globalSearchResults">
                {results && results.length === 0 && (
                  <div className="header-search-empty">
                    No results for “{query}”. Try “lock”, “Matter”, “Wi-Fi” or “installation”.
                  </div>
                )}
                {results?.map((m) => (
                  <Link key={m.title + m.url} href={m.url} onClick={closeSearch}>
                    <span className="r-title">{m.title}</span>
                    <span className="r-meta">{m.section}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button className="icon-btn" id="themeToggle" title="Toggle theme" aria-label="Toggle theme" onClick={toggleTheme}>
            <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
          </button>
          {account}
          <Link href="/planner" className="btn btn--primary btn--sm nav-cta">Start Building</Link>
          <button className="nav-toggle" id="navToggle" aria-label="Menu" onClick={() => setNavOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function ActiveNavLinks({ onNavigate }) {
  return <NavLinks pathname={usePathname()} onNavigate={onNavigate} />;
}

function NavLinks({ pathname, onNavigate }) {
  return NAV_LINKS.map((l) => (
    <Link key={l.href} href={l.href} className={"nav-link" + (l.href === pathname ? " active" : "")} onClick={onNavigate}>
      {l.label}
    </Link>
  ));
}
