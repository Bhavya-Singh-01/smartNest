import { statusLabel, statusTone } from "@/lib/tickets";

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-badge--${statusTone(status)}`}>{statusLabel(status)}</span>;
}
