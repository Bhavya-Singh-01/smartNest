"use client";

import { useActionState, useState } from "react";
import { staffUpdateTicket } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import { FormAlert, SelectField, SubmitButton, TextAreaField } from "@/components/forms/FormParts";
import { staffNextStatuses, statusLabel } from "@/lib/tickets";

type Mode = "status" | "reply" | "note";

const MODES: { value: Mode; label: string }[] = [
  { value: "status", label: "Change status" },
  { value: "reply", label: "Reply to customer" },
  { value: "note", label: "Internal note" },
];

export function StaffTicketActions({ ticketId, status }: { ticketId: string; status: string }) {
  const next = staffNextStatuses(status);
  const [mode, setMode] = useState<Mode>(next.length ? "status" : "note");
  const [state, action] = useActionState(staffUpdateTicket, {} as FormState);
  // Reset the form after each successful update (fresh status options + empty message).
  const [formKey, setFormKey] = useState(0);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "success") setFormKey((k) => k + 1);
  }

  const available = MODES.filter((m) => (m.value === "status" ? next.length > 0 : m.value === "reply" ? status !== "closed" : true));

  return (
    <section className="card staff-actions">
      <h3>Update ticket</h3>
      <div className="tab-bar" role="tablist">
        {available.map((m) => (
          <button key={m.value} type="button" role="tab" aria-selected={mode === m.value} className={"tab-btn" + (mode === m.value ? " active" : "")} onClick={() => setMode(m.value)}>
            {m.label}
          </button>
        ))}
      </div>
      {state.status === "success" && <FormAlert tone="success">{state.message}</FormAlert>}
      {state.status === "error" && state.message && <FormAlert tone="error">{state.message}</FormAlert>}

      <form key={`${formKey}-${mode}`} action={action} noValidate>
        <input type="hidden" name="ticketId" value={ticketId} />
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="currentStatus" value={status} />
        {mode === "status" && (
          <SelectField name="status" label={`Move from “${statusLabel(status)}” to`} placeholder="Choose…" options={next.map((s) => ({ value: s, label: statusLabel(s) }))} error={state.errors?.status} />
        )}
        <TextAreaField
          name="message"
          label={mode === "status" ? "Message to customer (optional)" : mode === "reply" ? "Reply" : "Note for the support team"}
          rows={mode === "note" ? 3 : 4}
          maxLength={4000}
          defaultValue={state.status === "error" ? state.values?.message : ""}
          error={state.errors?.message}
          hint={mode === "note" ? "Only staff can see internal notes." : "The customer sees this on their ticket."}
        />
        <SubmitButton pendingText="Saving…" block={false}>
          {mode === "status" ? "Update status" : mode === "reply" ? "Send reply" : "Add note"}
        </SubmitButton>
      </form>
    </section>
  );
}
