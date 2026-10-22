import Link from "next/link";
import { Checklist } from "@/components/ui/Checklist";
import { MilestoneTrack } from "@/components/ui/MilestoneTrack";

export const metadata = {
  title: "Installation & Setup Manual",
  description: "A complete step-by-step manual: pre-installation checklist, tools, network requirements, installation steps, pairing, app configuration, testing, verification checklist, safety precautions and common errors.",
};

export default function InstallationPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Installation &amp; Setup Manual</div>
          <span className="eyebrow">Installation Manual</span>
          <h1>Installation &amp; Setup Manual</h1>
          <p className="lead">
            A general-purpose installation process that applies across almost every device category — use this alongside the device-specific steps in the Device Manual. Follow it in order; each stage builds on the one before it.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container with-toc">
          <aside className="toc">
            <div className="toc-title">On this page</div>
            <a href="#prereq">Pre-Installation Checklist</a> <a href="#tools">Required Tools &amp; Equipment</a> <a href="#network-reqs">Network Requirements</a> <a href="#install">Installation Steps</a> <a href="#pairing">Pairing &amp; Connecting</a> <a href="#app-config">App Configuration</a> <a href="#testing">Testing</a> <a href="#verification">Verification Checklist</a> <a href="#safety">Safety Precautions</a> <a href="#errors">Common Installation Errors</a>
          </aside>
          <div>
            <div id="prereq" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 1</span>
              <h2>Pre-Installation Checklist</h2>
              <p>Run through this before opening a single box. Most installation problems trace back to one of these being skipped.</p>
              <Checklist
                items={[
                  { id: "pre-1", label: <>Confirmed the device's protocol (Wi-Fi/Zigbee/Z-Wave/Thread/BLE) is supported by your network or hub</> },
                  { id: "pre-2", label: <>Manufacturer app downloaded and account created ahead of time</> },
                  { id: "pre-3", label: <>Wi-Fi password on hand and confirmed correct</> },
                  { id: "pre-4", label: <>Read the device-specific guide in the Device Manual for this item</> },
                  { id: "pre-5", label: <>Batteries or tools gathered (see Required Tools below)</> },
                  { id: "pre-6", label: <>Installation area cleared and accessible</> },
                ]}
              />
            </div>
            <div id="tools" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 2</span>
              <h2>Required Tools &amp; Equipment</h2>
              <div className="grid grid--2">
                <div className="card">
                  <h3>For any device</h3>
                  <ul>
                    <li>Smartphone with the manufacturer app and a stable internet connection</li>
                    <li>Router admin access (in case Wi-Fi band settings need checking)</li>
                    <li>Batteries, if not included</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>For wired devices (switches, thermostats)</h3>
                  <ul>
                    <li>Screwdriver set (flathead + Phillips)</li>
                    <li>Non-contact voltage tester</li>
                    <li>Wire strippers/connectors</li>
                    <li>Labels or masking tape for marking wires</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>For mounted devices (cameras, sensors, locks)</h3>
                  <ul>
                    <li>Drill and appropriate wall anchors (if not using adhesive)</li>
                    <li>Measuring tape or the manufacturer's install template</li>
                    <li>Alcohol wipes (for adhesive-mounted sensors)</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>For panel-based devices (energy monitors)</h3>
                  <ul>
                    <li>A licensed electrician — required, not optional, for breaker panel work</li>
                    <li>Confirmed panel amperage and phase configuration</li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="network-reqs" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 3</span>
              <h2>Network Requirements</h2>
              <div className="manual-box manual-box--info">
                <strong className="box-label">ℹ Most Common Blocker</strong> Most budget and mid-range smart devices only join <strong>2.4GHz</strong> Wi-Fi networks. If your router broadcasts a combined SSID, you may need to temporarily split it into separate 2.4GHz/5GHz names during setup.
              </div>
              <ul style={{ fontSize: "0.95rem" }}>
                <li><strong>Band:</strong> Confirm 2.4GHz is available and its password is on hand.</li>
                <li>
                  <strong>Signal strength:</strong> Devices installed far from the router (garage, outdoor cameras, basement panels) benefit from a Wi-Fi extender or mesh node before setup, not after troubleshooting begins.
                </li>
                <li>
                  <strong>Router capacity:</strong> Very high device counts (40+) can exceed cheaper routers' connection limits — check your router's specification if adding many devices at once.
                </li>
                <li><strong>Hub/bridge:</strong> If the device uses Zigbee, Z-Wave or Thread, confirm a compatible hub or border router is already online.</li>
                <li>
                  <strong>Bandwidth:</strong> Cameras and video-capable devices need reliable upload bandwidth — test your connection if adding several at once.
                </li>
              </ul>
            </div>
            <div id="install" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 4</span>
              <h2>Installation Steps</h2>
              <div className="steps" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
                <div className="step">
                  <h4>1. Power down if wiring</h4>
                  <p style={{ fontSize: "0.9rem" }}>
                    For any device involving mains wiring (switches, thermostats), cut power at the breaker — not just the wall switch — and confirm with a voltage tester.
                  </p>
                </div>
                <div className="step">
                  <h4>2. Mount or place the device</h4>
                  <p style={{ fontSize: "0.9rem" }}>Follow the manufacturer's physical installation guide — screws, adhesive, or wiring terminals, as applicable.</p>
                </div>
                <div className="step">
                  <h4>3. Power on and check indicators</h4>
                  <p style={{ fontSize: "0.9rem" }}>
                    Restore power/insert batteries and confirm the status LED shows the expected pairing-ready pattern (usually a specific blink rate — check the manual).
                  </p>
                </div>
                <div className="step">
                  <h4>4. Add device in app</h4>
                  <p style={{ fontSize: "0.9rem" }}>Open the manufacturer app (or hub app), choose "Add Device," and select the matching device type/model.</p>
                </div>
                <div className="step">
                  <h4>5. Complete pairing</h4>
                  <p style={{ fontSize: "0.9rem" }}>Follow the in-app pairing flow — see the Pairing section below for what to expect by connection type.</p>
                </div>
                <div className="step">
                  <h4>6. Configure &amp; test</h4>
                  <p style={{ fontSize: "0.9rem" }}>Rename the device, assign it to a room, and run the full range of its functions before considering setup complete.</p>
                </div>
              </div>
            </div>
            <div id="pairing" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 5</span>
              <h2>Pairing &amp; Connecting Devices</h2>
              <div className="table-wrap">
                <table className="compare">
                  <thead>
                    <tr>
                      <th>Connection Type</th>
                      <th>Typical Pairing Trigger</th>
                      <th>What to Watch For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wi-Fi (direct)</td>
                      <td>Hold reset button 5–8 sec until LED blinks rapidly</td>
                      <td>Must join a 2.4GHz network; some devices create a temporary setup hotspot your phone joins first</td>
                    </tr>
                    <tr>
                      <td>Bluetooth</td>
                      <td>Press pairing button; device appears in phone's Bluetooth or app scan</td>
                      <td>Stay within 1–2 meters during initial pairing; disable other nearby Bluetooth devices if pairing fails</td>
                    </tr>
                    <tr>
                      <td>Zigbee</td>
                      <td>"Add Device" in hub app, then trigger device's join mode</td>
                      <td>Device must be within hub's mesh range during first pairing; move closer if it fails once, then relocate after joining</td>
                    </tr>
                    <tr>
                      <td>Z-Wave</td>
                      <td>"Include Device" mode on hub, then press the device's action button</td>
                      <td>Some Z-Wave devices must be within a few meters of the hub for first inclusion</td>
                    </tr>
                    <tr>
                      <td>Thread</td>
                      <td>Scan QR/setup code via ecosystem app (Google Home, Apple Home)</td>
                      <td>At least one Thread border router (often a smart speaker or hub) must already be active on the network</td>
                    </tr>
                    <tr>
                      <td>Matter</td>
                      <td>Scan the Matter QR/setup code, choose the ecosystem to commission it to</td>
                      <td>Can typically be shared across multiple ecosystems after initial commissioning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="app-config" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 6</span>
              <h2>App Configuration</h2>
              <ol style={{ fontSize: "0.95rem" }}>
                <li><strong>Rename clearly:</strong> Use a short, room-based name ("Living Room Lamp") so voice commands and automations are easy to target.</li>
                <li>
                  <strong>Create device groups:</strong> Group devices by room so voice commands ("turn off bedroom lights") and automations target the right set.
                </li>
                <li>
                  <strong>Link ecosystems:</strong> If using Google Home, Alexa or Apple Home, link the manufacturer's account from within that ecosystem's app — usually under "Works with..." or "Add Device → Works with [Ecosystem]."
                </li>
                <li>
                  <strong>Set device-specific preferences:</strong> Notification sensitivity, restore-state behavior, auto-lock delay, and similar settings should be configured immediately after pairing, while you remember the context.
                </li>
                <li><strong>Enable automatic firmware updates</strong> where the app offers the option.</li>
              </ol>
            </div>
            <div id="testing" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 7</span>
              <h2>Testing</h2>
              <div className="card">
                <ul>
                  <li>
                    <strong>Function test:</strong> Trigger every core function manually (on/off, lock/unlock, motion detection) at least 3–5 times to rule out a marginal connection.
                  </li>
                  <li>
                    <strong>Range test:</strong> Walk to the edges of your home and confirm the device still responds, especially for door sensors, locks and outdoor cameras.
                  </li>
                  <li>
                    <strong>Voice test:</strong> If linked to a voice assistant, test both direct commands ("turn on kitchen light") and any custom routines that include the device.
                  </li>
                  <li>
                    <strong>Power-loss test:</strong> Briefly cut power (where safe to do so) and confirm the device reconnects automatically and restores to an expected state.
                  </li>
                  <li>
                    <strong>Notification test:</strong> Confirm alerts (motion, door open, low battery) actually arrive on your phone, not just appear in the app when opened.
                  </li>
                </ul>
              </div>
            </div>
            <div id="verification" style={{ marginBottom: "56px" }}>
              <span className="subhead">Stage 8</span>
              <h2>Verification Checklist</h2>
              <p>Click each milestone as you complete it. Your progress is saved automatically in this browser.</p>
              <div className="card">
                <MilestoneTrack trackId="install-verify" steps={["Network Ready", "Device Installed", "Device Paired", "Automation Tested"]} />
                <p className="hint text-center mb-0">Network Ready → Device Installed → Device Paired → Automation Tested</p>
              </div>
            </div>
            <div id="safety" style={{ marginBottom: "56px" }}>
              <span className="subhead">Non-Negotiable</span>
              <h2>Safety Precautions</h2>
              <div className="manual-box manual-box--warning">
                <strong className="box-label">⚠ Electrical Work</strong> Always cut power at the breaker — not just the switch — before working on any wired device (switches, thermostats, panel-based energy monitors). If you're not confident identifying wiring, hire a licensed electrician; smart home retrofits are not the place to learn electrical work.
              </div>
              <div className="manual-box manual-box--note">
                <strong className="box-label">⚠ Account Security</strong> Use a unique, strong password for each manufacturer account, and enable two-factor authentication where offered — see the Security &amp; Privacy page for the full checklist.
              </div>
              <div className="manual-box manual-box--info">
                <strong className="box-label">ℹ Physical Fallback</strong> For locks especially, never remove or disable a physical backup method (key, manual override) until you've confirmed the smart method works reliably over at least a few days of normal use.
              </div>
            </div>
            <div id="errors" style={{ marginBottom: "20px" }}>
              <span className="subhead">Learn From Others' Mistakes</span>
              <h2>Common Installation Errors</h2>
              <div className="table-wrap">
                <table className="compare pcs">
                  <thead>
                    <tr>
                      <th>Error</th>
                      <th>Why It Happens</th>
                      <th>How to Avoid It</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Device won't join Wi-Fi</td>
                      <td>Trying to connect to a 5GHz-only network</td>
                      <td>Confirm your router broadcasts a 2.4GHz band and use that during setup</td>
                    </tr>
                    <tr>
                      <td>Smart switch installed with no neutral wire</td>
                      <td>Wall box wiring wasn't checked before purchase</td>
                      <td>Verify neutral wire presence using the Device Manual's checklist before buying</td>
                    </tr>
                    <tr>
                      <td>Zigbee device fails to join hub</td>
                      <td>Device too far from hub during first pairing</td>
                      <td>Pair within 1–2 meters of the hub, then relocate once joined</td>
                    </tr>
                    <tr>
                      <td>Automation doesn't run after setup</td>
                      <td>Device renamed after the automation was created</td>
                      <td>Re-save automations after renaming any involved device</td>
                    </tr>
                    <tr>
                      <td>Camera/sensor placed then immediately returned</td>
                      <td>Field of view or range wasn't checked before mounting</td>
                      <td>Test placement with the app's live preview before final mounting</td>
                    </tr>
                    <tr>
                      <td>Thermostat installed then found incompatible</td>
                      <td>C-wire presence wasn't confirmed beforehand</td>
                      <td>Check for a C-wire (or budget an adapter) before buying a wired thermostat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: "30px", textAlign: "center" }}><Link href="/automation" className="btn btn--primary">Continue to the Automation Guide</Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
