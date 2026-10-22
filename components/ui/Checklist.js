"use client";

import { setStoredFlag, useStoredFlags } from "@/lib/useStoredFlags";

const storageKey = (id) => "sn-checklist-" + id;

// items: [{ id, label }] — progress is saved per item id in this browser.
export function Checklist({ items, style }) {
  const checked = useStoredFlags(items.map((item) => storageKey(item.id)));
  const done = checked.filter(Boolean).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  return (
    <div className="checklist-widget" style={style}>
      <div className="checklist-widget-head">
        <span className="checklist-progress-label">{done} / {items.length} complete</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: pct + "%" }}></div>
      </div>
      <ul className="checklist">
        {items.map((item, i) => (
          <li key={item.id} className={checked[i] ? "checked" : undefined}>
            <input
              type="checkbox"
              id={item.id}
              checked={checked[i]}
              onChange={(e) => setStoredFlag(storageKey(item.id), e.target.checked)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
