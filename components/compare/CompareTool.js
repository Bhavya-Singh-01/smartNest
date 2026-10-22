"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPARE_ATTRS, COMPARE_DEVICES } from "@/lib/compare";

export function CompareTool() {
  const [selectedIds, setSelectedIds] = useState(() => COMPARE_DEVICES.slice(0, 2).map((d) => d.id));
  const selected = COMPARE_DEVICES.filter((d) => selectedIds.includes(d.id));

  function toggle(id, checked) {
    setSelectedIds((ids) => (checked ? [...ids, id] : ids.filter((x) => x !== id)));
  }

  return (
    <>
      <div className="compare-picker" id="comparePicker">
        {COMPARE_DEVICES.map((d) => (
          <span key={d.id}>
            <input type="checkbox" id={"cmp-" + d.id} value={d.id} checked={selectedIds.includes(d.id)} onChange={(e) => toggle(d.id, e.target.checked)} />
            <label className="pill" htmlFor={"cmp-" + d.id}>{d.name}</label>
          </span>
        ))}
      </div>

      {selected.length < 2 ? (
        <div id="compareEmpty" className="card text-center" style={{ padding: "60px 24px" }}>
          <p style={{ margin: 0 }}>Select at least two devices above to see a comparison.</p>
        </div>
      ) : (
        <div className="table-wrap" id="compareTableWrap">
          <table className="compare" id="compareTable">
            <thead>
              <tr>
                <th>Attribute</th>
                {selected.map((d) => (
                  <th key={d.id}>
                    <Link href={d.url} style={{ color: "inherit" }}>{d.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ATTRS.map((attr) => (
                <tr key={attr}>
                  <td style={{ fontWeight: 600, color: "var(--sn-fg)" }}>{attr}</td>
                  {selected.map((d) => (
                    <td key={d.id}>{d.attrs[attr]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
