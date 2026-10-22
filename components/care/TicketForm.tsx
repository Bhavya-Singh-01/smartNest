"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { createTicket } from "@/lib/actions/tickets";
import type { FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SelectField, SubmitButton, TextAreaField } from "@/components/forms/FormParts";
import { PHOTO_MAX_BYTES, TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/tickets";

type Device = { id: string; name: string; room_id: string | null };

export function TicketForm({ devices, rooms, preselectDevice }: { devices: Device[]; rooms: { id: string; name: string }[]; preselectDevice?: string }) {
  const [state, action] = useActionState(createTicket, {} as FormState);
  const initialDevice = state.values?.deviceId ?? preselectDevice ?? "";
  const initialRoom = state.values?.roomId ?? devices.find((d) => d.id === initialDevice)?.room_id ?? "";
  const roomRef = useRef<HTMLSelectElement>(null);
  const [photoNote, setPhotoNote] = useState<string | null>(null);

  // Choosing a device fills in its room.
  function pickDevice(id: string) {
    const device = devices.find((d) => d.id === id);
    if (device?.room_id && roomRef.current) roomRef.current.value = device.room_id;
  }

  function checkPhoto(file: File | undefined) {
    if (!file) return setPhotoNote(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setPhotoNote("Photos must be JPG, PNG or WebP.");
    if (file.size > PHOTO_MAX_BYTES) return setPhotoNote("This photo is over 5 MB — choose a smaller one.");
    setPhotoNote(`${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`);
  }

  return (
    <form action={action} noValidate className="device-form">
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}

      <fieldset>
        <legend>What&apos;s affected?</legend>
        <div className="form-row">
          <SelectField
            name="deviceId"
            label="Device (optional)"
            placeholder={devices.length ? "Not about one device" : "No devices registered"}
            options={devices.map((d) => ({ value: d.id, label: d.name }))}
            defaultValue={initialDevice}
            onChange={(e) => pickDevice(e.target.value)}
            error={state.errors?.deviceId}
          />
          <SelectField ref={roomRef} name="roomId" label="Room (optional)" placeholder="Whole home / not sure" options={rooms.map((r) => ({ value: r.id, label: r.name }))} defaultValue={initialRoom} error={state.errors?.roomId} />
        </div>
        {!devices.length && (
          <p className="hint">Tip: <Link href="/app/devices/new">register the device</Link> first so support can see its details.</p>
        )}
      </fieldset>

      <fieldset>
        <legend>The problem</legend>
        <div className="form-row">
          <SelectField name="category" label="Type of problem" placeholder="Choose…" options={TICKET_CATEGORIES} required defaultValue={state.values?.category ?? ""} error={state.errors?.category} />
          <SelectField name="priority" label="Priority" options={TICKET_PRIORITIES} defaultValue={state.values?.priority ?? "normal"} error={state.errors?.priority} />
        </div>
        <Field name="title" label="Short title" placeholder="e.g. Front door lock not responding to the app" required maxLength={120} defaultValue={state.values?.title} error={state.errors?.title} />
        <TextAreaField
          name="description"
          label="What's happening?"
          rows={6}
          required
          maxLength={4000}
          defaultValue={state.values?.description}
          error={state.errors?.description}
          placeholder="When did it start, what have you tried, and what do you see (lights, error messages)?"
        />
      </fieldset>

      <fieldset>
        <legend>Photo (optional)</legend>
        <div className={"form-group" + (state.errors?.photo ? " has-error" : "")}>
          <label htmlFor="photo">Add a photo of the device or error</label>
          <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="file-input" onChange={(e) => checkPhoto(e.target.files?.[0])} aria-describedby="photo-hint" />
          {state.errors?.photo ? (
            <p className="field-error">{state.errors.photo}</p>
          ) : (
            <p className="hint" id="photo-hint">{photoNote ?? "JPG, PNG or WebP, up to 5 MB. Only you and SmartNest support can see it."}</p>
          )}
        </div>
      </fieldset>

      <div className="form-actions">
        <SubmitButton pendingText="Submitting…" block={false}>Submit ticket</SubmitButton>
        <Link href="/app/tickets" className="btn btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}
