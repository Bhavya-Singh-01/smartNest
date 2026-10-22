"use client";

import { useActionState, useState } from "react";
import { addReminder, completeReminder, deleteReminder } from "@/lib/actions/reminders";
import type { FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SelectField, SubmitButton } from "@/components/forms/FormParts";
import { formatDate } from "@/lib/devices";

type Reminder = { id: string; title: string; due_date: string; repeat_months: number | null; completed_at: string | null };

const REPEAT_OPTIONS = [
  { value: "1", label: "Every month" },
  { value: "3", label: "Every 3 months" },
  { value: "6", label: "Every 6 months" },
  { value: "12", label: "Every year" },
];

function dueStatus(due: string, today: string) {
  if (due < today) return "overdue";
  const soon = new Date(today + "T00:00:00Z");
  soon.setUTCDate(soon.getUTCDate() + 30);
  return due <= soon.toISOString().slice(0, 10) ? "soon" : "ok";
}

export function Reminders({ deviceId, reminders, today }: { deviceId: string; reminders: Reminder[]; today: string }) {
  const open = reminders.filter((r) => !r.completed_at);
  const done = reminders.filter((r) => r.completed_at).slice(0, 3);

  return (
    <>
      {open.length ? (
        <ul className="row-list reminder-list">
          {open.map((r) => {
            const status = dueStatus(r.due_date, today);
            return (
              <li key={r.id}>
                <span>
                  {r.title}
                  <span className="row-sub">{r.repeat_months ? `Repeats every ${r.repeat_months === 12 ? "year" : `${r.repeat_months} month${r.repeat_months > 1 ? "s" : ""}`}` : "One-off"}</span>
                </span>
                <span className="reminder-actions">
                  <span className={`status-chip status-chip--${status === "overdue" ? "expired" : status}`}>
                    {status === "overdue" ? "Overdue" : "Due"} {formatDate(r.due_date)}
                  </span>
                  <form action={completeReminder}>
                    <input type="hidden" name="reminderId" value={r.id} />
                    <button type="submit" className="btn btn--ghost btn--sm">Mark done</button>
                  </form>
                  <form action={deleteReminder}>
                    <input type="hidden" name="reminderId" value={r.id} />
                    <button type="submit" className="btn btn--ghost btn--sm btn--danger" aria-label={`Delete reminder ${r.title}`}>Delete</button>
                  </form>
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="muted-line">No upcoming maintenance. Add one below — for example battery changes, filter cleaning or firmware checks.</p>
      )}
      {done.length > 0 && (
        <p className="hint">Recently done: {done.map((r) => `${r.title} (${formatDate(r.completed_at)})`).join(", ")}</p>
      )}
      <AddReminderForm deviceId={deviceId} today={today} />
    </>
  );
}

function AddReminderForm({ deviceId, today }: { deviceId: string; today: string }) {
  const [state, action] = useActionState(addReminder, {} as FormState);
  // Clear the form after each successful add.
  const [formKey, setFormKey] = useState(0);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "success") setFormKey((k) => k + 1);
  }
  const v = state.status === "error" ? state.values : undefined;

  return (
    <form key={formKey} action={action} noValidate className="reminder-form">
      <input type="hidden" name="deviceId" value={deviceId} />
      {state.status === "error" && state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      <Field name="title" label="Add a reminder" placeholder="e.g. Replace batteries" maxLength={80} defaultValue={v?.title} error={state.errors?.title} />
      <div className="form-row">
        <Field name="dueDate" type="date" label="Due" min={today} defaultValue={v?.dueDate} error={state.errors?.dueDate} />
        <SelectField name="repeat" label="Repeat" placeholder="Doesn't repeat" options={REPEAT_OPTIONS} defaultValue={v?.repeat ?? ""} error={state.errors?.repeat} />
      </div>
      <SubmitButton pendingText="Adding…" block={false}>Add reminder</SubmitButton>
      {state.status === "success" && <span className="inline-form-note" role="status">{state.message}</span>}
    </form>
  );
}
