// SmartNest Planner — transparent, rule-based recommendations (no AI/ML).
//
// The rules decide WHAT a home needs (slots, quantities, priorities); the
// device catalogue decides WHICH product fills each slot and at what price.
// The same function runs in the browser (instant results) and on the server
// (when a plan is saved), so stored plans can't be tampered with.

export type Owned = "hub" | "speaker" | "lighting" | "lock" | "camera" | "sensors" | "plug" | "climate";
export type Priority = "lighting" | "security" | "energy" | "climate" | "voice";
export type HomeType = "apartment" | "house" | "studio";

export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  brand: string | null;
  model: string | null;
  est_price_inr: number | null;
  source_url: string | null;
  is_sample: boolean;
  planner_slot: string | null;
  needs_hub: boolean;
};

export type PlanInput = {
  homeType: HomeType;
  rooms: number;
  priorities: Priority[];
  budget: number;
  existing: Owned[];
};

export const PRIORITY_LABELS: Record<Priority, string> = { lighting: "Lighting", security: "Security", energy: "Energy Saving", climate: "Climate", voice: "Voice Control" };
export const HOME_TYPE_LABELS: Record<HomeType, string> = { apartment: "Apartment", house: "Independent House", studio: "Studio / 1RK" };
export const OWNED_LABELS: Record<Owned, string> = {
  hub: "A smart hub",
  speaker: "A smart speaker",
  lighting: "Smart bulbs or switches",
  lock: "A smart lock",
  camera: "Security cameras",
  sensors: "Door or motion sensors",
  plug: "Smart plugs",
  climate: "AC controller or thermostat",
};

export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

type Slot = {
  slot: string;
  title: string; // plain-language name used in warnings
  group: Priority | "core";
  label: string; // category label shown in results
  deviceCategory: string; // user_devices category when added to My Home
  owned: Owned;
  essential: boolean;
  qty: (rooms: number, homeType: HomeType) => number;
  reason: (qty: number, input: PlanInput) => string;
  automations: string[];
  guide: string;
};

