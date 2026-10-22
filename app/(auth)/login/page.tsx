import { Suspense } from "react";
import { LoginForm } from "@/components/auth/AuthForms";
import { AuthIntro } from "@/components/auth/AuthIntro";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <>
      <AuthIntro eyebrow="My SmartNest" title="Log in">
        Pick up where you left off — your home, devices, plans and support tickets.
      </AuthIntro>
      <div className="auth-card">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </>
  );
}
