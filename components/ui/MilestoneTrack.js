"use client";

import { setStoredFlag, useStoredFlags } from "@/lib/useStoredFlags";

// Clickable progress steps; each step's done state is saved in this browser.
export function MilestoneTrack({ trackId, steps }) {
  const keys = steps.map((_, i) => `sn-milestone-${trackId}-${i}`);
  const done = useStoredFlags(keys);
  const doneCount = done.filter(Boolean).length;

  return (
    <div className="milestone-track">
      <div className="milestone-line"></div>
      <div className="milestone-line-fill" style={{ width: (doneCount / steps.length) * 100 + "%" }}></div>
      {steps.map((label, i) => (
        <button
          key={label}
          className={"milestone-step" + (done[i] ? " done" : "")}
          onClick={() => setStoredFlag(keys[i], !done[i])}
        >
          <span className="dot">{i + 1}</span>
          <span className="label">{label}</span>
        </button>
      ))}
    </div>
  );
}