// Order matters: equal-priced items keep this order (matches the original planner).
export const SLOTS: Slot[] = [
  { slot: "hub", title: "a smart hub", group: "core", label: "Hub", deviceCategory: "hub", owned: "hub", essential: true, qty: () => 1, automations: [], guide: "/basics#hubs",
    reason: () => "Connects Zigbee/Thread sensors to your network and lets devices from different brands work together." },
  { slot: "bulb", title: "smart bulbs", group: "lighting", label: "Lighting", deviceCategory: "lighting", owned: "lighting", essential: true, qty: (r) => Math.max(2, Math.min(r, 6)), automations: ["Morning Routine", "Good Night Routine"], guide: "/devices#guide-bulbs",
    reason: (q, i) => `One per main room for app and voice-controlled lighting: ${i.rooms} ${i.rooms === 1 ? "room" : "rooms"} → ${q} (minimum 2, maximum 6).` },
  { slot: "switch", title: "smart switches", group: "lighting", label: "Lighting", deviceCategory: "lighting", owned: "lighting", essential: false, qty: (r) => Math.min(Math.ceil(r / 2), 3), automations: ["Morning Routine"], guide: "/devices#guide-bulbs",
    reason: (q) => `Controls existing fixtures without replacing bulbs — one per two rooms (${q}, up to 3).` },
  { slot: "speaker", title: "a smart speaker", group: "voice", label: "Voice Control", deviceCategory: "speaker", owned: "speaker", essential: true, qty: () => 1, automations: ["Morning Routine", "Good Night Routine"], guide: "/devices#guide-speakers",
    reason: () => "Voice control for lights, plugs and routines from one place." },
  { slot: "speaker2", title: "a second speaker", group: "voice", label: "Voice Control", deviceCategory: "speaker", owned: "speaker", essential: false, qty: (r) => (r >= 4 ? 1 : 0), automations: [], guide: "/devices#guide-speakers",
    reason: () => "A second speaker so voice control reaches the far end of a home with 4 or more rooms." },
  { slot: "lock", title: "a smart lock", group: "security", label: "Security", deviceCategory: "lock", owned: "lock", essential: true, qty: () => 1, automations: ["Coming Home", "Leaving Home", "Good Night Routine"], guide: "/devices#guide-locks",
    reason: () => "Keyless entry with guest codes and an activity log for the main door." },
  { slot: "camera_out", title: "outdoor cameras", group: "security", label: "Security", deviceCategory: "camera", owned: "camera", essential: true, qty: (r, h) => (h === "house" ? 2 : 1), automations: ["Security Routine"], guide: "/devices#guide-cameras",
    reason: (q, i) => (i.homeType === "house" ? `Covers the front and back entrances of an independent house (${q}).` : "Covers your main entrance.") },
  { slot: "camera_in", title: "an indoor camera", group: "security", label: "Security", deviceCategory: "camera", owned: "camera", essential: false, qty: () => 1, automations: ["Security Routine"], guide: "/devices#guide-cameras",
    reason: () => "Watches the main living area while you're away." },
  { slot: "sensor", title: "door/window sensors", group: "security", label: "Security", deviceCategory: "door_sensor", owned: "sensors", essential: true, qty: (r) => Math.min(Math.max(2, Math.ceil(r / 1.5)), 6), automations: ["Security Routine", "Coming Home"], guide: "/devices#guide-doorsensors",
    reason: (q) => `Alerts you if a door or window opens while you're away — about one per 1.5 rooms (${q}, between 2 and 6).` },
  { slot: "motion_sec", title: "security motion sensors", group: "security", label: "Security", deviceCategory: "motion_sensor", owned: "sensors", essential: false, qty: (r) => Math.min(Math.ceil(r / 3), 2), automations: ["Security Routine"], guide: "/devices#guide-motion",
    reason: (q) => `Detects movement on approach paths while the home is armed (${q}).` },
  { slot: "eplug", title: "energy-monitoring plugs", group: "energy", label: "Energy Saving", deviceCategory: "plug", owned: "plug", essential: true, qty: (r) => Math.min(Math.max(2, Math.ceil(r / 2)), 4), automations: ["Energy-Saving Routine", "Leaving Home"], guide: "/devices#guide-plugs",
    reason: (q) => `Measures and switches power-hungry appliances — one per two rooms (${q}, between 2 and 4).` },
  { slot: "motion_energy", title: "lighting motion sensors", group: "energy", label: "Energy Saving", deviceCategory: "motion_sensor", owned: "sensors", essential: false, qty: (r) => Math.min(Math.ceil(r / 2), 3), automations: ["Motion-Based Lighting"], guide: "/devices#guide-motion",
    reason: (q) => `Turns lights off automatically in empty rooms (${q}).` },
  { slot: "acctrl", title: "AC controllers", group: "climate", label: "Climate", deviceCategory: "climate", owned: "climate", essential: true, qty: (r) => Math.min(Math.max(1, Math.ceil(r / 3)), 3), automations: ["Coming Home", "Energy-Saving Routine"], guide: "/devices#guide-thermostat",
    reason: (q) => `Adds schedules and app control to existing split/window ACs — one per three rooms (${q}).` },
  { slot: "thermostat", title: "a smart thermostat", group: "climate", label: "Climate", deviceCategory: "climate", owned: "climate", essential: false, qty: (r, h) => (h === "house" ? 1 : 0), automations: ["Coming Home", "Leaving Home"], guide: "/devices#guide-thermostat",
    reason: () => "Whole-home temperature schedules for central HVAC, which independent houses are more likely to have." },
];

export type PlanItem = {
  key: string;
  catalogId: string;
  name: string;
  category: string;
  deviceCategory: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  essential: boolean;
  needsHub: boolean;
  isSample: boolean;
  sourceUrl: string | null;
  reason: string;
  guide: string;
  automations: string[];
  note?: string;
};

export type SkippedItem = { key: string; name: string; qty: number; lineTotal: number; shortBy: number };

export type PlanResult = {
  input: PlanInput;
  items: PlanItem[];
  total: number;
  budget: number;
  remaining: number;
  categoryTotals: Record<string, number>; // device counts
  categoryCosts: Record<string, number>;
  automations: string[];
  needsHub: boolean;
  warnings: string[];
  skipped: SkippedItem[];
  usesSampleData: boolean;
};

