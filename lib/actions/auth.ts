"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { parseNewPassword, parseProfile, parseSignIn, parseSignUp, safeNextPath, validateEmail, type FieldErrors } from "@/lib/validation";

export type FormState = {
  status?: "error" | "success" | "check-email";
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
};

// Supabase Auth errors → messages a customer can act on. Unknown errors are
// logged server-side and shown generically.
function authErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "Email or password is incorrect.";
    case "email_not_confirmed":
      return "Please confirm your email first — check your inbox for the link we sent.";
    case "weak_password":
      return "That password is too weak. Use at least 8 characters with letters and numbers.";
    case "same_password":
      return "Your new password must be different from the current one.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "session_not_found":
    case "session_expired":
      return "Your reset link has expired. Request a new one.";
    default:
      console.error("Supabase auth error", error.code, error.message);
      return "Something went wrong. Please try again.";
  }
}

export async function signUp(_prev: FormState, form: FormData): Promise<FormState> {
  const { values, errors } = parseSignUp(form);
  const echo = { fullName: values.fullName, email: values.email };
  if (Object.keys(errors).length) return { status: "error", errors, values: echo };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: { data: { full_name: values.fullName } },
  });
  if (error) return { status: "error", message: authErrorMessage(error), values: echo };

  // With email confirmation on there is no session yet. Supabase also returns
  // no session for an already-registered email, so the reply is the same
  // either way and doesn't reveal which emails have accounts.
  if (!data.session) {
    return { status: "check-email", message: `We've sent a confirmation link to ${values.email}. Open it to activate your account.` };
  }
  redirect("/app");
}

export async function signIn(_prev: FormState, form: FormData): Promise<FormState> {
  const { values, errors } = parseSignIn(form);
  const echo = { email: values.email };
  if (Object.keys(errors).length) return { status: "error", errors, values: echo };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(values);
  if (error) return { status: "error", message: authErrorMessage(error), values: echo };

  redirect(safeNextPath(form.get("next")));
}

export async function requestPasswordReset(_prev: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const emailError = validateEmail(email);
  if (emailError) return { status: "error", errors: { email: emailError }, values: { email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  // Rate limits are worth reporting; anything else gets the same neutral reply
  // so the form can't be used to discover which emails are registered.
  if (error && (error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit")) {
    return { status: "error", message: authErrorMessage(error), values: { email } };
  }
  if (error) console.error("Password reset request failed", error.code, error.message);
  return { status: "success", message: `If an account exists for ${email}, a reset link is on its way. It expires in one hour.` };
}

export async function updatePassword(_prev: FormState, form: FormData): Promise<FormState> {
  const { values, errors } = parseNewPassword(form);
  if (Object.keys(errors).length) return { status: "error", errors };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: values.password });
  if (error) return { status: "error", message: authErrorMessage(error) };

  redirect("/app?password=updated");
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Sign-out failed", error.code, error.message);
  redirect("/");
}

export async function updateProfile(_prev: FormState, form: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/app");

  const { values, errors } = parseProfile(form);
  const echo = { fullName: values.fullName, phone: values.phone };
  if (Object.keys(errors).length) return { status: "error", errors, values: echo };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: values.fullName, phone: values.phone || null })
    .eq("id", user.id);
  if (error) {
    console.error("Profile update failed", error.code, error.message);
    return { status: "error", message: "Couldn't save your profile. Please try again.", values: echo };
  }

  revalidatePath("/app");
  return { status: "success", message: "Profile saved.", values: echo };
}
