import { Suspense, type ReactNode } from "react";

// Page shell for My SmartNest: user-specific content always reads the session,
// so it renders inside a Suspense boundary with a loading state.
export function AppPage({ loading, children }: { loading: string; children: ReactNode }) {
  return (
    <section className="section app-section">
      <div className="container">
        <Suspense fallback={<p className="app-loading" role="status">{loading}</p>}>{children}</Suspense>
      </div>
    </section>
  );
}

export function PageHead({ eyebrow, title, sub, actions }: { eyebrow: string; title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="app-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {sub && <p className="app-sub">{sub}</p>}
      </div>
      {actions && <div className="app-head-actions">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
