import type { ReactNode } from "react";

// Split layout sized to the viewport: intro on the left, form card on the right.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="auth-section">
      <div className="container auth-shell">{children}</div>
    </section>
  );
}
