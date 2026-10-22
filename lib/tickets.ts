// SmartNest Care labels and rules shared by customer and staff screens.
// Values match the enums in supabase/migrations/*_smartnest_care.sql.

export const TICKET_STATUSES = [
  { value: "submitted", label: "Submitted", tone: "neutral" },
  { value: "under_review", label: "Under review", tone: "info" },
  { value: "in_progress", label: "In progress", tone: "accent" },
  { value: "resolved", label: "Resolved", tone: "success" },
  { value: "closed", label: "Closed", tone: "muted" },
] as const;

export const TICKET_CATEGORIES = [
  { value: "device_offline", label: "Device offline" },
  { value: "connectivity", label: "Connectivity problem" },
  { value: "installation", label: "Installation assistance" },
  { value: "automation", label: "Automation not working" },
  { value: "malfunction", label: "Device malfunction" },
  { value: "security_privacy", label: "Security or privacy concern" },
  { value: "other", label: "Other" },
] as const;

export const TICKET_PRIORITIES = [
  { value: "low", label: "Low — no rush" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High — affects daily use" },
  { value: "urgent", label: "Urgent — safety or security" },
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number]["value"];
export type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number]["value"];

const find = <T extends { value: string }>(list: readonly T[], v: string) => list.find((x) => x.value === v);

export const statusLabel = (v: string) => find(TICKET_STATUSES, v)?.label ?? v;
export const statusTone = (v: string) => find(TICKET_STATUSES, v)?.tone ?? "neutral";
export const categoryLabel = (v: string) => find(TICKET_CATEGORIES, v)?.label ?? v;
export const priorityLabel = (v: string) => find(TICKET_PRIORITIES, v)?.label.split(" — ")[0] ?? v;

export const OPEN_STATUSES: TicketStatus[] = ["submitted", "under_review", "in_progress", "resolved"];

// Mirrors public.ticket_transition_allowed (staff side); the database enforces it.
const STAFF_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  submitted: ["under_review", "in_progress", "closed"],
  under_review: ["in_progress", "resolved", "closed"],
  in_progress: ["under_review", "resolved", "closed"],
  resolved: ["in_progress", "closed"],
  closed: [],
};

export function staffNextStatuses(current: string): TicketStatus[] {
  return STAFF_TRANSITIONS[current as TicketStatus] ?? [];
}

export const PHOTO_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024;