// Cheapest product for a slot; verified (non-sample) products win over samples.
function pickProduct(pool: CatalogProduct[]): CatalogProduct {
  const verified = pool.filter((p) => !p.is_sample);
  const list = verified.length ? verified : pool;
  return [...list].sort((a, b) => (a.est_price_inr ?? 0) - (b.est_price_inr ?? 0))[0];
}

export function buildPlan(input: PlanInput, catalog: CatalogProduct[]): PlanResult {
  const allowed = new Set<string>(["core", ...input.priorities]);
  const owned = new Set(input.existing);
  const warnings: string[] = [];

  const candidates: PlanItem[] = [];
  for (const slot of SLOTS) {
    if (!allowed.has(slot.group) || owned.has(slot.owned)) continue;
    const qty = slot.qty(input.rooms, input.homeType);
    if (qty <= 0) continue;

    const products = catalog.filter((p) => p.planner_slot === slot.slot && p.est_price_inr !== null);
    if (!products.length) {
      warnings.push(`No catalogue product is currently available for ${slot.title}, so it's left out of this plan.`);
      continue;
    }
    const product = pickProduct(products);
    const unitPrice = product.est_price_inr ?? 0;
    candidates.push({
      key: slot.slot,
      catalogId: product.id,
      name: product.name,
      category: slot.label,
      deviceCategory: slot.deviceCategory,
      qty,
      unitPrice,
      lineTotal: unitPrice * qty,
      essential: slot.essential,
      needsHub: product.needs_hub,
      isSample: product.is_sample,
      sourceUrl: product.source_url,
      reason: slot.reason(qty, input),
      guide: slot.guide,
      automations: slot.automations,
    });
  }

  // Essentials first, then optional upgrades; cheaper first within each group.
  candidates.sort((a, b) => (a.essential !== b.essential ? (a.essential ? -1 : 1) : a.unitPrice - b.unitPrice));

  const items: PlanItem[] = [];
  const skipped: SkippedItem[] = [];
  let total = 0;
  for (const item of candidates) {
    if (total + item.lineTotal <= input.budget) {
      items.push(item);
      total += item.lineTotal;
      continue;
    }
    if (item.essential) {
      const affordable = Math.floor((input.budget - total) / item.unitPrice);
      if (affordable >= 1) {
        items.push({ ...item, qty: affordable, lineTotal: affordable * item.unitPrice, note: `Reduced from ${item.qty} to fit the budget` });
        total += affordable * item.unitPrice;
        continue;
      }
    }
    skipped.push({ key: item.key, name: item.name, qty: item.qty, lineTotal: item.lineTotal, shortBy: total + item.lineTotal - input.budget });
  }

  const categoryTotals: Record<string, number> = {};
  const categoryCosts: Record<string, number> = {};
  const automations = new Set<string>();
  let needsHub = false;
  for (const item of items) {
    if (item.category !== "Hub") categoryTotals[item.category] = (categoryTotals[item.category] ?? 0) + item.qty;
    categoryCosts[item.category] = (categoryCosts[item.category] ?? 0) + item.lineTotal;
    if (item.needsHub) needsHub = true;
    item.automations.forEach((a) => automations.add(a));
  }

  if (needsHub && !items.some((i) => i.key === "hub") && !owned.has("hub")) {
    const hub = candidates.find((c) => c.key === "hub");
    warnings.push(`The sensors in this plan need a Zigbee/Thread hub, which didn't fit the budget${hub ? ` (about ${formatINR(hub.unitPrice)})` : ""}. Add one, or remove the sensors.`);
  }
  if (needsHub && owned.has("hub")) {
    warnings.push("This plan assumes your existing hub supports Zigbee — the sensors use it. Check your hub's specifications.");
  }
  if (!items.length && candidates.length) {
    const cheapest = Math.min(...candidates.map((c) => c.unitPrice));
    warnings.push(`Nothing in these priorities fits ${formatINR(input.budget)}. The cheapest item needs ${formatINR(cheapest)} — raise the budget or choose fewer priorities.`);
  }

  return {
    input,
    items,
    total,
    budget: input.budget,
    remaining: input.budget - total,
    categoryTotals,
    categoryCosts,
    automations: [...automations],
    needsHub,
    warnings,
    skipped,
    usesSampleData: items.some((i) => i.isSample),
  };
}
