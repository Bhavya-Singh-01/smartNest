"use client";

import { useId, useRef } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  title: string;
  description: string;
  confirmLabel: string;
  action: (form: FormData) => Promise<void>;
  fields: Record<string, string>;
  className?: string;
  confirmClassName?: string;
};

// A destructive action behind a native <dialog> confirmation (focus-trapped,
// Esc to cancel). The server action runs only after the user confirms.
// Destructive by default; pass confirmClassName for a non-destructive confirm.
export function ConfirmButton({ label, title, description, confirmLabel, action, fields, className = "btn btn--ghost btn--sm btn--danger", confirmClassName = "btn btn--danger-solid" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button type="button" className={className} onClick={() => dialogRef.current?.showModal()}>
        {label}
      </button>
      <dialog ref={dialogRef} className="confirm-dialog" aria-labelledby={titleId}>
        <form action={action}>
          {Object.entries(fields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <h3 id={titleId}>{title}</h3>
          <p>{description}</p>
          <div className="confirm-dialog-actions">
            <button type="button" className="btn btn--ghost" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <ConfirmSubmit className={confirmClassName}>{confirmLabel}</ConfirmSubmit>
          </div>
        </form>
      </dialog>
    </>
  );
}

function ConfirmSubmit({ children, className }: { children: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? "Working…" : children}
    </button>
  );
}
