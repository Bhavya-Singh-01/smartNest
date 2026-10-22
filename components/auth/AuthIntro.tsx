import type { ReactNode } from "react";

// Left-hand editorial column of the auth pages (the form card sits beside it).
export function AuthIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="auth-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="auth-lead">{children}</p>
    </div>
  );
}
