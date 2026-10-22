"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Rendered on the client only, so prerendered pages never bake in a stale year.
export function CurrentYear() {
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => "");
}
