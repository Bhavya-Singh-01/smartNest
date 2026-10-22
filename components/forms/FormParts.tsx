"use client";

import { useFormStatus } from "react-dom";
import type { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
};

export function Field({ name, label, error, hint, id = name, type = "text", ...input }: FieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={"form-group" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...input} />
      {error ? (
        <p className="field-error" id={`${id}-error`}>{error}</p>
      ) : hint ? (
        <p className="hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}

function FieldShell({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className={"form-group" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="field-error" id={`${id}-error`}>{error}</p>
      ) : hint ? (
        <p className="hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  ref?: Ref<HTMLSelectElement>;
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
};

export function SelectField({ name, label, error, hint, options, placeholder, id = name, ...select }: SelectFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      {/* React marks a select's default option only on mount, and resets action
          forms to it after submit; re-mounting when the default changes keeps
          echoed values (e.g. after a validation error) on screen. */}
      <select key={String(select.defaultValue ?? "")} id={id} name={name} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...select}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string; label: string; error?: string; hint?: ReactNode };

export function TextAreaField({ name, label, error, hint, id = name, ...area }: TextAreaFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <textarea id={id} name={name} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...area} />
    </FieldShell>
  );
}

const ALERT_CLASS = { error: "manual-box--warning", success: "manual-box--success", info: "manual-box--info" };

export function FormAlert({ tone, children }: { tone: keyof typeof ALERT_CLASS; children: ReactNode }) {
  return (
    <div className={`manual-box ${ALERT_CLASS[tone]} form-alert`} role={tone === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}

export function SubmitButton({ children, pendingText, block = true }: { children: ReactNode; pendingText: string; block?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={"btn btn--primary" + (block ? " btn--block" : "")} disabled={pending} aria-busy={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
