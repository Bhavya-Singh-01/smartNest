"use client";

import { useActionState, useRef } from "react";
import Link from "next/link";
import { saveDevice } from "@/lib/actions/devices";
import type { FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SelectField, SubmitButton, TextAreaField } from "@/components/forms/FormParts";
import { DEVICE_CATEGORIES } from "@/lib/devices";
import { formatINR } from "@/lib/planner";

type CatalogItem = { id: string; name: string; category: string; est_price_inr: number | null; is_sample: boolean };
type Device = {
  id: string;
  name: string;
  category: string;
  catalog_id: string | null;
  room_id: string | null;
  brand: string | null;
  model: string | null;
  purchase_date: string | null;
  warranty_expiry: string | null;
  notes: string | null;
  manual_url: string | null;
};

export function DeviceForm({ device, rooms, catalog, today }: { device?: Device; rooms: { id: string; name: string }[]; catalog: CatalogItem[]; today: string }) {
  const [state, action] = useActionState(saveDevice, {} as FormState);
  const initial = state.values ?? {
    name: device?.name ?? "",
    category: device?.category ?? "",
    catalogId: device?.catalog_id ?? "",
    roomId: device?.room_id ?? "",
    brand: device?.brand ?? "",
    model: device?.model ?? "",
    purchaseDate: device?.purchase_date ?? "",
    warrantyExpiry: device?.warranty_expiry ?? "",
    notes: device?.notes ?? "",
    manualUrl: device?.manual_url ?? "",
  };
  // Fields stay uncontrolled: React resets action forms after submit, and
  // uncontrolled fields reset to the echoed values. Picking a catalogue type
  // writes the name (if empty) and category straight into the fields.
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  function pickCatalog(id: string) {
    const item = catalog.find((c) => c.id === id);
    if (!item || !nameRef.current || !categoryRef.current) return;
    if (!nameRef.current.value.trim()) nameRef.current.value = item.name;
    categoryRef.current.value = item.category;
  }

  return (
    <form action={action} noValidate className="device-form">
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      {device && <input type="hidden" name="deviceId" value={device.id} />}

      <fieldset>
        <legend>What is it?</legend>
        <SelectField
          name="catalogId"
          label="Device type (optional)"
          placeholder="Not in the list / custom"
          options={catalog.map((c) => ({ value: c.id, label: c.name + (c.est_price_inr ? ` — est. ${formatINR(c.est_price_inr)}` : "") }))}
          defaultValue={initial.catalogId}
          onChange={(e) => pickCatalog(e.target.value)}
          error={state.errors?.catalogId}
          hint="Sample catalogue entries with estimated prices — not verified product listings."
        />
        <div className="form-row">
          <Field name="name" label="Name" placeholder="e.g. Bedroom ceiling light" required maxLength={80} ref={nameRef} defaultValue={initial.name} error={state.errors?.name} />
          <SelectField name="category" label="Category" options={DEVICE_CATEGORIES} placeholder="Choose…" required ref={categoryRef} defaultValue={initial.category} error={state.errors?.category} />
        </div>
        <div className="form-row">
          <Field name="brand" label="Brand (optional)" maxLength={60} defaultValue={initial.brand} error={state.errors?.brand} />
          <Field name="model" label="Model (optional)" maxLength={60} defaultValue={initial.model} error={state.errors?.model} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Where is it?</legend>
        {rooms.length ? (
          <SelectField name="roomId" label="Room" placeholder="No room" options={rooms.map((r) => ({ value: r.id, label: r.name }))} defaultValue={initial.roomId} error={state.errors?.roomId} />
        ) : (
          <p className="hint">
            You haven&apos;t added any rooms yet. <Link href="/app/home">Set up rooms</Link> to place devices in them.
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend>Purchase &amp; warranty</legend>
        <div className="form-row">
          <Field name="purchaseDate" type="date" label="Purchase date" max={today} defaultValue={initial.purchaseDate} error={state.errors?.purchaseDate} />
          <Field name="warrantyExpiry" type="date" label="Warranty ends" defaultValue={initial.warrantyExpiry} error={state.errors?.warrantyExpiry} hint="Used for warranty reminders on your dashboard." />
        </div>
        <Field name="manualUrl" type="url" label="Manual link (optional)" placeholder="https://… (manufacturer's PDF or support page)" defaultValue={initial.manualUrl} error={state.errors?.manualUrl} />
        <TextAreaField name="notes" label="Notes (optional)" maxLength={1000} rows={4} defaultValue={initial.notes} error={state.errors?.notes} placeholder="Where it's mounted, admin PIN location, quirks…" />
      </fieldset>

      <div className="form-actions">
        <SubmitButton pendingText="Saving…" block={false}>{device ? "Save changes" : "Add device"}</SubmitButton>
        <Link href={device ? `/app/devices/${device.id}` : "/app/devices"} className="btn btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}
