"use client";

import { useActionState } from "react";
import { updateProfile, type FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SubmitButton } from "@/components/forms/FormParts";

export function ProfileForm({ fullName, phone }: { fullName: string; phone: string | null }) {
  const [state, action] = useActionState(updateProfile, {} as FormState);
  const values = state.values ?? { fullName, phone: phone ?? "" };

  return (
    <form action={action} noValidate>
      {state.message && <FormAlert tone={state.status === "success" ? "success" : "error"}>{state.message}</FormAlert>}
      <div className="form-row">
        <Field name="fullName" label="Full name" autoComplete="name" required maxLength={100} defaultValue={values.fullName} error={state.errors?.fullName} />
        <Field name="phone" type="tel" label="Phone (optional)" autoComplete="tel" defaultValue={values.phone} error={state.errors?.phone} />
      </div>
      <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
    </form>
  );
}
