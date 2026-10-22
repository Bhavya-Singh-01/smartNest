import Link from "next/link";
import { AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/Accordion";

export const metadata = {
  title: "FAQ, Glossary & Support",
  description: "Frequently asked questions, a glossary of smart home terms, and support contact options.",
};

export default function FaqPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / FAQ, Glossary &amp; Support</div>
          <span className="eyebrow">FAQ · Glossary · Support</span>
          <h1>FAQ, Glossary &amp; Support</h1>
          <p className="lead">Answers to the questions we hear most, a plain-language glossary of smart home terms, and how to reach us if you're still stuck.</p>
        </div>
      </section>
      {/* FAQ */}
      <section className="section" id="faq-section">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="accordion">
            <AccordionItem>
              <AccordionTrigger>Do I need a hub to start a smart home?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  No. Wi-Fi-only devices (many bulbs, plugs and cameras) connect directly to your router without a separate hub. A hub becomes necessary once you add Zigbee, Z-Wave or Thread devices, which is common as a setup grows — see Smart Home Basics for the full breakdown.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Will my smart home still work if the internet goes down?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  It depends on the device and hub. Many modern hubs process routine automations locally (motion triggers a light, for example) even without internet, but remote access, voice assistant commands, and cloud-only devices will stop working until connectivity returns. Check each device's local-control support before relying on it during outages.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Can I mix brands in one smart home?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  Yes, especially with Matter-certified devices, which are designed to work across Google Home, Amazon Alexa and Apple Home without separate accounts. Even without Matter, most brands offer integrations with the major voice assistants, letting you control mixed-brand devices from one app.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Is it safe to install smart switches and thermostats myself?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  If you're comfortable identifying wiring and always cut power at the breaker first, most smart switches and thermostats are a manageable DIY job. If you're unsure about your home's wiring (no neutral wire, unusual panel configuration, or an older electrical system), hire a licensed electrician rather than guessing.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>How much should I budget for a first smart home purchase?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  A Starter Smart Home (a few smart bulbs, a plug or two, and a smart speaker) typically costs ₹4,500–₹8,000 and is a low-risk way to learn the basics before investing further. See Build Your Smart Home for the full budget tiers, or run the Planner for numbers specific to your home.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Do smart cameras record even when I'm home?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  This depends on your configuration. Most camera apps let you set a "Home" mode that disables motion recording and alerts while you're present, and an "Away" mode that re-enables them. It's worth confirming this setting explicitly rather than assuming it's automatic.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>What happens to my smart lock if the batteries die?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  Nearly all smart locks retain a physical key override or an external battery terminal (often a 9V contact) for emergency power. Always test both before relying on the lock daily, and replace batteries proactively when the app shows a low-battery warning.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>What's the difference between a motion sensor and a door/window sensor?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  A door/window sensor reports whether a specific opening is open or closed using a magnetic contact. A motion sensor detects movement anywhere in its field of view using infrared, without needing a specific opening. They're often used together — a door sensor for a precise entry alert, and motion sensors to cover the space between doors.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Should I put my smart devices on a guest network?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  If your router supports it, yes — segmenting IoT devices onto a separate network limits what a compromised device could reach. See the Security &amp; Privacy page for the full guest network and segmentation guidance.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Can I use the Smart Home Planner more than once?</AccordionTrigger>
              <AccordionPanel>
                <p>Yes — run it as many times as you like with different budgets or priorities to compare setups before committing to a purchase list.</p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>What should I do with an old smart device before getting rid of it?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  Factory reset it, remove it from your manufacturer account and any linked ecosystem apps, and for locks or cameras specifically, delete stored access codes and footage first. See the Safe Device Disposal section on the Security &amp; Privacy page.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Is SmartNest a store where I can buy devices?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  SmartNest the website is a free technical manual and planning platform — it doesn't sell hardware. SmartNest Solutions, the business concept behind it, is a proposed service for consultation, device selection, installation and ongoing maintenance. See the About section on the homepage for the distinction.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </div>
        </div>
      </section>
      {/* GLOSSARY */}
      <section className="section section--alt" id="glossary">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow">Glossary</span>
            <h2>Smart Home Terms, Explained Plainly</h2>
          </div>
          <dl className="glossary-grid">
            <div className="glossary-item">
              <dt>IoT (Internet of Things)</dt>
              <dd>Everyday physical objects with a small computer and network radio built in, allowing remote control and data reporting.</dd>
            </div>
            <div className="glossary-item">
              <dt>Smart Device</dt>
              <dd>Any IoT endpoint built for a specific home function — a sensor, an actuator, or both — that can be monitored or controlled over a network.</dd>
            </div>
            <div className="glossary-item">
              <dt>Sensor</dt>
              <dd>A device that reports information about the world (motion, temperature, open/closed state) without acting on it directly.</dd>
            </div>
            <div className="glossary-item">
              <dt>Actuator</dt>
              <dd>A device that acts on the world on command — turning a motor, switching a relay, dimming a light.</dd>
            </div>
            <div className="glossary-item">
              <dt>Hub / Bridge</dt>
              <dd>A device that translates between a low-power protocol (Zigbee, Z-Wave, Thread) and your home network so devices can be controlled from an app.</dd>
            </div>
            <div className="glossary-item">
              <dt>Zigbee</dt>
              <dd>A low-power mesh wireless protocol common in sensors, bulbs and plugs; requires a hub to connect to the internet.</dd>
            </div>
            <div className="glossary-item">
              <dt>Z-Wave</dt>
              <dd>A low-power mesh protocol operating on a sub-GHz band, popular in locks and security sensors; also requires a compatible hub.</dd>
            </div>
            <div className="glossary-item">
              <dt>Thread</dt>
              <dd>A newer, IP-based low-power mesh protocol backed by Apple, Google and Amazon; needs a "border router," often built into a smart speaker.</dd>
            </div>
            <div className="glossary-item">
              <dt>Matter</dt>
              <dd>A shared standard that lets certified devices work across different ecosystems (Google Home, Alexa, Apple Home) without separate setups.</dd>
            </div>
            <div className="glossary-item">
              <dt>Automation</dt>
              <dd>A pre-set rule that runs a set of actions automatically when a trigger condition is met — for example, a motion sensor turning on a light.</dd>
            </div>
            <div className="glossary-item">
              <dt>Geofencing</dt>
              <dd>Using your phone's location to trigger an automation when you enter or leave a defined area around your home.</dd>
            </div>
            <div className="glossary-item">
              <dt>Local Control</dt>
              <dd>When a device or hub processes commands on your home network without needing an internet connection.</dd>
            </div>
            <div className="glossary-item">
              <dt>Cloud Control</dt>
              <dd>When commands are processed on the manufacturer's remote servers — required for remote access and most voice assistant processing.</dd>
            </div>
            <div className="glossary-item">
              <dt>C-Wire (Common Wire)</dt>
              <dd>A continuous-power wire some smart thermostats need; older HVAC systems may not have one, requiring an adapter.</dd>
            </div>
            <div className="glossary-item">
              <dt>Mesh Network</dt>
              <dd>A network where mains-powered devices relay signals for each other, extending range for battery-powered devices like sensors.</dd>
            </div>
            <div className="glossary-item">
              <dt>PIR (Passive Infrared)</dt>
              <dd>The sensing technology most motion sensors use, detecting changes in infrared (heat) radiation caused by movement.</dd>
            </div>
            <div className="glossary-item">
              <dt>Two-Factor Authentication (2FA)</dt>
              <dd>A login security step requiring a second proof of identity (like a code from an app) in addition to your password.</dd>
            </div>
            <div className="glossary-item">
              <dt>Firmware</dt>
              <dd>The built-in software that runs on a device itself, separate from the phone app; updated periodically to fix bugs and security issues.</dd>
            </div>
            <div className="glossary-item">
              <dt>IR (Infrared) Controller</dt>
              <dd>A device that sends infrared signals to control existing appliances like ACs and TVs, mimicking a remote control, without any wiring.</dd>
            </div>
            <div className="glossary-item">
              <dt>VLAN / Network Segmentation</dt>
              <dd>Splitting a home network into separate zones so IoT devices can't directly reach computers or phones if compromised.</dd>
            </div>
            <div className="glossary-item">
              <dt>Guest Network</dt>
              <dd>A separate Wi-Fi network broadcast by many routers, isolated from your main network — useful for visitors and IoT devices alike.</dd>
            </div>
            <div className="glossary-item">
              <dt>CT Clamp (Current Transformer)</dt>
              <dd>A sensor clamped around an electrical wire (without cutting it) to measure current for whole-home energy monitoring.</dd>
            </div>
            <div className="glossary-item">
              <dt>Border Router</dt>
              <dd>A device that connects a Thread mesh network to your regular IP network — many current smart speakers and hubs serve this role.</dd>
            </div>
          </dl>
        </div>
      </section>
      {/* SUPPORT */}
      <section className="section" id="support">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Support</span>
            <h2>Still need help?</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>SmartNest Care</h3>
              <p style={{ fontSize: "0.9rem" }}>Report a problem with a device from your free account and follow every update from the support team on the ticket.</p>
              <Link href="/app/tickets/new" className="btn btn--primary btn--sm">Report a problem</Link>
            </div>
            <div className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M21 21l-4.3-4.3"></path>
                </svg>
              </div>
              <h3>Troubleshooting Center</h3>
              <p style={{ fontSize: "0.9rem" }}>Searchable problem → cause → solution tables for the most common issues — often the fastest fix.</p>
              <Link href="/troubleshooting" className="btn btn--ghost btn--sm">Open troubleshooting</Link>
            </div>
            <div className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="14" rx="2"></rect>
                  <path d="M8 21h8M12 18v3"></path>
                </svg>
              </div>
              <h3>Device Manual</h3>
              <p style={{ fontSize: "0.9rem" }}>Each device guide has its own troubleshooting and FAQ section, plus installation and safety notes.</p>
              <Link href="/devices" className="btn btn--ghost btn--sm">Open the manual</Link>
            </div>
          </div>
          <p className="muted-note text-center">
            SmartNest Care is run by the project team for this demonstration: guidance and troubleshooting, not on-site repairs.
          </p>
        </div>
      </section>
    </>
  );
}
