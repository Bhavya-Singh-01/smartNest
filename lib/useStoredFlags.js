import { useSyncExternalStore } from "react";

// Boolean flags persisted in localStorage ("1"/"0"), shared by the checklist and
// milestone widgets. Reads go through useSyncExternalStore so the server render
// (everything unchecked) hydrates cleanly before saved progress is applied.

const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readFlag(key) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false; // storage unavailable (private mode, blocked site data)
  }
}

export function setStoredFlag(key, value) {
  try {
    localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // storage unavailable: progress just won't persist across visits
  }
  listeners.forEach((l) => l());
}

export function useStoredFlags(keys) {
  // Snapshot is a string so React can compare it by value between renders.
  const snapshot = useSyncExternalStore(
    subscribe,
    () => keys.map((k) => (readFlag(k) ? "1" : "0")).join(""),
    () => "0".repeat(keys.length)
  );
  return [...snapshot].map((c) => c === "1");
}
