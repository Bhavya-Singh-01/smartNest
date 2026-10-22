"use client";

import { createContext, use, useEffect, useRef, useState } from "react";

// Category tabs + text search for the Device Manual. The guides themselves are
// large server-rendered children, so search matches against their rendered text.

const DeviceFilterContext = createContext(null);

export function DeviceFilterProvider({ children }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  return <DeviceFilterContext value={{ category, setCategory, query, setQuery }}>{children}</DeviceFilterContext>;
}

export function DeviceSearchInput({ placeholder }) {
  const { query, setQuery } = use(DeviceFilterContext);
  return <input type="text" id="deviceSearch" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />;
}

export function CategoryTab({ filter, children }) {
  const { category, setCategory } = use(DeviceFilterContext);
  return (
    <button className={"tab-btn" + (category === filter ? " active" : "")} onClick={() => setCategory(filter)}>
      {children}
    </button>
  );
}

export function GuideLaunchCard({ category, target, children }) {
  const { category: active } = use(DeviceFilterContext);
  const visible = active === "all" || active === category;
  return (
    <button
      className={"guide-launch-card" + (visible ? "" : " hidden")}
      onClick={() => {
        window.location.hash = target;
      }}
    >
      {children}
    </button>
  );
}

export function DeviceGuide({ id, category, name, children }) {
  const { category: active, query } = use(DeviceFilterContext);
  const ref = useRef(null);
  const matchesCategory = active === "all" || active === category;

  // The guide's content is static, so its text is read straight from the DOM
  // rather than duplicated as a prop; visibility is toggled on the same node.
  useEffect(() => {
    const q = query.trim().toLowerCase();
    const el = ref.current;
    const matchesSearch = q === "" || name.toLowerCase().includes(q) || el.textContent.toLowerCase().includes(q);
    el.classList.toggle("hidden", !(matchesCategory && matchesSearch));
  }, [matchesCategory, query, name]);

  return (
    <article ref={ref} className="device-guide" id={id}>
      {children}
    </article>
  );
}
