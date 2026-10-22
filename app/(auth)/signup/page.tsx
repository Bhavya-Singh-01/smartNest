import { SignUpForm } from "@/components/auth/AuthForms";
import { AuthIntro } from "@/components/auth/AuthIntro";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <>
      <AuthIntro eyebrow="My SmartNest" title="Create your account">
        Save home plans, keep track of your devices and report problems to SmartNest Care. Free to use.
      </AuthIntro>
      <div className="auth-card">
        <SignUpForm />
      </div>
    </>
  );
}
