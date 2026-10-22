"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveCatalogItem } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SelectField, SubmitButton } from "@/components/forms/FormParts";
import { DEVICE_CATEGORIES } from "@/lib/devices";
import { SLOTS } from "@/lib/planner";

const SLOT_OPTIONS = SLOTS.map((s) => ({ value: s.slot, label: s.title.charAt(0).toUpperCase() + s.title.slice(1) }));

type Item = {
  id: string;
  slug: string;
  category: string;
  name: string;
  brand: string | null;
  model: string | null;
  connectivity: string | null;
  est_price_inr: number | null;
  source_url: string | null;
  is_sample: boolean;
  planner_slot: string | null;
  needs_hub: boolean;
};

export function CatalogForm({ item }: { item?: Item }) {
  const [state, action] = useActionState(saveCatalogItem, {} as FormState);
  const v = state.values ?? {
    name: item?.name ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? "",
    brand: item?.brand ?? "",
    model: item?.model ?? "",
    connectivity: item?.connectivity ?? "",
    price: item?.est_price_inr?.toString() ?? "",
    sourceUrl: item?.source_url ?? "",
    isSample: item ? (item.is_sample ? "on" : "") : "on",
    plannerSlot: item?.planner_slot ?? "",
    needsHub: item?.needs_hub ? "on" : "",
  };

  return (
    <form action={action} noValidate className="device-form">
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      {item && <input type="hidden" name="itemId" value={item.id} />}
      <fieldset>
        <legend>Product</legend>
        <div className="form-row">
          <Field name="name" label="Product name" required maxLength={120} defaultValue={v.name} error={state.errors?.name} />
          <SelectField name="category" label="Category" placeholder="Choose…" options={DEVICE_CATEGORIES} defaultValue={v.category} error={state.errors?.category} />
        </div>
        <div className="form-row">
          <Field name="brand" label="Brand" maxLength={60} defaultValue={v.brand} error={state.errors?.brand} />
          <Field name="model" label="Model" maxLength={60} defaultValue={v.model} error={state.errors?.model} />
        </div>
        <div className="form-row">
          <Field name="connectivity" label="Connectivity" placeholder="e.g. Wi-Fi, Zigbee, Matter" maxLength={60} defaultValue={v.connectivity} error={state.errors?.connectivity} />
          <Field name="slug" label="Slug" placeholder="e.g. philips-hue-white-a19" required maxLength={60} defaultValue={v.slug} error={state.errors?.slug} hint="Lowercase identifier, unique in the catalogue." />
        </div>
      </fieldset>
      <fieldset>
        <legend>Planner</legend>
        <SelectField name="plannerSlot" label="Can fill this planner recommendation" placeholder="Not used by the planner" options={SLOT_OPTIONS} defaultValue={v.plannerSlot} error={state.errors?.plannerSlot} hint="The planner picks the cheapest active product per recommendation, preferring verified entries over samples." />
        <label className="check-row">
          <input type="checkbox" name="needsHub" defaultChecked={v.needsHub === "on"} />
          <span>Needs a Zigbee/Thread hub to work</span>
        </label>
      </fieldset>
      <fieldset>
        <legend>Price &amp; source</legend>
        <div className="form-row">
          <Field name="price" type="number" min={0} step={1} label="Estimated price (₹)" defaultValue={v.price} error={state.errors?.price} />
          <Field name="sourceUrl" type="url" label="Source link" placeholder="https://…" defaultValue={v.sourceUrl} error={state.errors?.sourceUrl} />
        </div>
        <label className="check-row">
          <input type="checkbox" name="isSample" defaultChecked={v.isSample === "on"} />
          <span>Sample / unverified entry — shown to customers with a “sample” label</span>
        </label>
      </fieldset>
      <div className="form-actions">
        <SubmitButton pendingText="Saving…" block={false}>{item ? "Save entry" : "Add to catalogue"}</SubmitButton>
        <Link href="/admin/catalog" className="btn btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}
