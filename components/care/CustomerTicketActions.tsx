"use client";

import { useActionState, useState } from "react";
import { confirmResolution, reopenTicket, replyToTicket } from "@/lib/actions/tickets";
import type { FormState } from "@/lib/actions/auth";
import { FormAlert, SubmitButton, TextAreaField } from "@/components/forms/FormParts";

export function CustomerTicketActions({ ticketId, status }: { ticketId: string; status: string }) {
  if (status === "closed") {
    return <p className="muted-line">This ticket is closed. If the problem comes back, open a new ticket and mention {"this one's"} reference.</p>;
  }
  return (
    <div className="ticket-actions">
      {status === "resolved" && <ResolutionPanel ticketId={ticketId} />}
      <ReplyForm ticketId={ticketId} />
    </div>
  );
}

function ReplyForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState(replyToTicket, {} as FormState);
  // Clear the textarea after each successful send.
  const [formKey, setFormKey] = useState(0);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "success") setFormKey((k) => k + 1);
  }
  return (
    <form key={formKey} action={action} noValidate className="reply-form">
      <input type="hidden" name="ticketId" value={ticketId} />
      {state.message && state.status === "error" && <FormAlert tone="error">{state.message}</FormAlert>}
      <TextAreaField name="message" label="Add a reply" rows={3} maxLength={4000} placeholder="Answer a question from support or add new details…" defaultValue={state.status === "error" ? state.values?.message : ""} error={state.errors?.message} />
      <SubmitButton pendingText="Sending…" block={false}>Send reply</SubmitButton>
      {state.status === "success" && <span className="inline-form-note" role="status">{state.message}</span>}
    </form>
  );
}

function ResolutionPanel({ ticketId }: { ticketId: string }) {
  const [mode, setMode] = useState<"confirm" | "reopen">("confirm");
  const [confirmState, confirmAction] = useActionState(confirmResolution, {} as FormState);
  const [reopenState, reopenAction] = useActionState(reopenTicket, {} as FormState);

  return (
    <section className="resolution-panel">
      <h3>Support marked this as resolved</h3>
      <p>Is everything working again?</p>
      <div className="tab-bar resolution-switch" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "confirm"} className={"tab-btn" + (mode === "confirm" ? " active" : "")} onClick={() => setMode("confirm")}>Yes, it&apos;s fixed</button>
        <button type="button" role="tab" aria-selected={mode === "reopen"} className={"tab-btn" + (mode === "reopen" ? " active" : "")} onClick={() => setMode("reopen")}>No, still a problem</button>
      </div>

      {mode === "confirm" ? (
        <form action={confirmAction} noValidate>
          <input type="hidden" name="ticketId" value={ticketId} />
          {confirmState.message && <FormAlert tone="error">{confirmState.message}</FormAlert>}
          <fieldset className={"rating" + (confirmState.errors?.rating ? " has-error" : "")}>
            <legend>How was the support?</legend>
            <div className="rating-options">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="rating-option">
                  <input type="radio" name="rating" value={n} required />
                  <span>{n}</span>
                </label>
              ))}
            </div>
            <p className="hint">1 = poor, 5 = excellent</p>
            {confirmState.errors?.rating && <p className="field-error">{confirmState.errors.rating}</p>}
          </fieldset>
          <TextAreaField name="message" label="Anything to add? (optional)" rows={2} maxLength={1000} defaultValue={confirmState.values?.message} error={confirmState.errors?.message} />
          <SubmitButton pendingText="Closing…" block={false}>Confirm &amp; close ticket</SubmitButton>
        </form>
      ) : (
        <form action={reopenAction} noValidate>
          <input type="hidden" name="ticketId" value={ticketId} />
          {reopenState.message && <FormAlert tone="error">{reopenState.message}</FormAlert>}
          <TextAreaField name="message" label="What's still wrong?" rows={3} maxLength={4000} defaultValue={reopenState.values?.message} error={reopenState.errors?.message} />
          <SubmitButton pendingText="Reopening…" block={false}>Reopen ticket</SubmitButton>
        </form>
      )}
    </section>
  );
}
