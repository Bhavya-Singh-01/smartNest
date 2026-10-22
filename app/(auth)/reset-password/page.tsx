import { Suspense } from "react";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/AuthForms";
import { AuthIntro } from "@/components/auth/AuthIntro";
import { FormAlert } from "@/components/forms/FormParts";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Choose a new password" };

export default function ResetPasswordPage() {
  return (
    <>
      <AuthIntro eyebrow="Account help" title="Choose a new password">
        Use at least 8 characters with both letters and numbers. You'll stay signed in afterwards.
      </AuthIntro>
      <div className="auth-card">
        <Suspense fallback={<p className="app-loading" role="status">Checking your reset link…</p>}>
          <ResetPasswordGate />
        </Suspense>
      </div>
    </>
  );
}

// The email link signs the user in (via /auth/confirm) before landing here.
async function ResetPasswordGate() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <FormAlert tone="error">
        This page needs a valid reset link. <Link href="/forgot-password">Request a new one</Link>.
      </FormAlert>
    );
  }
  return (
    <>
      <p className="auth-card-note">Setting a new password for <strong>{user.email}</strong>.</p>
      <ResetPasswordForm />
    </>
  );
}
