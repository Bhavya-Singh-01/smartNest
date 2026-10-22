import type { CatalogProduct } from "../../lib/planner.ts";

// Mirrors the sample rows seeded by the migrations (ids = slugs for readability).
const p = (id: string, slot: string, category: string, name: string, price: number, needsHub = false): CatalogProduct => ({
  id, planner_slot: slot, category, name, est_price_inr: price, needs_hub: needsHub,
  brand: null, model: null, source_url: null, is_sample: true,
});

export const SAMPLE_CATALOG: CatalogProduct[] = [
  p("sample-smart-hub", "hub", "hub", "Smart hub (Zigbee / Thread / Matter)", 3500),
  p("sample-smart-bulb", "bulb", "lighting", "Smart bulb (Wi-Fi, tunable white)", 700),
  p("sample-smart-switch", "switch", "lighting", "Smart switch (2-gang)", 1800),
  p("sample-smart-speaker", "speaker", "speaker", "Smart speaker (voice assistant)", 3500),
  p("sample-speaker-second-room", "speaker2", "speaker", "Second smart speaker (multi-room)", 3000),
  p("sample-smart-lock", "lock", "lock", "Smart door lock", 12000),
  p("sample-outdoor-camera", "camera_out", "camera", "Outdoor security camera", 3200),
  p("sample-indoor-camera", "camera_in", "camera", "Indoor security camera", 2200),
  p("sample-door-window-sensor", "sensor", "door_sensor", "Door / window sensor", 1000, true),
  p("sample-motion-sensor", "motion_sec", "motion_sensor", "Motion sensor (PIR)", 1300, true),
  p("sample-energy-plug", "eplug", "plug", "Energy-monitoring smart plug", 1400),
  p("sample-motion-sensor-lighting", "motion_energy", "motion_sensor", "Motion sensor (auto-off lighting)", 1300, true),
  p("sample-ac-controller", "acctrl", "climate", "Smart AC controller (IR)", 2500),
  p("sample-smart-thermostat", "thermostat", "climate", "Smart thermostat (wired)", 14000),
];
