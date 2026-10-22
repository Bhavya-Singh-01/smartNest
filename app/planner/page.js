import Link from "next/link";
import { Planner } from "@/components/planner/Planner";
import { getPlannerCatalog } from "@/lib/catalog";

export const metadata = {
  title: "Smart Home Planner",
  description: "Enter your home type, rooms, requirements and budget to get a suggested smart home device list.",
};

// Catalogue is cached (tag "catalog"), so this page still prerenders.
async function PlannerWithCatalog() {
  return <Planner catalog={await getPlannerCatalog()} />;
}

export default function PlannerPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Smart Home Planner</div>
          <span className="eyebrow">Interactive Planner</span>
          <h1>Smart Home Planner</h1>
          <p className="lead">
            Answer a few questions about your home and priorities. The planner builds a real device list that fits your budget — not just a generic suggestion.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PlannerWithCatalog />
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How the Planner Works</span>
            <h2>Behind the recommendation</h2>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <h3>1. Scales with your home</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Device quantities (bulbs, sensors, plugs) scale with your room count, and home type adjusts what's actually relevant — an apartment usually needs fewer outdoor cameras than a house.
              </p>
            </div>
            <div className="card">
              <h3>2. Prioritizes what you chose</h3>
              <p style={{ fontSize: "0.9rem" }}>Categories you mark as priorities are filled first; unselected categories — and devices you already own — are left out so the budget goes where it matters to you.</p>
            </div>
            <div className="card">
              <h3>3. Fits your budget</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Essential items in your chosen categories are added first, then optional upgrades — stopping once your budget is used. Anything that doesn't fit is listed with how much more it needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
