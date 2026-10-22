"use client";

import { Fragment, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  buildPlan,
  formatINR,
  HOME_TYPE_LABELS,
  OWNED_LABELS,
  PRIORITY_LABELS,
  type CatalogProduct,
  type HomeType,
  type Owned,
  type PlanInput,
  type PlanResult,
  type Priority,
} from "@/lib/planner";
import { savePlan } from "@/lib/actions/plans";

const HOME_TYPES: { value: HomeType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "Independent House" },
  { value: "studio", label: "Studio / 1RK" },
];

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "lighting", label: "Lighting & Convenience" },
  { value: "security", label: "Security" },
  { value: "energy", label: "Energy Saving" },
  { value: "climate", label: "Climate Control" },
  { value: "voice", label: "Voice Control" },
];

export type SavedPlanInput = {
  id: string;
  name: string;
  homeType: HomeType;
  rooms: number;
  priorities: Priority[];
  budget: number;
  existing: Owned[];
};

export function Planner({ catalog, initialPlan = null }: { catalog: CatalogProduct[]; initialPlan?: SavedPlanInput | null }) {
  const [homeType, setHomeType] = useState<HomeType>(initialPlan?.homeType ?? "apartment");
  const [rooms, setRooms] = useState(initialPlan?.rooms ?? 3);
  const [priorities, setPriorities] = useState<Priority[]>(initialPlan?.priorities ?? ["lighting", "security"]);
  const [budget, setBudget] = useState(initialPlan?.budget ?? 25000);
  const [existing, setExisting] = useState<Owned[]>(initialPlan?.existing ?? []);
  const [submitted, setSubmitted] = useState<PlanInput | null>(() =>
    initialPlan ? { homeType: initialPlan.homeType, rooms: initialPlan.rooms, priorities: initialPlan.priorities, budget: initialPlan.budget, existing: initialPlan.existing } : null
  );
  const result = useMemo(() => (submitted ? buildPlan(submitted, catalog) : null), [submitted, catalog]);

  const toggle = <T,>(list: T[], value: T, on: boolean) => (on ? [...list, value] : list.filter((x) => x !== value));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted({ homeType, rooms, priorities: priorities.length ? priorities : ["lighting"], budget, existing });
  }

  return (
    <div className="planner-shell">
      <form className="planner-form" id="plannerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>1. What type of home do you live in?</label>
          <div className="pill-select" id="homeTypeGroup">
            {HOME_TYPES.map((t) => (
              <Fragment key={t.value}>
                <input type="radio" name="homeType" id={"ht-" + t.value} value={t.value} checked={homeType === t.value} onChange={() => setHomeType(t.value)} />
                <label className="pill" htmlFor={"ht-" + t.value}>{t.label}</label>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="roomCount">2. How many rooms should be covered?</label>
          <input type="range" min="1" max="10" value={rooms} id="roomCount" onChange={(e) => setRooms(parseInt(e.target.value, 10))} />
          <div className="range-value">
            <span>1 room</span>
            <strong id="roomCountLabel">{rooms + (rooms === 1 ? " room" : " rooms")}</strong>
            <span>10 rooms</span>
          </div>
        </div>

        <div className="form-group">
          <label>3. What matters most to you? (select all that apply)</label>
          <div className="pill-select" id="priorityGroup">
            {PRIORITIES.map((p) => (
              <Fragment key={p.value}>
                <input type="checkbox" id={"p-" + p.value} value={p.value} checked={priorities.includes(p.value)} onChange={(e) => setPriorities(toggle(priorities, p.value, e.target.checked))} />
                <label className="pill" htmlFor={"p-" + p.value}>{p.label}</label>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="budgetRange">4. What&apos;s your total budget?</label>
          <input type="range" min="5000" max="100000" step="1000" value={budget} id="budgetRange" onChange={(e) => setBudget(parseInt(e.target.value, 10))} />
          <div className="range-value">
            <span>₹5,000</span>
            <strong id="budgetLabel">{budget >= 100000 ? "₹1,00,000+" : formatINR(budget)}</strong>
            <span>₹1,00,000+</span>
          </div>
        </div>

        <div className="form-group">
          <label>5. What do you already own? (we&apos;ll skip these)</label>
          <div className="pill-select" id="existingGroup">
            {(Object.keys(OWNED_LABELS) as Owned[]).map((o) => (
              <Fragment key={o}>
                <input type="checkbox" id={"own-" + o} checked={existing.includes(o)} onChange={(e) => setExisting(toggle(existing, o, e.target.checked))} />
                <label className="pill" htmlFor={"own-" + o}>{OWNED_LABELS[o]}</label>
              </Fragment>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn--primary btn--block">Generate My Setup</button>
        <p className="hint text-center" style={{ marginTop: "14px" }}>
          Rule-based recommendations from the SmartNest catalogue. Prices are estimates for planning, not a quote.
        </p>
      </form>

      <div className="planner-result" id="plannerResult">
        {result ? <PlannerResult result={result} plan={initialPlan} /> : <EmptyResult />}
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="result-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"></path></svg>
      <h3 style={{ margin: 0 }}>Your suggested setup will appear here</h3>
      <p style={{ margin: 0, fontSize: "0.88rem" }}>Fill in the form and click &quot;Generate My Setup.&quot;</p>
    </div>
  );
}

function PlannerResult({ result, plan }: { result: PlanResult; plan: SavedPlanInput | null }) {
  const { input } = result;
  const priorityLabels = input.priorities.map((p) => PRIORITY_LABELS[p]).join(", ") || "General";

  if (!result.items.length) {
    return (
      <div className="result-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 9v4M12 17h.01"></path><circle cx="12" cy="12" r="10"></circle></svg>
        <h3 style={{ margin: 0 }}>Budget too low for the selected priorities</h3>
        {result.warnings.map((w) => <p key={w} style={{ margin: 0, fontSize: "0.92rem" }}>{w}</p>)}
      </div>
    );
  }

  const costEntries = Object.entries(result.categoryCosts).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <h3 style={{ marginBottom: "4px" }}>Your Personalized Setup</h3>
      <p className="result-meta">{HOME_TYPE_LABELS[input.homeType]} · {input.rooms} rooms · Focused on: {priorityLabels}</p>

      {result.warnings.length > 0 && (
        <div className="manual-box manual-box--warning plan-warnings">
          <strong className="box-label">Check before you buy</strong>
          <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      )}

      <div className="result-items">
        {result.items.map((item) => (
          <div key={item.key} className="result-item">
            <div>
              <div className="name">
                {item.name}{item.qty > 1 ? " × " + item.qty : ""}
                {item.isSample ? <span className="tag sample-tag">Sample</span> : item.sourceUrl ? <a className="source-link" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Source ↗</a> : null}
              </div>
              <div className="desc">{item.reason}{item.note ? ` (${item.note}.)` : ""}</div>
              <Link className="guide-link" href={item.guide}>Read the guide →</Link>
            </div>
            <div className="price">{formatINR(item.lineTotal)}</div>
          </div>
        ))}
      </div>

      <div className="result-total">
        <span>Estimated Budget Used</span>
        <span>{formatINR(result.total)} / {formatINR(result.budget)}</span>
      </div>
      <p className="hint" style={{ margin: "6px 0 16px" }}>
        {result.remaining > 0 ? formatINR(result.remaining) + " left over for extras or a second phase." : "This uses your full budget."}
      </p>

      <div className="cost-breakdown">
        <span className="subhead">Cost by category</span>
        {costEntries.map(([cat, cost]) => (
          <div key={cat} className="cost-row">
            <span>{cat}</span>
            <span className="cost-bar" aria-hidden="true"><span style={{ width: `${Math.round((cost / result.total) * 100)}%` }} /></span>
            <span>{formatINR(cost)}</span>
          </div>
        ))}
      </div>

      {result.skipped.length > 0 && (
        <div className="skipped">
          <span className="subhead">Didn&apos;t fit this budget</span>
          <ul>
            {result.skipped.map((s) => (
              <li key={s.key}>{s.name}{s.qty > 1 ? ` × ${s.qty}` : ""} — {formatINR(s.lineTotal)} (needs {formatINR(s.shortBy)} more)</li>
            ))}
          </ul>
        </div>
      )}

      {input.existing.length > 0 && (
        <p className="hint">Skipped because you already own: {input.existing.map((o) => OWNED_LABELS[o].toLowerCase()).join(", ")}.</p>
      )}

      <div style={{ marginBottom: "16px" }}>
        <span className="subhead" style={{ marginBottom: "8px" }}>Suggested Automations</span>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.95rem" }}>
          {result.automations.length ? (
            result.automations.map((a) => <li key={a}><Link href="/automation">{a}</Link></li>)
          ) : (
            <li>None yet — add a Security, Energy Saving or Climate priority to unlock automation suggestions</li>
          )}
        </ul>
      </div>

      <div className="manual-box manual-box--info" style={{ margin: "0 0 16px" }}>
        <strong className="box-label">Basic Setup Requirements</strong>
        <ul>
          <li>2.4GHz Wi-Fi network with stable coverage across all rooms</li>
          {result.needsHub ? (
            <li>A Zigbee/Thread-compatible hub — required for the sensors in this plan</li>
          ) : (
            <li>No separate hub required — everything here runs on Wi-Fi or Bluetooth directly</li>
          )}
          <li>Manufacturer app(s) installed, plus Google Home/Alexa/Apple Home if you want unified voice control</li>
        </ul>
      </div>

      {result.usesSampleData && (
        <p className="hint">Items marked “Sample” are illustrative device types with estimated prices, not verified product listings.</p>
      )}

      {/* Keyed by the inputs so a newly generated setup saves as a new plan. */}
      <SavePlanPanel key={JSON.stringify(input)} input={input} plan={plan} />

      <Link href="/installation" className="btn btn--ghost btn--block">Next: Installation &amp; Setup Manual</Link>
    </>
  );
}

function defaultPlanName(input: PlanInput) {
  return `${HOME_TYPE_LABELS[input.homeType]} · ${input.rooms} ${input.rooms === 1 ? "room" : "rooms"} · ${formatINR(input.budget)}`;
}

// Save the generated setup to My SmartNest (the server rebuilds it from the inputs).
function SavePlanPanel({ input, plan }: { input: PlanInput; plan: SavedPlanInput | null }) {
  const router = useRouter();
  const [name, setName] = useState(plan?.name ?? defaultPlanName(input));
  const [savedId, setSavedId] = useState<string | null>(plan?.id ?? null);
  const [status, setStatus] = useState<Awaited<ReturnType<typeof savePlan>> | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePlan({ planId: savedId, name, ...input });
      if (res.status === "saved" && plan) {
        router.push(`/app/plans/${res.planId}?toast=plan-saved`);
        return;
      }
      if (res.status === "saved") setSavedId(res.planId);
      setStatus(res);
    });
  }

  if (status?.status === "auth") {
    return (
      <div className="save-plan">
        <p className="save-plan-note">
          <Link href="/login?next=/planner">Log in</Link> or <Link href="/signup">create a free account</Link> to save this plan and come back to it later.
        </p>
      </div>
    );
  }

  return (
    <form className="save-plan" onSubmit={handleSave} noValidate>
      <label htmlFor="planName" className="subhead">{plan ? "Update this saved plan" : "Save this plan"}</label>
      <div className="save-plan-row">
        <input id="planName" type="text" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} aria-label="Plan name" />
        <button type="submit" className="btn btn--primary" disabled={pending || !name.trim()} aria-busy={pending}>
          {pending ? "Saving…" : savedId ? "Save changes" : "Save plan"}
        </button>
      </div>
      {status?.status === "saved" && (
        <p className="save-plan-note" role="status">
          Saved to My SmartNest. <Link href={`/app/plans/${status.planId}`}>View plan</Link>
        </p>
      )}
      {status?.status === "error" && <p className="field-error" role="alert">{status.message}</p>}
    </form>
  );
}
