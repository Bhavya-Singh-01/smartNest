import Link from "next/link";
import { CompareTool } from "@/components/compare/CompareTool";

export const metadata = {
  title: "Device Comparison",
  description: "Compare smart home device types side by side on connectivity, hub requirement, installation difficulty, main use, automation capability, cost and compatibility.",
};

export default function ComparePage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Device Comparison</div>
          <span className="eyebrow">Comparison Tool</span>
          <h1>Device Comparison</h1>
          <p className="lead">
            Select two or more device types to compare them side by side on connectivity, hub requirement, installation difficulty, main use, automation capability, approximate cost and compatibility.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CompareTool />
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Found the right combination?</h2>
              <p>Read the full guide for any device, or build a complete setup with the Planner.</p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/devices" className="btn btn--primary">Open Device Manual</Link> <Link href="/planner" className="btn btn--ghost">Open Planner</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
