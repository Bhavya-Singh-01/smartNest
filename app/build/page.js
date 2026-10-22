import Link from "next/link";

export const metadata = {
  title: "Build Your Smart Home",
  description: "Starter, Security, Energy-Saving and Fully Automated smart home setups with devices, budget, automations, difficulty and expansion options.",
};

export default function BuildPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Build Your Smart Home</div>
          <span className="eyebrow">Build Plans</span>
          <h1>Build Your Smart Home</h1>
          <p className="lead">
            Four ready-made setups covering the most common goals. Each one lists real devices, purpose, required components, budget, suggested automations, difficulty and how to expand it later — pick the closest match, or use the Planner for a setup tailored to your specific home.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            <div className="bundle-card" id="starter">
              <span className="tag tag--primary" style={{ alignSelf: "flex-start" }}>Best for first-timers</span>
              <h2 style={{ marginTop: "14px" }}>Starter Smart Home</h2>
              <p style={{ fontSize: "0.9rem" }}><strong>Main purpose:</strong> a low-risk first step into voice/app-controlled lighting and one or two appliances, no wiring or hub required.</p>
              <div className="bundle-price">₹4,500 <span>– ₹8,000 total</span></div>
              <ul>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 3–4 smart bulbs (Wi-Fi, living room + bedroom)
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 2 smart plugs (fan, lamp, or other appliance)
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1 entry-level smart speaker (voice control + routines)
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> No hub needed — everything runs on Wi-Fi
                </li>
              </ul>
              <div className="spec-list" style={{ marginBottom: "16px" }}>
                <li><span className="k">Required components</span><span className="v">2.4GHz Wi-Fi, phone, manufacturer app</span></li>
                <li><span className="k">Suggested automations</span><span className="v">Morning Routine, Good Night Routine</span></li>
                <li><span className="k">Difficulty level</span><span className="v">Easy — no wiring</span></li>
              </div>
              <div className="callout callout--tip" style={{ marginBottom: "16px" }}>
                <div>
                  <strong>Expansion options</strong>Add a motion sensor for hands-free hallway lighting, then a door sensor on the main entrance — both slot into the Security Setup below without replacing anything you already own.
                </div>
              </div>
              <Link href="/planner" className="btn btn--primary btn--block">Customize This Setup</Link>
            </div>
            <div className="bundle-card featured" id="security-setup">
              <span className="badge">Most Popular</span> <span className="tag tag--accent" style={{ alignSelf: "flex-start" }}>Best for peace of mind</span>
              <h2 style={{ marginTop: "14px" }}>Smart Security Home</h2>
              <p style={{ fontSize: "0.9rem" }}>
                <strong>Main purpose:</strong> cover entry points and visibility — know when a door opens, see who's outside, and control access without physical keys.
              </p>
              <div className="bundle-price">₹18,000 <span>– ₹32,000 total</span></div>
              <ul>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1 smart lock for the main entry door
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 2 outdoor security cameras (front + back/side entry)
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 3–4 door/window sensors on ground-floor openings
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1–2 motion sensors on key approach paths
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1 hub (often bundled with the lock or camera system)
                </li>
              </ul>
              <div className="spec-list" style={{ marginBottom: "16px" }}>
                <li><span className="k">Required components</span><span className="v">Hub, 2.4GHz Wi-Fi, mounting hardware</span></li>
                <li><span className="k">Suggested automations</span><span className="v">Security Routine, Coming Home, Leaving Home</span></li>
                <li><span className="k">Difficulty level</span><span className="v">Moderate — lock/camera mounting involved</span></li>
              </div>
              <div className="callout callout--tip" style={{ marginBottom: "16px" }}>
                <div>
                  <strong>Expansion options</strong>Add indoor cameras and a second speaker for full-home coverage, or layer on the Energy-Saving Setup's smart plugs since both share the same hub investment.
                </div>
              </div>
              <Link href="/planner" className="btn btn--primary btn--block">Customize This Setup</Link>
            </div>
            <div className="bundle-card" id="energy-setup">
              <span className="tag tag--warn" style={{ alignSelf: "flex-start" }}>Best for reducing bills</span>
              <h2 style={{ marginTop: "14px" }}>Energy-Saving Home</h2>
              <p style={{ fontSize: "0.9rem" }}>
                <strong>Main purpose:</strong> visibility and automatic reduction of wasted electricity — especially cooling, which is usually the largest single load.
              </p>
              <div className="bundle-price">₹14,000 <span>– ₹26,000 total</span></div>
              <ul>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1 smart AC controller or thermostat
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 2–3 energy-monitoring smart plugs on high-draw appliances
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> Smart bulbs with scheduling in frequently-forgotten rooms
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1–2 motion sensors to auto-off lights in unoccupied rooms
                </li>
              </ul>
              <div className="spec-list" style={{ marginBottom: "16px" }}>
                <li><span className="k">Required components</span><span className="v">2.4GHz Wi-Fi, line-of-sight for AC controller</span></li>
                <li><span className="k">Suggested automations</span><span className="v">Energy-Saving Routine, Motion-Based Lighting</span></li>
                <li><span className="k">Difficulty level</span><span className="v">Moderate — AC controller placement matters</span></li>
              </div>
              <div className="callout callout--tip" style={{ marginBottom: "16px" }}>
                <div>
                  <strong>Expansion options</strong>Add a whole-home energy monitor once you've identified which per-appliance plugs show the highest draw, to get panel-level visibility.
                </div>
              </div>
              <Link href="/planner" className="btn btn--primary btn--block">Customize This Setup</Link>
            </div>
            <div className="bundle-card" id="automated-setup">
              <span className="tag" style={{ alignSelf: "flex-start" }}>Best for going all-in</span>
              <h2 style={{ marginTop: "14px" }}>Fully Automated Home</h2>
              <p style={{ fontSize: "0.9rem" }}>
                <strong>Main purpose:</strong> combine lighting, security, climate and energy monitoring into one coordinated system with layered automations across the whole home.
              </p>
              <div className="bundle-price">₹55,000 <span>– ₹95,000+ total</span></div>
              <ul>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> Smart bulbs/switches in every main room
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> Full lock + camera + door/motion sensor security layer
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> Whole-home or multi-zone climate control
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> Whole-home energy monitoring
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg> 1–2 hubs supporting Zigbee/Thread/Matter
                </li>
              </ul>
              <div className="spec-list" style={{ marginBottom: "16px" }}>
                <li><span className="k">Required components</span><span className="v">Multi-protocol hub(s), whole-home Wi-Fi coverage</span></li>
                <li><span className="k">Suggested automations</span><span className="v">All 7 routines from the Automation Guide</span></li>
                <li><span className="k">Difficulty level</span><span className="v">Hard — best built in phases</span></li>
              </div>
              <div className="callout callout--tip" style={{ marginBottom: "16px" }}>
                <div>
                  <strong>Expansion options</strong>This is the ceiling setup — further expansion means adding devices within categories you already have (more sensors, more zones) rather than new categories.
                </div>
              </div>
              <Link href="/planner" className="btn btn--primary btn--block">Customize This Setup</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Budget Guidance</span>
            <h2>How much should you actually spend?</h2>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>Budget Range</th>
                  <th>Recommended Setup</th>
                  <th>What You Get</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Under ₹10,000</td>
                  <td>Starter Smart Home</td>
                  <td>Voice-controlled lighting and 1–2 appliances</td>
                  <td>Easy</td>
                </tr>
                <tr>
                  <td>₹10,000 – ₹25,000</td>
                  <td>Starter + partial Security or Energy-Saving</td>
                  <td>Lighting, plugs, plus a lock or a camera</td>
                  <td>Easy–Moderate</td>
                </tr>
                <tr>
                  <td>₹25,000 – ₹50,000</td>
                  <td>Full Security or Full Energy-Saving Home</td>
                  <td>Complete coverage in one focus area</td>
                  <td>Moderate</td>
                </tr>
                <tr>
                  <td>₹50,000+</td>
                  <td>Fully Automated Home</td>
                  <td>Whole-home lighting, security, climate and energy control</td>
                  <td>Hard</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}><Link href="/planner" className="btn btn--primary">Get a Setup Tailored to My Budget</Link></div>
        </div>
      </section>
    </>
  );
}
