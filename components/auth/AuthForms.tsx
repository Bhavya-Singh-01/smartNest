"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { requestPasswordReset, signIn, signUp, updatePassword, type FormState } from "@/lib/actions/auth";
import { Field, FormAlert, SubmitButton } from "@/components/forms/FormParts";
import { PASSWORD_MIN } from "@/lib/validation";

const initial: FormState = {};
const passwordHint = `At least ${PASSWORD_MIN} characters, with letters and numbers.`;

export function LoginForm() {
  const params = useSearchParams();
  const [state, action] = useActionState(signIn, initial);
  const linkError = params.get("error") === "link";

  return (
    <form action={action} noValidate>
      {linkError && !state.status && <FormAlert tone="error">That link is invalid or has expired. Sign in, or request a new password reset link.</FormAlert>}
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      <input type="hidden" name="next" value={params.get("next") ?? "/app"} />
      <Field name="email" type="email" label="Email" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
      <Field name="password" type="password" label="Password" autoComplete="current-password" required error={state.errors?.password} />
      <p className="auth-inline-link"><Link href="/forgot-password">Forgot your password?</Link></p>
      <SubmitButton pendingText="Signing in…">Log in</SubmitButton>
      <p className="auth-switch">New to SmartNest? <Link href="/signup">Create an account</Link></p>
    </form>
  );
}

export function SignUpForm() {
  const [state, action] = useActionState(signUp, initial);

  if (state.status === "check-email") {
    return (
      <div>
        <FormAlert tone="success">{state.message}</FormAlert>
        <p className="auth-switch">Already confirmed? <Link href="/login">Log in</Link></p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      <div className="form-row">
        <Field name="fullName" label="Full name" autoComplete="name" required maxLength={100} defaultValue={state.values?.fullName} error={state.errors?.fullName} />
        <Field name="email" type="email" label="Email" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
      </div>
      <div className="form-row">
        <Field name="password" type="password" label="Password" autoComplete="new-password" required minLength={PASSWORD_MIN} hint={passwordHint} error={state.errors?.password} />
        <Field name="confirmPassword" type="password" label="Confirm password" autoComplete="new-password" required error={state.errors?.confirmPassword} />
      </div>
      <SubmitButton pendingText="Creating account…">Create account</SubmitButton>
      <p className="auth-switch">Already have an account? <Link href="/login">Log in</Link></p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useActionState(requestPasswordReset, initial);

  if (state.status === "success") {
    return (
      <div>
        <FormAlert tone="success">{state.message}</FormAlert>
        <p className="auth-switch"><Link href="/login">Back to log in</Link></p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      {state.message && <FormAlert tone="error">{state.message}</FormAlert>}
      <Field name="email" type="email" label="Email" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
      <SubmitButton pendingText="Sending…">Send reset link</SubmitButton>
      <p className="auth-switch">Remembered it? <Link href="/login">Back to log in</Link></p>
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action] = useActionState(updatePassword, initial);

  return (
    <form action={action} noValidate>
      {state.message && <FormAlert tone="error">{state.message} {" "}<Link href="/forgot-password">Request a new link</Link></FormAlert>}
      <div className="form-row">
        <Field name="password" type="password" label="New password" autoComplete="new-password" required minLength={PASSWORD_MIN} hint={passwordHint} error={state.errors?.password} />
        <Field name="confirmPassword" type="password" label="Confirm password" autoComplete="new-password" required error={state.errors?.confirmPassword} />
      </div>
      <SubmitButton pendingText="Saving…">Save new password</SubmitButton>
    </form>
  );
}
