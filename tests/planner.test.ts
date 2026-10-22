import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPlan, formatINR, type CatalogProduct, type PlanInput } from "../lib/planner.ts";
import { SAMPLE_CATALOG } from "./fixtures/sample-catalog.ts";

const base: PlanInput = { homeType: "apartment", rooms: 3, priorities: ["lighting", "security"], budget: 25000, existing: [] };
const plan = (over: Partial<PlanInput> = {}, catalog: CatalogProduct[] = SAMPLE_CATALOG) => buildPlan({ ...base, ...over }, catalog);
const keys = (r: ReturnType<typeof buildPlan>) => r.items.map((i) => i.key);

test("only the hub plus chosen priorities are recommended", () => {
  assert.deepEqual(keys(plan({ priorities: ["lighting"], budget: 100000 })).sort(), ["bulb", "hub", "switch"]);
});

test("never exceeds the budget, and the total adds up", () => {
  for (const budget of [5000, 12000, 25000, 60000, 100000]) {
    const r = plan({ homeType: "house", rooms: 8, priorities: ["lighting", "security", "energy", "climate", "voice"], budget });
    assert.ok(r.total <= budget);
    assert.equal(r.total, r.items.reduce((s, i) => s + i.lineTotal, 0));
    assert.equal(r.remaining, budget - r.total);
  }
});

test("essentials come before optional upgrades", () => {
  const r = plan();
  const firstOptional = r.items.findIndex((i) => !i.essential);
  const lastEssential = r.items.map((i) => i.essential).lastIndexOf(true);
  assert.ok(firstOptional === -1 || firstOptional > lastEssential);
});

test("an essential that doesn't fully fit is reduced, with a note", () => {
  const r = plan({ priorities: ["lighting"], budget: 2000 });
  assert.deepEqual(keys(r), ["bulb"]);
  assert.equal(r.items[0].qty, 2);
  assert.match(r.items[0].note ?? "", /Reduced from 3/);
});

test("items that don't fit are listed with how much more they need", () => {
  const r = plan({ budget: 20000 });
  assert.ok(r.skipped.length > 0);
  for (const s of r.skipped) assert.ok(s.shortBy > 0 && s.lineTotal > 0);
});

test("every item explains why it's recommended and links to a guide", () => {
  const r = plan({ homeType: "house", rooms: 5, priorities: ["lighting", "security", "energy", "climate", "voice"], budget: 100000 });
  for (const item of r.items) {
    assert.ok(item.reason.length > 20, item.key);
    assert.match(item.guide, /^\/(devices|basics)#/);
  }
  assert.match(r.items.find((i) => i.key === "bulb")!.reason, /5 rooms → 5/);
});

test("devices you already own are skipped", () => {
  const r = plan({ existing: ["hub", "lighting"], budget: 100000 });
  assert.ok(!keys(r).includes("hub") && !keys(r).includes("bulb") && !keys(r).includes("switch"));
  assert.ok(keys(r).includes("lock"));
  assert.ok(r.warnings.some((w) => /existing hub supports Zigbee/.test(w)), "sensors + existing hub → check hub");
});

test("sensors without a hub in the plan get a warning", () => {
  // Essentials by price: 2 sensors (₹2,000) + outdoor camera (₹3,200) use the
  // whole ₹5,200, so the ₹3,500 hub can't fit.
  const r = plan({ priorities: ["security"], budget: 5200 });
  assert.deepEqual(keys(r), ["sensor", "camera_out"]);
  assert.ok(r.needsHub);
  assert.ok(r.warnings.some((w) => /need a Zigbee\/Thread hub/.test(w)), r.warnings.join("\n"));
});

test("verified catalogue products are preferred over samples", () => {
  const verified: CatalogProduct = { ...SAMPLE_CATALOG.find((p) => p.id === "sample-smart-bulb")!, id: "real-bulb", name: "Brand X bulb", est_price_inr: 1200, is_sample: false, source_url: "https://example.com/x" };
  const r = plan({ priorities: ["lighting"], budget: 100000 }, [...SAMPLE_CATALOG, verified]);
  const bulb = r.items.find((i) => i.key === "bulb")!;
  assert.equal(bulb.catalogId, "real-bulb");
  assert.equal(bulb.sourceUrl, "https://example.com/x");
});

test("a slot with no catalogue product is left out with a warning", () => {
  const r = plan({ priorities: ["security"], budget: 100000 }, SAMPLE_CATALOG.filter((p) => p.planner_slot !== "lock"));
  assert.ok(!keys(r).includes("lock"));
  assert.ok(r.warnings.some((w) => /available for a smart lock/.test(w)));
});

test("nothing affordable explains the minimum", () => {
  const r = plan({ priorities: ["security"], budget: 600 });
  assert.equal(r.items.length, 0);
  assert.ok(r.warnings.some((w) => /cheapest item needs/.test(w)));
});

test("category costs add up to the total", () => {
  const r = plan({ budget: 60000, priorities: ["lighting", "security", "energy"] });
  assert.equal(Object.values(r.categoryCosts).reduce((a, b) => a + b, 0), r.total);
});

test("formats rupees with Indian digit grouping", () => {
  assert.equal(formatINR(100000), "₹1,00,000");
  assert.equal(formatINR(25000), "₹25,000");
});
