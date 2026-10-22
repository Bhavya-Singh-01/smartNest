import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDevice, parseHome, parseRoomName, validatePlanInput } from "../lib/validation.ts";
import { warrantyStatus } from "../lib/devices.ts";

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};
const TODAY = "2026-10-22";

test("home requires a name and a known home type", () => {
  assert.deepEqual(Object.keys(parseHome(form({ name: "", homeType: "castle" })).errors).sort(), ["homeType", "name"]);
  assert.deepEqual(parseHome(form({ name: " Flat 4B ", homeType: "apartment", city: "" })).errors, {});
  assert.equal(parseHome(form({ name: "Flat", homeType: "apartment" })).values.name, "Flat");
});

test("room names are required and length-limited", () => {
  assert.ok(parseRoomName(form({ name: "  " })).errors.name);
  assert.ok(parseRoomName(form({ name: "x".repeat(61) })).errors.name);
  assert.deepEqual(parseRoomName(form({ name: "Kitchen" })).errors, {});
});

test("device needs a name and a valid category", () => {
  const { errors } = parseDevice(form({ name: "", category: "toaster" }), TODAY);
  assert.ok(errors.name && errors.category);
  assert.deepEqual(parseDevice(form({ name: "Lamp", category: "lighting" }), TODAY).errors, {});
});

test("device dates: real dates, no future purchase, warranty after purchase", () => {
  assert.ok(parseDevice(form({ name: "L", category: "plug", purchaseDate: "2026-02-30" }), TODAY).errors.purchaseDate);
  assert.match(parseDevice(form({ name: "L", category: "plug", purchaseDate: "2026-10-23" }), TODAY).errors.purchaseDate ?? "", /future/);
  assert.match(parseDevice(form({ name: "L", category: "plug", purchaseDate: "2026-05-01", warrantyExpiry: "2026-04-30" }), TODAY).errors.warrantyExpiry ?? "", /before/);
  assert.deepEqual(parseDevice(form({ name: "L", category: "plug", purchaseDate: "2026-05-01", warrantyExpiry: "2027-05-01" }), TODAY).errors, {});
});

test("device ids must be UUIDs when given", () => {
  const { errors } = parseDevice(form({ name: "L", category: "plug", roomId: "1 OR 1=1", catalogId: "abc" }), TODAY);
  assert.ok(errors.roomId && errors.catalogId);
});

test("plan input is validated before saving", () => {
  const ok = { planId: null, name: "Starter", homeType: "apartment", rooms: 3, priorities: ["lighting"], budget: 25000, existing: [] as string[] };
  assert.deepEqual(validatePlanInput(ok), {});
  assert.ok(validatePlanInput({ ...ok, rooms: 11 }).rooms);
  assert.ok(validatePlanInput({ ...ok, budget: 4000 }).budget);
  assert.ok(validatePlanInput({ ...ok, priorities: [] }).priorities);
  assert.ok(validatePlanInput({ ...ok, priorities: ["lighting", "admin"] }).priorities);
  assert.ok(validatePlanInput({ ...ok, name: " " }).name);
  assert.ok(validatePlanInput({ ...ok, planId: "not-a-uuid" }).planId);
  assert.ok(validatePlanInput({ ...ok, existing: ["hub", "jetpack"] }).existing);
});

test("warranty status: none, expired, ending within 60 days, ok", () => {
  assert.equal(warrantyStatus(null, TODAY), "none");
  assert.equal(warrantyStatus("2026-10-21", TODAY), "expired");
  assert.equal(warrantyStatus("2026-10-22", TODAY), "soon");
  assert.equal(warrantyStatus("2026-12-21", TODAY), "soon");
  assert.equal(warrantyStatus("2026-12-22", TODAY), "ok");
});
