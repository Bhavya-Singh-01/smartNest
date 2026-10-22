import { ForgotPasswordForm } from "@/components/auth/AuthForms";
import { AuthIntro } from "@/components/auth/AuthIntro";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthIntro eyebrow="Account help" title="Reset your password">
        Enter the email you signed up with and we'll send you a link to choose a new password.
      </AuthIntro>
      <div className="auth-card">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
