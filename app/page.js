import Link from "next/link";

export const metadata = {
  title: { absolute: "SmartNest — Smart Living, Simplified" },
  description: "SmartNest is the complete smart home technical manual and planning platform: learn the technology, follow real device guides, and build a system that fits your home and budget.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Smart Home Manual &amp; Planning Platform</span>
            <h1>
              Smart Living, <span className="hero-accent">Simplified.</span>
            </h1>
            <p className="lead">
              Detailed device guides, step-by-step installation instructions, practical automation routines, and a planner that turns your budget into a personalized smart-home setup.
            </p>
            <div className="hero-actions">
              <Link href="/planner" className="btn btn--primary">Start Building Your Smart Home</Link> <Link href="/devices" className="btn btn--ghost">Explore the Manual</Link>
            </div>
            <div className="hero-stats" id="heroStats">
              <div className="hero-stat"><strong data-stat="devices">9</strong><span>Device categories documented</span></div>
              <div className="hero-stat"><strong data-stat="automations">7</strong><span>Ready-made automation routines</span></div>
              <div className="hero-stat"><strong data-stat="builds">4</strong><span>Budget-tiered build plans</span></div>
            </div>
          </div>
          <figure className="hero-visual" aria-label="Illustration: an example home in My SmartNest">
            <div className="device-row">
              <div className="device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
                </svg>
              </div>
              <div className="device-info"><strong>Living Room — Smart Bulbs</strong><span>4 devices · Zigbee via hub</span></div>
              <span className="status-dot"></span>
            </div>
            <div className="device-row">
              <div className="device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="device-info"><strong>Front Door — Smart Lock</strong><span>Wi-Fi · Auto-locked 10 min ago</span></div>
              <span className="status-dot"></span>
            </div>
            <div className="device-row">
              <div className="device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <div className="device-info"><strong>Hallway — Motion Sensor</strong><span>Thread · Idle 12 min</span></div>
              <span className="status-dot" style={{ background: "var(--sn-border-hover)", boxShadow: "none" }}></span>
            </div>
            <div className="device-row">
              <div className="device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 15a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.5A4 4 0 0 1 21 14a4 4 0 0 1-4 4H7a4 4 0 0 1-4-3z"></path>
                </svg>
              </div>
              <div className="device-info"><strong>Whole Home — Thermostat</strong><span>22°C · Energy-saving mode on</span></div>
              <span className="status-dot"></span>
            </div>
            <figcaption className="hero-visual-caption">Illustration only — SmartNest helps you plan, record and support your devices; it doesn&apos;t control or monitor them.</figcaption>
          </figure>
        </div>
      </section>
      {/* INTRO / BENEFITS */}
      <section className="section" id="benefits">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why SmartNest</span>
            <h2>One place to learn, plan and build your smart home</h2>
            <p>
              Most smart home content is either a marketing brochure or a wall of manufacturer jargon. SmartNest sits in between: real technical documentation, written so a first-time buyer can actually follow it.
            </p>
          </div>
          <div className="grid grid--4">
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"></path>
                </svg>
              </div>
              <h3>Vendor-neutral guidance</h3>
              <p>
                We explain the protocols and standards (Wi-Fi, Zigbee, Thread, Matter) instead of pushing one brand's ecosystem, so you can mix and match with confidence.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="14" rx="2"></rect>
                  <path d="M8 21h8M12 18v3"></path>
                </svg>
              </div>
              <h3>Manual-grade device guides</h3>
              <p>
                Every device category — bulbs to energy monitors — comes with specs, requirements, installation steps, usage notes, safety warnings and maintenance schedules.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"></path>
                  <path d="M7 15l4-6 3 4 5-8"></path>
                </svg>
              </div>
              <h3>Budget-aware planning</h3>
              <p>The Smart Home Planner takes your home size, priorities and budget and returns a concrete device list instead of vague suggestions.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Security &amp; privacy first</h3>
              <p>Every automation and installation guide includes the security setting or precaution that most tutorials skip.</p>
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="section section--alt" id="how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How SmartNest Works</span>
            <h2>From "what is Zigbee?" to a working automated home</h2>
          </div>
          <div className="steps">
            <div className="step">
              <h4>Learn the fundamentals</h4>
              <p style={{ fontSize: "0.9rem" }}>Start with Smart Home Basics to understand IoT, hubs, and which wireless protocol fits your situation.</p>
            </div>
            <div className="step">
              <h4>Read the device manual</h4>
              <p style={{ fontSize: "0.9rem" }}>Open detailed guides for each device type before you buy — specs, compatibility and safety notes included.</p>
            </div>
            <div className="step">
              <h4>Plan your build</h4>
              <p style={{ fontSize: "0.9rem" }}>Use the Smart Home Planner or a ready-made Starter/Security/Energy/Automated bundle to fit your budget.</p>
            </div>
            <div className="step">
              <h4>Install &amp; automate</h4>
              <p style={{ fontSize: "0.9rem" }}>Follow the Installation Manual to set everything up, then layer on routines from the Automation Guide.</p>
            </div>
          </div>
        </div>
      </section>
      {/* QUICK NAV */}
      <section className="section" id="quick-nav">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Quick Navigation</span>
            <h2>Jump straight to what you need</h2>
          </div>
          <div className="grid grid--3">
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"></path>
                </svg>
              </div>
              <h3>Smart Home Basics</h3>
              <p>IoT concepts, wireless protocols, hubs, and cloud vs. local control explained in plain language.</p>
              <Link href="/basics" className="card-link">Read the basics →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18h6M10 22h4M15 2a6 6 0 0 0-4 10.5c.5.5.8 1.1.8 1.9V15h4.4v-.6c0-.8.3-1.4.8-1.9A6 6 0 0 0 15 2z"></path>
                </svg>
              </div>
              <h3>Device Manual</h3>
              <p>In-depth guides for bulbs, plugs, locks, cameras, door/window and motion sensors, thermostats, speakers and energy monitors.</p>
              <Link href="/devices" className="card-link">Open device manual →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"></path>
                </svg>
              </div>
              <h3>Build Your Smart Home</h3>
              <p>Starter, Security, Energy-Saving and Fully Automated bundles with real budget recommendations.</p>
              <Link href="/build" className="card-link">See build plans →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <path d="M9 9h6v6H9z"></path>
                </svg>
              </div>
              <h3>Installation &amp; Setup</h3>
              <p>Prerequisites, pairing steps, app/network configuration, testing and safety precautions.</p>
              <Link href="/installation" className="card-link">View install manual →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"></path>
                </svg>
              </div>
              <h3>Automation Guide</h3>
              <p>Morning, Good Night, Coming Home, Leaving Home, Security, Motion Lighting and Energy-Saving routines with flowcharts.</p>
              <Link href="/automation" className="card-link">Explore routines →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Security &amp; Privacy</h3>
              <p>Passwords, 2FA, secure Wi-Fi, firmware updates, camera privacy and data protection practices.</p>
              <Link href="/security" className="card-link">Secure your home →</Link>
            </div>
            <div className="link-card">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path>
                </svg>
              </div>
              <h3>Device Comparison</h3>
              <p>Compare device types side by side on connectivity, hub requirement, difficulty, cost and compatibility.</p>
              <Link href="/compare" className="card-link">Compare devices →</Link>
            </div>
          </div>
        </div>
      </section>
      {/* MY SMARTNEST — what a free account adds */}
      <section className="section" id="account">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">My SmartNest</span>
            <h2>Keep your whole smart home in one place</h2>
            <p>Reading the manual is free and needs no account. Create a free account when you want SmartNest to remember your home.</p>
          </div>
          <div className="grid grid--4">
            <div className="card">
              <h3>My Home &amp; devices</h3>
              <p>Rooms, every device you own, purchase dates and manuals — with warranty and maintenance reminders.</p>
            </div>
            <div className="card">
              <h3>Saved plans</h3>
              <p>Save Planner results, compare budgets, and add a plan&apos;s devices to your home in one step.</p>
            </div>
            <div className="card">
              <h3>SmartNest Care</h3>
              <p>Report a device problem with a photo and follow each status update on a timeline.</p>
            </div>
            <div className="card">
              <h3>Linked guides</h3>
              <p>Each registered device links to its technical guide, installation steps and security checklist.</p>
            </div>
          </div>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn--primary">Create a free account</Link>
            <Link href="/login" className="btn btn--ghost">Log in</Link>
          </div>
        </div>
      </section>
      {/* ABOUT / SERVICES */}
      <section className="section section--alt" id="about">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">About SmartNest</span>
            <h2>Two things called SmartNest</h2>
            <p>It's worth being precise about what you're looking at right now, and what it isn't.</p>
          </div>
          <div className="grid grid--2">
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="14" rx="2"></rect>
                  <path d="M8 21h8M12 18v3"></path>
                </svg>
              </div>
              <h3>SmartNest Website (this site)</h3>
              <p>
                A free, self-serve technical manual and planning platform. It documents smart home protocols and devices, walks through installation and automation step by step, and includes interactive tools — the Planner, Device Comparison and Troubleshooting Center. The guides and tools need no account; a free My SmartNest account saves your home, devices and plans and lets you raise SmartNest Care support tickets.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"></path>
                </svg>
              </div>
              <h3>SmartNest Solutions (the service concept)</h3>
              <p>
                A proposed hands-on service for people who'd rather not do it themselves: consultation and device selection tailored to your home, professional installation, automation setup, and ongoing maintenance and support. It builds on the same knowledge base as this manual, but is a separate, paid offering rather than a feature of this website.
              </p>
            </div>
          </div>
          <p className="muted-note">
            In short: everything you can click on this site is the free manual, planning platform and support desk. "SmartNest Solutions" describes the business idea of someone doing the installation work for you — it isn't a checkout flow here.
          </p>
        </div>
      </section>
      {/* PLANNER TEASER */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Not sure where to start?</h2>
              <p>Answer a few questions about your home and budget — the Smart Home Planner will suggest a real device list.</p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/planner" className="btn btn--primary">Open the Planner</Link> <Link href="/troubleshooting" className="btn btn--ghost">Troubleshooting Center</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
