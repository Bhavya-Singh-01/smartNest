"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Success messages after a redirect (e.g. /app/devices?toast=device-added).
// Only known keys are shown, so the URL can't inject arbitrary text.
const MESSAGES: Record<string, string> = {
  "home-created": "Your home is set up. Add rooms next.",
  "home-saved": "Home details saved.",
  "room-deleted": "Room deleted. Its devices are now unassigned.",
  "device-added": "Device added to My Home.",
  "device-saved": "Device details saved.",
  "device-deleted": "Device removed.",
  "plan-saved": "Plan saved.",
  "plan-deleted": "Plan deleted.",
  "plan-already-added": "This plan's devices were already added to My Home.",
  "ticket-created": "Ticket submitted. We'll update it here.",
  "ticket-closed": "Thanks for confirming — ticket closed.",
  "ticket-reopened": "Ticket reopened. Support will take another look.",
  "ticket-assigned": "Ticket assigned to you.",
  "catalog-added": "Catalogue entry added.",
  "catalog-saved": "Catalogue entry saved.",
  "catalog-hidden": "Entry hidden from customers.",
  "catalog-restored": "Entry visible to customers again.",
};

export function Toast() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const key = params.get("toast");
  // "plan-added" carries a numeric count; anything else must be a known key.
  const count = Number(params.get("count"));
  const message =
    key === "plan-added" && Number.isInteger(count) && count > 0
      ? `${count} ${count === 1 ? "device" : "devices"} added to My Home.`
      : key
        ? MESSAGES[key]
        : undefined;

  // Remove the flag from the URL after a few seconds (also hides the toast).
  useEffect(() => {
    if (!key) return;
    const timer = setTimeout(() => {
      const next = new URLSearchParams(params);
      next.delete("toast");
      next.delete("count");
      router.replace(pathname + (next.size ? `?${next}` : ""), { scroll: false });
    }, 4500);
    return () => clearTimeout(timer);
  }, [key, params, pathname, router]);

  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-mark" aria-hidden="true">✓</span>
      {message}
    </div>
  );
}
