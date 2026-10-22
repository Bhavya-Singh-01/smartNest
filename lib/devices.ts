// Device categories shared by forms, lists and guide links. Values match the
// `device_category` enum in the database.

export const DEVICE_CATEGORIES = [
  { value: "lighting", label: "Lighting", guide: "/devices#guide-bulbs" },
  { value: "plug", label: "Smart plug", guide: "/devices#guide-plugs" },
  { value: "lock", label: "Smart lock", guide: "/devices#guide-locks" },
  { value: "camera", label: "Camera", guide: "/devices#guide-cameras" },
  { value: "door_sensor", label: "Door / window sensor", guide: "/devices#guide-doorsensors" },
  { value: "motion_sensor", label: "Motion sensor", guide: "/devices#guide-motion" },
  { value: "speaker", label: "Smart speaker", guide: "/devices#guide-speakers" },
  { value: "climate", label: "Climate control", guide: "/devices#guide-thermostat" },
  { value: "energy", label: "Energy monitor", guide: "/devices#guide-energy" },
  { value: "hub", label: "Hub / bridge", guide: "/basics#hubs" },
  { value: "other", label: "Other", guide: "/devices" },
] as const;

export type DeviceCategory = (typeof DEVICE_CATEGORIES)[number]["value"];

const byValue = new Map<string, (typeof DEVICE_CATEGORIES)[number]>(DEVICE_CATEGORIES.map((c) => [c.value, c]));

export function categoryLabel(value: string): string {
  return byValue.get(value)?.label ?? "Other";
}

export function categoryGuide(value: string): string {
  return byValue.get(value)?.guide ?? "/devices";
}

export function isDeviceCategory(value: string): value is DeviceCategory {
  return byValue.has(value);
}

export const HOME_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "Independent house" },
  { value: "studio", label: "Studio / 1RK" },
] as const;

export type HomeType = (typeof HOME_TYPES)[number]["value"];

export function homeTypeLabel(value: string): string {
  return HOME_TYPES.find((t) => t.value === value)?.label ?? value;
}

// Warranty status relative to `today` (YYYY-MM-DD strings compare correctly).
export const WARRANTY_SOON_DAYS = 60;

export function warrantyStatus(expiry: string | null, today: string): "none" | "expired" | "soon" | "ok" {
  if (!expiry) return "none";
  if (expiry < today) return "expired";
  const soon = new Date(today + "T00:00:00Z");
  soon.setUTCDate(soon.getUTCDate() + WARRANTY_SOON_DAYS);
  return expiry <= soon.toISOString().slice(0, 10) ? "soon" : "ok";
}

export function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value.length === 10 ? value + "T00:00:00" : value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
