"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// Re-renders the page when this ticket changes (status or new timeline entry).
// Supabase Realtime applies the same RLS policies, so customers never receive
// internal notes. Falls back to refreshing when the tab regains focus.
export function LiveRefresh({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [live, setLive] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | null = null;
    let cancelled = false;

    // Load the session first: subscribing with the anonymous key would make
    // RLS (correctly) hide every event from this user.
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled || !data.session) return;
      await supabase.realtime.setAuth(data.session.access_token);
      channel = supabase
        .channel(`ticket-${ticketId}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "ticket_updates", filter: `ticket_id=eq.${ticketId}` }, () => router.refresh())
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "support_tickets", filter: `id=eq.${ticketId}` }, () => router.refresh())
        .subscribe((status) => setLive(status === "SUBSCRIBED"));
    })();

    const onFocus = () => router.refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      if (channel) supabase.removeChannel(channel);
    };
  }, [ticketId, router]);

  return (
    <span className={"live-indicator" + (live ? " live-indicator--on" : "")} title={live ? "Updates appear automatically" : "Connecting to live updates…"}>
      {live ? "Live updates" : "Connecting…"}
    </span>
  );
}
