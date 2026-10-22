"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { addRoom, deleteRoom, renameRoom, saveHome } from "@/lib/actions/home";
import type { FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SelectField, SubmitButton } from "@/components/forms/FormParts";
import { ConfirmButton } from "@/components/ui/ConfirmButton";
import { HOME_TYPES } from "@/lib/devices";

type Home = { id: string; name: string; home_type: string; city: string | null } | null;

export function HomeForm({ home }: { home: Home }) {
  const [state, action] = useActionState(saveHome, {} as FormState);
  const v = state.values ?? { name: home?.name ?? "", homeType: home?.home_type ?? "", city: home?.city ?? "" };

  return (
    <form action={action} noValidate>
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      {home && <input type="hidden" name="homeId" value={home.id} />}
      <Field name="name" label="Home name" placeholder="e.g. Koramangala flat" required maxLength={80} defaultValue={v.name} error={state.errors?.name} />
      <div className="form-row">
        <SelectField name="homeType" label="Home type" options={HOME_TYPES} placeholder="Choose…" required defaultValue={v.homeType} error={state.errors?.homeType} />
        <Field name="city" label="City (optional)" maxLength={80} defaultValue={v.city} error={state.errors?.city} />
      </div>
      <SubmitButton pendingText="Saving…" block={false}>{home ? "Save home details" : "Create my home"}</SubmitButton>
    </form>
  );
}

export function AddRoomForm({ homeId }: { homeId: string }) {
  const [state, action] = useActionState(addRoom, {} as FormState);
  // Remount the form after each successful add so the field clears.
  const [formKey, setFormKey] = useState(0);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "success") setFormKey((k) => k + 1);
  }

  return (
    <form key={formKey} action={action} noValidate className="inline-form">
      <input type="hidden" name="homeId" value={homeId} />
      <Field name="name" label="Add a room" placeholder="e.g. Kitchen" required maxLength={60} defaultValue={state.status === "error" ? state.values?.name : ""} error={state.errors?.name} />
      <SubmitButton pendingText="Adding…" block={false}>Add room</SubmitButton>
      {state.status === "success" && <p className="inline-form-note" role="status">{state.message}</p>}
      {state.message && state.status === "error" && <FormAlert tone="error">{state.message}</FormAlert>}
    </form>
  );
}

export function RoomRow({ room }: { room: { id: string; name: string; deviceCount: number } }) {
  const [editing, setEditing] = useState(false);
  const [state, action] = useActionState(renameRoom, {} as FormState);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "success") setEditing(false);
  }

  if (editing) {
    return (
      <li className="room-row">
        <form action={action} noValidate className="inline-form inline-form--row">
          <input type="hidden" name="roomId" value={room.id} />
          <Field name="name" id={`room-${room.id}`} label={`Rename ${room.name}`} required maxLength={60} defaultValue={state.values?.name ?? room.name} error={state.errors?.name ?? state.message} autoFocus />
          <SubmitButton pendingText="Saving…" block={false}>Save</SubmitButton>
          <button type="button" className="btn btn--ghost" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      </li>
    );
  }

  return (
    <li className="room-row">
      <div>
        <span className="room-name">{room.name}</span>
        <span className="room-meta">{room.deviceCount} {room.deviceCount === 1 ? "device" : "devices"}</span>
      </div>
      <div className="row-actions">
        <Link className="text-link" href={`/app/devices?room=${room.id}`}>View devices</Link>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>Rename</button>
        <ConfirmButton
          label="Delete"
          title={`Delete ${room.name}?`}
          description={
            room.deviceCount
              ? `Its ${room.deviceCount} ${room.deviceCount === 1 ? "device stays" : "devices stay"} in My Home without a room. This can't be undone.`
              : "This can't be undone."
          }
          confirmLabel="Delete room"
          action={deleteRoom}
          fields={{ roomId: room.id }}
        />
      </div>
    </li>
  );
}
