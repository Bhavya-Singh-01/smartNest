"use client";

import { createContext, use, useEffect, useRef, useState } from "react";

// Filters the server-rendered Problem/Cause/Solution tables by a search query:
// non-matching rows are hidden, and a whole group (heading + table) is hidden
// when none of its rows match.

const TroubleSearchContext = createContext(null);

export function TroubleshootingProvider({ children }) {
  const [query, setQuery] = useState("");
  return <TroubleSearchContext value={{ query, setQuery }}>{children}</TroubleSearchContext>;
}

export function TroubleSearchInput({ placeholder }) {
  const { query, setQuery } = use(TroubleSearchContext);
  return <input type="text" id="troubleSearch" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />;
}

export function TroubleGroup({ children }) {
  const { query } = use(TroubleSearchContext);
  const ref = useRef(null);

  // Rows are static server-rendered markup, so they are filtered on the DOM directly.
  useEffect(() => {
    const q = query.trim().toLowerCase();
    let visibleRows = 0;
    ref.current.querySelectorAll("tbody tr").forEach((row) => {
      const show = q === "" || row.textContent.toLowerCase().includes(q);
      row.style.display = show ? "" : "none";
      if (show) visibleRows++;
    });
    ref.current.style.display = visibleRows > 0 ? "" : "none";
  }, [query]);

  return <div ref={ref}>{children}</div>;
}
