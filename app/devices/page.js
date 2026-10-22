import Link from "next/link";
import { CategoryTab, DeviceFilterProvider, DeviceGuide, DeviceSearchInput, GuideLaunchCard } from "@/components/devices/DeviceFilter";
import { Checklist } from "@/components/ui/Checklist";
import { AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/Accordion";

export const metadata = {
  title: "Device Manual",
  description: "Complete technical guides for smart bulbs, plugs, locks, cameras, door/window sensors, motion sensors, speakers, thermostats and energy monitors.",
};

export default function DevicesPage() {
  return (
    <DeviceFilterProvider>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Device Manual</div>
          <span className="eyebrow">Device Manual</span>
          <h1>Smart Device Manual</h1>
          <p className="lead">
            Nine device categories, documented like real manuals: overview, purpose, how it works, types, key features, requirements, compatibility, specifications, before-you-start checklist, installation, configuration, usage, automation examples, safety, maintenance, troubleshooting and FAQ. Click a category to open its complete technical guide.
          </p>
          <div className="search-box" style={{ marginTop: "24px" }}>
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M21 21l-4.3-4.3"></path>
              </svg>
            </span>
            {" "}
            <DeviceSearchInput placeholder="Search devices or terms (e.g. lock, Matter, installation)..." />
          </div>
        </div>
      </section>
      <section className="section--tight">
        <div className="container">
          <div className="tab-bar" id="categoryTabs">
            <CategoryTab filter="all">All Devices</CategoryTab> <CategoryTab filter="lighting">Lighting</CategoryTab> <CategoryTab filter="plugs">Plugs</CategoryTab> <CategoryTab filter="security">Security</CategoryTab> <CategoryTab filter="climate">Climate</CategoryTab> <CategoryTab filter="convenience">Convenience</CategoryTab> <CategoryTab filter="energy">Energy</CategoryTab>
          </div>
          <div className="grid grid--3" id="deviceLauncherGrid" style={{ marginBottom: "10px" }}>
            <GuideLaunchCard category="lighting" target="guide-bulbs">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2"></path>
                </svg>
              </div>
              <h3 className="mb-0">Smart Bulbs &amp; Switches</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Wi-Fi / Zigbee lighting control</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="plugs" target="guide-plugs">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="7" y="2" width="10" height="7" rx="1"></rect>
                  <path d="M9 9v4a3 3 0 0 0 6 0V9M12 16v6"></path>
                </svg>
              </div>
              <h3 className="mb-0">Smart Plugs</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Remote control for any appliance</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="security" target="guide-locks">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="mb-0">Smart Locks</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Keyless entry &amp; access logs</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="security" target="guide-cameras">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8a2 2 0 0 1 2-2h3l2-2h4l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>
                  <circle cx="12" cy="13" r="3.5"></circle>
                </svg>
              </div>
              <h3 className="mb-0">Security Cameras</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Live view, alerts &amp; recording</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="security" target="guide-doorsensors">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="7" height="16" rx="1"></rect>
                  <rect x="14" y="4" width="7" height="16" rx="1"></rect>
                </svg>
              </div>
              <h3 className="mb-0">Door / Window Sensors</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Open/close state detection</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="security" target="guide-motion">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"></path>
                </svg>
              </div>
              <h3 className="mb-0">Motion Sensors</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Occupancy &amp; PIR detection</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="convenience" target="guide-speakers">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="2" width="6" height="12" rx="3"></rect>
                  <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M9 22h6"></path>
                </svg>
              </div>
              <h3 className="mb-0">Smart Speakers</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Voice control &amp; hub function</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="climate" target="guide-thermostat">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 15a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.5A4 4 0 0 1 21 14a4 4 0 0 1-4 4H7a4 4 0 0 1-4-3z"></path>
                </svg>
              </div>
              <h3 className="mb-0">Thermostats / Climate</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Scheduling &amp; AC control</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
            {" "}
            <GuideLaunchCard category="energy" target="guide-energy">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"></path>
                </svg>
              </div>
              <h3 className="mb-0">Energy Monitoring</h3>
              <p style={{ fontSize: "0.85rem", margin: "0" }}>Track &amp; reduce consumption</p>
              <span className="goto">View Full Technical Guide →</span>
            </GuideLaunchCard>
          </div>
        </div>
      </section>
      {/* COMPARISON TABLE */}
      <section className="section--tight">
        <div className="container">
          <div className="flex-between flex-wrap gap-10" style={{ marginBottom: "16px" }}>
            <h2 className="mb-0">Quick Comparison</h2>
            <Link href="/compare" className="btn btn--ghost btn--sm">Open Full Comparison Tool →</Link>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Connectivity</th>
                  <th>Hub Required</th>
                  <th>Install Difficulty</th>
                  <th>Main Use</th>
                  <th>Automation Capability</th>
                  <th>Approx. Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Smart Bulb / Switch</td>
                  <td>Wi-Fi or Zigbee</td>
                  <td className="no">Depends</td>
                  <td>Easy</td>
                  <td>Lighting control</td>
                  <td>High</td>
                  <td>₹500 – ₹2,500</td>
                </tr>
                <tr>
                  <td>Smart Plug</td>
                  <td>Wi-Fi</td>
                  <td className="no">No</td>
                  <td>Easy</td>
                  <td>Appliance control</td>
                  <td>High</td>
                  <td>₹700 – ₹1,800</td>
                </tr>
                <tr>
                  <td>Smart Lock</td>
                  <td>Bluetooth / Wi-Fi</td>
                  <td className="no">Optional</td>
                  <td>Moderate</td>
                  <td>Keyless entry</td>
                  <td>Medium</td>
                  <td>₹6,000 – ₹25,000</td>
                </tr>
                <tr>
                  <td>Security Camera</td>
                  <td>Wi-Fi</td>
                  <td className="no">No</td>
                  <td>Easy–Moderate</td>
                  <td>Surveillance</td>
                  <td>Medium</td>
                  <td>₹1,800 – ₹8,000</td>
                </tr>
                <tr>
                  <td>Door/Window Sensor</td>
                  <td>Zigbee / Wi-Fi</td>
                  <td className="yes">Often</td>
                  <td>Easy</td>
                  <td>Entry detection</td>
                  <td>High</td>
                  <td>₹800 – ₹2,000</td>
                </tr>
                <tr>
                  <td>Motion Sensor</td>
                  <td>Zigbee / Wi-Fi</td>
                  <td className="yes">Often</td>
                  <td>Easy</td>
                  <td>Occupancy detection</td>
                  <td>High</td>
                  <td>₹900 – ₹2,200</td>
                </tr>
                <tr>
                  <td>Smart Speaker</td>
                  <td>Wi-Fi + Bluetooth</td>
                  <td className="no">No</td>
                  <td>Easy</td>
                  <td>Voice control / hub</td>
                  <td>High</td>
                  <td>₹2,500 – ₹12,000</td>
                </tr>
                <tr>
                  <td>Smart Thermostat / AC Controller</td>
                  <td>Wi-Fi</td>
                  <td className="no">No</td>
                  <td>Moderate–Hard</td>
                  <td>Climate control</td>
                  <td>Medium</td>
                  <td>₹2,500 – ₹22,000</td>
                </tr>
                <tr>
                  <td>Energy Monitor</td>
                  <td>Wi-Fi / Zigbee</td>
                  <td className="no">Depends</td>
                  <td>Moderate–Hard</td>
                  <td>Power tracking</td>
                  <td>Low–Medium</td>
                  <td>₹1,400 – ₹9,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" id="deviceGuides">
          {/* ============ 1. SMART BULBS & SWITCHES ============ */}
          <DeviceGuide id="guide-bulbs" category="lighting" name="Smart Bulbs and Switches">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Smart Bulbs &amp; Switches</h2>
                <div className="tag-row"><span className="tag tag--primary">Lighting</span><span className="tag">Wi-Fi / Zigbee</span><span className="tag">Beginner-friendly</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Smart bulbs replace a standard bulb and add wireless dimming, color control and scheduling. Smart switches replace the wall switch itself, controlling whatever fixture is already wired to it — including fixtures that can't take a smart bulb, like ceiling fans with lights or multi-bulb fixtures.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To control brightness, color temperature (and sometimes full color) and on/off state remotely, on a schedule, or as part of automations — without rewiring the fixture. Typical use cases: replacing manual wall dimmers, syncing lighting to a daily schedule, and enabling "scene" lighting for specific activities (reading, movies, parties).
            </p>
            <span className="subhead">How It Works</span>
            <p>
              A driver circuit inside the bulb (or a relay/dimmer module inside the switch) receives digital commands over Wi-Fi or Zigbee and translates them into an analog dimming signal or an on/off relay state. The bulb or switch maintains a persistent network connection so it can respond to app, voice, or automation commands within roughly 100–500 milliseconds.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>White-only bulbs</strong> — on/off and dimming only, cheapest option, good for utility spaces</li>
              <li><strong>Tunable white bulbs</strong> — adjustable color temperature (2700K–6500K) for matching daylight or warm evening tones</li>
              <li><strong>Full-color (RGB+W) bulbs</strong> — millions of colors, used for accent/mood lighting and scenes</li>
              <li><strong>Smart switches (single-pole)</strong> — replace a standard wall switch controlling one fixture</li>
              <li>
                <strong>Smart switches (3-way/multi-way)</strong> — for fixtures controlled from two or more physical switches, requiring a companion/add-on switch
              </li>
              <li><strong>Smart dimmer switches</strong> — add dimming capability to fixtures with regular (non-smart) bulbs already installed</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Dimming from 1–100%, often with smooth transition/fade</li>
                  <li>Tunable white (2700K–6500K) or full RGB color on higher-end models</li>
                  <li>Scheduling, sunrise/sunset triggers, and scene presets</li>
                  <li>Group control — multiple bulbs treated as one "room" light</li>
                  <li>Switches additionally support a physical toggle that still works without the app</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Smart bulb(s) or smart switch matched to your fixture type</li>
                  <li>2.4GHz Wi-Fi network, or a Zigbee hub if buying Zigbee bulbs</li>
                  <li>Manufacturer app (and optionally Google Home / Alexa / Apple Home)</li>
                  <li>For switches: screwdriver, voltage tester, wire connectors</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Most Wi-Fi bulbs work directly with Google Home, Alexa and Apple Home via manufacturer skill/integration. Zigbee bulbs need a compatible hub — check the hub's supported device list before buying, as not every Zigbee bulb pairs with every Zigbee hub. Matter-certified bulbs can be added to multiple ecosystems without separate setup.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Socket type</span><span className="v">E27 / B22 (bulbs)</span></li>
                  <li><span className="k">Wattage equivalent</span><span className="v">7.5–9.5W (60–75W equiv.)</span></li>
                  <li><span className="k">Color temperature range</span><span className="v">2700K – 6500K</span></li>
                  <li><span className="k">Lumens</span><span className="v">750 – 1,050 lm</span></li>
                  <li><span className="k">Switch load rating</span><span className="v">Up to 800W resistive</span></li>
                  <li><span className="k">Wireless standard</span><span className="v">802.11 b/g/n 2.4GHz or Zigbee 3.0</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "bulb-c1", label: <>Confirmed 2.4GHz Wi-Fi (or Zigbee hub) is available</> },
                    { id: "bulb-c2", label: <>Manufacturer app downloaded and account created</> },
                    { id: "bulb-c3", label: <>For switches: confirmed a neutral wire is present in the wall box</> },
                    { id: "bulb-c4", label: <>Power turned off at the breaker (switches only)</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Turn off power at the switch (for smart switches, also at the breaker) before beginning any wiring work.</li>
              <li>
                <strong>Bulbs:</strong> screw in like a normal bulb and turn the wall switch on and leave it on — smart bulbs need continuous mains power to stay connected. <strong>Switches:</strong> identify line, load, neutral and ground wires using the included wiring diagram; a non-contact voltage tester confirms the circuit is dead before touching wires.
              </li>
              <li>Connect wires to the matching terminals on the smart switch and secure it back into the wall box.</li>
              <li>Restore power and confirm the device's status LED lights up.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Open the manufacturer app, create an account, and choose "Add Device."</li>
              <li>Put the device into pairing mode (usually rapid on-off cycling for bulbs, or a reset button for switches).</li>
              <li>Connect the device to your 2.4GHz Wi-Fi network by entering your Wi-Fi password in the app, or add it via a Zigbee hub's "Add Device" flow.</li>
              <li>Rename the device by room ("Living Room Ceiling") so voice commands and automations are easy to target.</li>
              <li>Link the manufacturer app to Google Home / Alexa / Apple Home if you want cross-ecosystem voice control.</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Safety Precaution</strong> Never install a smart switch without confirming a neutral wire is present in the box — improvising a neutral connection is a fire risk. Always cut power at the breaker, not just the switch, before wiring work. If in doubt, hire a licensed electrician.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Control individually or as a group ("turn off bedroom lights")</li>
                  <li>Create scenes (e.g., "Movie Night" dims to 20% warm white)</li>
                  <li>Set schedules or sunrise/sunset-based automation</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Motion sensor triggers hallway light at 20% between 11 PM–6 AM</li>
                  <li>Sunset triggers porch light on automatically</li>
                  <li>"Good Night" voice command fades all lights off over 30 seconds</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Keep firmware updated via the app for security and stability patches</li>
              <li>Dust light fixtures periodically — heat buildup can shorten a smart bulb's lifespan</li>
              <li>If a bulb drops offline repeatedly, check that the wall switch feeding it is never turned off</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bulb won't pair</td>
                    <td>Connected to 5GHz network</td>
                    <td>Switch phone/router to broadcast a 2.4GHz network and retry pairing</td>
                  </tr>
                  <tr>
                    <td>Switch clicks but light doesn't respond</td>
                    <td>Weak Wi-Fi signal at switch location</td>
                    <td>Add a Wi-Fi extender or mesh node near the switch</td>
                  </tr>
                  <tr>
                    <td>Color/brightness resets after power cut</td>
                    <td>"Restore last state" disabled</td>
                    <td>Enable restore-state option in app settings</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Can I use a smart bulb in a fixture controlled by a regular wall switch?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Yes, but the wall switch must be left in the "on" position at all times — turning it off cuts power to the bulb entirely, disconnecting it from Wi-Fi.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Do I need a neutral wire for a smart switch?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Most smart switches require one for continuous power. A small number of "no-neutral" models exist but have more limitations — check the box specifically before buying if your wiring lacks one.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 2. SMART PLUGS ============ */}
          <DeviceGuide id="guide-plugs" category="plugs" name="Smart Plugs">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="7" y="2" width="10" height="7" rx="1"></rect>
                  <path d="M9 9v4a3 3 0 0 0 6 0V9M12 16v6"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Smart Plugs</h2>
                <div className="tag-row"><span className="tag tag--primary">Plugs</span><span className="tag">Wi-Fi</span><span className="tag">Beginner-friendly</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              A smart plug sits between a wall outlet and any existing appliance, adding remote on/off control, scheduling, and — on some models — power/energy monitoring, without modifying the appliance itself.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To make any "dumb" plug-in appliance (fans, lamps, humidifiers, coffee makers, decorative lighting) remotely controllable and schedulable. Common uses include simulating occupancy while away, automatically switching off fans/heaters, and tracking how much a specific appliance costs to run.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              Inside the plug, a relay switches mains power to the output socket on command. Energy-monitoring versions add a current-sensing chip that measures live wattage as it passes through, which the app converts into a running energy total.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Basic Wi-Fi plugs</strong> — single relay, on/off and scheduling only, no energy data</li>
              <li><strong>Energy-monitoring plugs</strong> — add live wattage and cumulative kWh tracking per appliance</li>
              <li><strong>Multi-outlet / power-strip plugs</strong> — several independently controllable sockets in one unit</li>
              <li><strong>Outdoor-rated plugs</strong> — weatherproof housing for garden lights, pumps, or holiday lighting</li>
              <li><strong>Mini/compact plugs</strong> — low-profile design that doesn't block the adjacent socket</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Remote on/off via app or voice assistant</li>
                  <li>Scheduling and countdown timers</li>
                  <li>Some models report real-time wattage and cumulative energy use</li>
                  <li>Away/vacation mode — randomizes on/off to simulate occupancy</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Smart plug rated for your appliance's wattage</li>
                  <li>2.4GHz Wi-Fi network</li>
                  <li>Manufacturer app</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Wi-Fi smart plugs generally work with Google Home, Alexa and most automation platforms directly — no hub needed. Confirm the plug is rated for your appliance's wattage; high-draw appliances like heaters or motors need a plug rated 15A+, and confirm the physical socket type matches your region (Type D/M in India).
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Max load</span><span className="v">10A – 16A</span></li>
                  <li><span className="k">Standby power draw</span><span className="v">&lt;1W</span></li>
                  <li><span className="k">Wireless standard</span><span className="v">802.11 b/g/n 2.4GHz</span></li>
                  <li><span className="k">Monitoring accuracy</span><span className="v">±2–3% (energy-monitoring models)</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "plug-c1", label: <>Checked appliance wattage against plug's max load rating</> },
                    { id: "plug-c2", label: <>Confirmed 2.4GHz Wi-Fi is available near the outlet</> },
                    { id: "plug-c3", label: <>Manufacturer app installed and account created</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Plug the smart plug directly into the wall outlet (avoid daisy-chaining through extension boards where possible).</li>
              <li>Plug your appliance into the smart plug's output socket.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Download the manufacturer app and create an account.</li>
              <li>Hold the plug's reset button (usually 5–8 seconds) until the indicator LED blinks rapidly, signaling pairing mode.</li>
              <li>In the app, select "Add Device" and connect it to your 2.4GHz Wi-Fi network.</li>
              <li>Rename it clearly (e.g., "Study Lamp") and assign it to a room.</li>
              <li>Test on/off from the app before relying on automations.</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Safety Precaution</strong> Never use a smart plug with heaters, irons or other high-heat appliances unless the plug is explicitly rated for that wattage — overloading a plug is a fire hazard. Don't leave unattended heat-producing appliances on smart schedules.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Turn appliances on/off remotely or by voice</li>
                  <li>Schedule things like lamps or fans for specific times</li>
                  <li>Use energy-monitoring plugs to identify power-hungry appliances</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Motion sensor turns on a fan when a room becomes occupied</li>
                  <li>"Leaving Home" routine turns off all non-essential plugs</li>
                  <li>Energy monitor alert if a plug draws power above a set threshold overnight</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Periodically check the plug and outlet for discoloration or warmth, which can indicate overload</li>
              <li>Keep firmware updated for security patches</li>
              <li>Avoid plugging a smart plug into another smart plug or a low-quality extension board</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Plug shows "offline"</td>
                    <td>Wi-Fi connection dropped</td>
                    <td>Power-cycle by unplugging for 10 seconds; confirm 2.4GHz band</td>
                  </tr>
                  <tr>
                    <td>Schedule didn't trigger</td>
                    <td>Wrong timezone set in app</td>
                    <td>Verify the plug's assigned timezone matches your actual timezone</td>
                  </tr>
                  <tr>
                    <td>Energy readings look wrong</td>
                    <td>Not yet calibrated</td>
                    <td>Allow 24–48 hours of use, or update firmware</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Can I use a smart plug outdoors?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Only if it's specifically rated for outdoor/weatherproof use (typically IP44 or higher). A standard indoor smart plug should never be exposed to rain or moisture.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Will a smart plug work during a power outage?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    No — smart plugs have no battery backup. When power returns, most plugs restore to their last state or a configured default, which can be set in the app.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 3. SMART LOCKS ============ */}
          <DeviceGuide id="guide-locks" category="security" name="Smart Locks">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Smart Locks</h2>
                <div className="tag-row"><span className="tag tag--accent">Security</span><span className="tag">Bluetooth / Wi-Fi</span><span className="tag">Moderate setup</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Smart locks replace or retrofit onto an existing deadbolt, adding keyless entry via PIN code, phone app, fingerprint, or auto-unlock based on proximity — while usually retaining a physical key as backup.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To provide keyless, auditable, and remotely manageable entry — including temporary access codes for guests or service staff, and logs of who unlocked the door and when. Common use cases: giving cleaners or delivery staff time-limited access, auto-locking after everyone leaves, and eliminating lost-key lockouts.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              A motor inside the lock body turns the deadbolt spindle on command from the internal controller, which authenticates the request first — a correct PIN entered on the keypad, a Bluetooth handshake with an authorized phone, a matched fingerprint, or an app command relayed through a Wi-Fi bridge.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Retrofit deadbolt locks</strong> — replace only the interior thumb-turn, keeping the existing exterior keyway as backup</li>
              <li><strong>Full replacement smart locks</strong> — replace the entire lock body, often keypad- or fingerprint-only</li>
              <li><strong>Bluetooth-only locks</strong> — auto-lock/unlock by phone proximity, no remote/away access without a bridge</li>
              <li><strong>Wi-Fi / bridge-connected locks</strong> — support remote locking and guest codes from anywhere</li>
              <li><strong>Biometric (fingerprint) locks</strong> — add fingerprint recognition as an unlock method alongside PIN/app</li>
              <li><strong>Lever-handle smart locks</strong> — for interior doors or markets where lever handles are standard rather than deadbolts</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>PIN keypad, phone app, fingerprint, or key fob unlock methods</li>
                  <li>Auto-lock after a set delay when the door closes</li>
                  <li>Guest/temporary access codes with expiry dates</li>
                  <li>Entry/exit activity log with timestamps</li>
                  <li>Auto-unlock on approach (geofencing) where supported</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Smart deadbolt matched to your door's backset and thickness</li>
                  <li>4x AA batteries (typically included)</li>
                  <li>Optional Wi-Fi bridge for remote access</li>
                  <li>Screwdriver (usually the only tool needed)</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Check your door's deadbolt backset and thickness against the manufacturer's spec sheet before buying — not all smart locks fit all door preparations. A separate Wi-Fi bridge/hub is usually required if you want to lock/unlock or view logs while away from home.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Backset</span><span className="v">60mm / 70mm adjustable</span></li>
                  <li><span className="k">Power</span><span className="v">4x AA, 6–12 month life</span></li>
                  <li><span className="k">Connectivity</span><span className="v">Bluetooth 5.0; Wi-Fi via bridge</span></li>
                  <li><span className="k">User codes supported</span><span className="v">20–200 depending on model</span></li>
                  <li><span className="k">Weather rating (outward-facing units)</span><span className="v">IP65</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "lock-c1", label: <>Measured door thickness and backset against spec sheet</> },
                    { id: "lock-c2", label: <>Batteries on hand</> },
                    { id: "lock-c3", label: <>Manufacturer app installed</> },
                    { id: "lock-c4", label: <>Physical backup key tested and accessible</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Remove the existing deadbolt, keeping the strike plate on the door frame if compatible (check manufacturer notes).</li>
              <li>Install the new smart deadbolt body on the interior and exterior sides per the included template, aligning the spindle correctly.</li>
              <li>Insert batteries and confirm the motor turns smoothly through a full lock/unlock cycle before closing the door.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Download the manufacturer app, create an account, and pair via Bluetooth (usually a button press on the interior unit).</li>
              <li>Set your master PIN and enroll fingerprints if supported.</li>
              <li>Add the optional Wi-Fi bridge for remote access and connect it to your 2.4GHz network.</li>
              <li>Test lock/unlock from the app and physically from both sides of the door at least 10 times before relying on it daily.</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Safety Precaution</strong> Always keep a physical backup key accessible and test it works — a dead battery should never lock you out. Never share your master PIN; issue separate guest codes instead so access can be revoked individually.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Issue one-time or date-limited codes to guests, cleaners or delivery staff</li>
                  <li>Enable auto-lock 30–60 seconds after the door closes</li>
                  <li>Review the access log periodically from the app</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Door unlocks automatically when your phone's geofence and a door sensor both confirm arrival</li>
                  <li>"Good Night" routine engages the lock if it's still unlocked at 11 PM</li>
                  <li>An unlock event outside "Away" mode's expected hours sends a push alert</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Replace batteries proactively when the app shows "low battery," not after it fails</li>
              <li>Lubricate the deadbolt mechanism annually with a dry lock lubricant, never oil-based</li>
              <li>Delete unused guest codes regularly</li>
              <li>Keep firmware updated — locks are a high-value target for security patches</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lock won't turn / feels stuck</td>
                    <td>Door frame misalignment</td>
                    <td>Loosen and readjust the strike plate; check door isn't warped</td>
                  </tr>
                  <tr>
                    <td>App shows lock as "unresponsive"</td>
                    <td>Bridge too far or interference</td>
                    <td>Move the Wi-Fi bridge closer; check for Bluetooth interference</td>
                  </tr>
                  <tr>
                    <td>PIN code stops working</td>
                    <td>Codes out of sync after firmware update</td>
                    <td>Re-sync codes from the app; re-enroll if necessary</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>What happens if the batteries die completely?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Most smart locks include an external emergency power contact (often a 9V terminal) to jump-start the lock temporarily, plus a physical key override. Test both before you rely on the lock daily.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Can someone pick or bump a smart lock like a normal one?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    The physical cylinder is still a standard pin-tumbler mechanism in most models, so it carries the same physical vulnerabilities as any deadbolt. Choose a lock with an anti-pick, anti-bump cylinder rating if this is a priority.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 4. SECURITY CAMERAS ============ */}
          <DeviceGuide id="guide-cameras" category="security" name="Security Cameras">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8a2 2 0 0 1 2-2h3l2-2h4l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>
                  <circle cx="12" cy="13" r="3.5"></circle>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Security Cameras</h2>
                <div className="tag-row"><span className="tag tag--accent">Security</span><span className="tag">Wi-Fi</span><span className="tag">Easy–Moderate</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Smart security cameras stream and record video, detect motion or people, and send alerts to your phone — indoors or outdoors, wired or battery-powered.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To monitor entry points and rooms in real time, record evidence of events, and alert you to motion, sound, or specific triggers like package detection. Common uses: watching the front door, checking in on pets, and deterring package theft.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              An image sensor continuously captures video, which onboard software analyzes for motion or shape changes (using basic pixel-difference detection or, on higher-end models, on-device AI person/vehicle detection). A qualifying event triggers a short recording clip and a push notification, while the live feed streams to the app over Wi-Fi on request.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Indoor cameras</strong> — compact, plugged in, not weatherproof; for monitoring rooms and entryways from inside</li>
              <li><strong>Outdoor/weatherproof cameras</strong> — sealed housing (IP65+), wider temperature tolerance, often with spotlight/siren</li>
              <li><strong>Battery-powered wireless cameras</strong> — no wiring needed, but require periodic recharging (weeks to months per charge)</li>
              <li><strong>Wired/PoE cameras</strong> — continuous power and often continuous recording, common for permanent installations</li>
              <li><strong>Video doorbell cameras</strong> — combine a camera with a doorbell button, wide-angle view down toward the doorstep</li>
              <li><strong>Pan-tilt-zoom (PTZ) cameras</strong> — can be remotely aimed to cover a wider area than a fixed lens</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Live view and two-way audio via app</li>
                  <li>Motion/person/vehicle detection with push alerts</li>
                  <li>Local (microSD) or cloud recording, or both</li>
                  <li>Night vision (usually infrared, some with color low-light)</li>
                  <li>Privacy shutter or zone masking on higher-end models</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Camera unit + mounting bracket/screws</li>
                  <li>2.4GHz Wi-Fi with adequate upload bandwidth</li>
                  <li>microSD card (if using local storage) or a cloud plan</li>
                  <li>Mains power or fully charged battery</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Check whether the camera supports local storage without a subscription — some brands lock recording entirely behind a monthly cloud plan. Outdoor cameras need an IP65 or higher weather rating. Verify voice assistant integration if you want to view the feed on a smart display by voice command.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Resolution</span><span className="v">1080p – 4K</span></li>
                  <li><span className="k">Field of view</span><span className="v">110° – 160°</span></li>
                  <li><span className="k">Night vision range</span><span className="v">7 – 12 meters (IR)</span></li>
                  <li><span className="k">Local storage</span><span className="v">microSD up to 256GB (model dependent)</span></li>
                  <li><span className="k">Weather rating (outdoor)</span><span className="v">IP65 / IP66</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "cam-c1", label: <>Chosen a mounting spot with a clear, appropriate field of view</> },
                    { id: "cam-c2", label: <>Confirmed Wi-Fi signal strength at that location</> },
                    { id: "cam-c3", label: <>microSD card or cloud plan decided and ready</> },
                    { id: "cam-c4", label: <>Checked view doesn't capture neighboring windows/public paths</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Choose a mounting location with a clear field of view, avoiding pointing directly at bright light sources or neighboring private property.</li>
              <li>Mount using the included bracket and screws (or magnetic base for indoor units); ensure it's within Wi-Fi range of your router.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Download the manufacturer app, create an account, and scan the camera's QR code to begin pairing.</li>
              <li>Connect to your 2.4GHz Wi-Fi network by entering credentials in the app.</li>
              <li>Set motion detection zones to exclude public streets, sidewalks or neighbors' windows where required by local privacy norms.</li>
              <li>Configure alert sensitivity and notification schedule (e.g., only alert when away from home).</li>
              <li>Insert a microSD card if using local storage, and format it from within the app.</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Privacy &amp; Safety Precaution</strong> Avoid pointing cameras at neighboring windows or shared spaces. Disclose indoor cameras to household members and guests, and never place a camera in a bathroom or bedroom.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>View live feed and recorded clips from the app</li>
                  <li>Use two-way audio to speak to visitors or deter intruders</li>
                  <li>Set "Home/Away" modes to reduce false alerts while you're home</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Camera detects motion while "Away" → porch light turns on and a clip is sent</li>
                  <li>Door sensor opens → nearest camera starts recording automatically</li>
                  <li>Person detected at the front door after 10 PM → smart speaker chime alert</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Clean the lens periodically — dust and cobwebs are a common cause of blurry night footage</li>
              <li>Check battery-powered units monthly; recharge before they hit 10%</li>
              <li>Update firmware promptly — cameras are a common target for security vulnerabilities</li>
              <li>Review and change the default admin password immediately after setup</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frequent false motion alerts</td>
                    <td>Detection zone too wide/sensitive</td>
                    <td>Narrow the zone and lower sensitivity; exclude moving foliage/traffic</td>
                  </tr>
                  <tr>
                    <td>Choppy or delayed live view</td>
                    <td>Insufficient upload bandwidth</td>
                    <td>Reduce recording resolution or upgrade internet plan</td>
                  </tr>
                  <tr>
                    <td>Camera keeps disconnecting</td>
                    <td>Weak Wi-Fi signal</td>
                    <td>Move closer to router or add a mesh node; check firmware</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Do security cameras always record, or only on motion?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Most consumer cameras record in short motion-triggered clips by default to save storage and bandwidth, though many support continuous recording as a paid or configurable option.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Is it legal to install a camera facing the street?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Rules vary by location. As a general practice, angle cameras to cover only your own property line and mask out public paths, neighboring homes and windows wherever the app allows.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 5. DOOR/WINDOW SENSORS ============ */}
          <DeviceGuide id="guide-doorsensors" category="security" name="Door and Window Sensors">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="7" height="16" rx="1"></rect>
                  <rect x="14" y="4" width="7" height="16" rx="1"></rect>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Door / Window Sensors</h2>
                <div className="tag-row"><span className="tag tag--accent">Security</span><span className="tag">Zigbee / Wi-Fi</span><span className="tag">Easy</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              A two-piece magnetic sensor — one part on the door/window frame, one on the moving panel — that reports open/closed state, used for security alerts and automation triggers.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To detect when a door or window opens or closes, enabling security alerts, "did I leave the window open" checks, and automations like turning on a light when a door opens.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              The two halves each contain a small magnet/reed switch pair. When the two halves separate beyond a set gap, the reed switch circuit opens, and the sensor immediately transmits an "open" state change over Zigbee or Wi-Fi; closing the gap again transmits "closed."
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Standard door/window sensors</strong> — two-piece magnet-and-transmitter, surface-mounted with adhesive or screws</li>
              <li><strong>Recessed/concealed sensors</strong> — fit inside a drilled cavity in the frame for an invisible install</li>
              <li><strong>Sensors with built-in vibration/tamper detection</strong> — also alert on forced-entry attempts, not just opening</li>
              <li><strong>Garage door tilt sensors</strong> — a variant that detects the tilt angle of a garage door rather than a simple gap</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Instant open/close state reporting</li>
                  <li>Battery life typically 1–2 years (coin cell)</li>
                  <li>Compact, low-profile design for door/window frames</li>
                  <li>Some models include a built-in temperature sensor</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Sensor pair + adhesive mounts or screws</li>
                  <li>Zigbee hub (for Zigbee models) or 2.4GHz Wi-Fi</li>
                  <li>CR2032 or similar coin cell battery (often included)</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Zigbee sensors need a hub already on your network but tend to have longer battery life than Wi-Fi versions, since Wi-Fi radios draw significantly more power per transmission.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Battery</span><span className="v">CR2032, 1–2 year life</span></li>
                  <li><span className="k">Max detection gap</span><span className="v">10–15mm</span></li>
                  <li><span className="k">Report latency</span><span className="v">&lt;1 second</span></li>
                  <li><span className="k">Mounting</span><span className="v">Adhesive tape or screws</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "ds-c1", label: <>Hub available and online (Zigbee models)</> },
                    { id: "ds-c2", label: <>Frame and panel surfaces cleaned for adhesive mounting</> },
                    { id: "ds-c3", label: <>Confirmed gap between sensor halves will stay within spec when closed</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Clean the door/window frame and panel surface with alcohol wipes before sticking the adhesive backing — dust reduces adhesive lifespan.</li>
              <li>Align the two sensor halves within the manufacturer's specified gap (usually under 15mm) when the door/window is closed.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Pair via the hub's "Add Device" flow (Zigbee) or the manufacturer app (Wi-Fi), following the pairing button sequence.</li>
              <li>Test by opening and closing the door/window and confirming the app updates state within 1–2 seconds.</li>
              <li>Name it clearly by location ("Kitchen Window") for use in automations and alerts.</li>
            </ol>
            <div className="manual-box manual-box--note">
              <strong className="box-label">ℹ Note</strong> Door/window sensors report state only — they don't distinguish who or what opened the door. Pair with a camera or motion sensor for identification.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Get a notification if a door/window opens while in "Away" mode</li>
                  <li>Trigger a light or camera recording when a specific door opens</li>
                  <li>Use as an "occupied/vacant" signal in broader automations</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Front door opens after sunset → entryway light turns on</li>
                  <li>Window left open + AC running → push notification reminder</li>
                  <li>Door opens while "Away" mode is active → security routine triggers</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Replace the coin cell battery when the app shows low battery — sensors typically stop reporting reliably before fully dying</li>
              <li>Re-stick or replace adhesive mounts if they loosen from humidity or temperature changes</li>
              <li>Keep the two sensor halves free of paint or dust buildup that could weaken the magnetic connection</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Shows "open" when actually closed</td>
                    <td>Gap between halves exceeds spec</td>
                    <td>Remount the two halves closer together</td>
                  </tr>
                  <tr>
                    <td>Delayed status updates</td>
                    <td>Weak hub/mesh coverage</td>
                    <td>Add more mains-powered Zigbee devices nearby to extend the mesh</td>
                  </tr>
                  <tr>
                    <td>Sensor unresponsive</td>
                    <td>Depleted battery</td>
                    <td>Replace the coin cell battery — resolves most cases</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Can I use a door sensor on a sliding window?</AccordionTrigger>
                <AccordionPanel>
                  <p>Yes — mount one half on the fixed frame and the other on the sliding panel, keeping both flush and aligned when closed.</p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Do these sensors work without a hub?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Wi-Fi versions work without a separate hub, connecting directly to your router, though they draw more battery power than Zigbee equivalents.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 6. MOTION SENSORS ============ */}
          <DeviceGuide id="guide-motion" category="security" name="Motion Sensors">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Motion Sensors</h2>
                <div className="tag-row"><span className="tag tag--accent">Security</span><span className="tag">Zigbee / Wi-Fi</span><span className="tag">Easy</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Motion sensors detect movement in a room using passive infrared (PIR) technology, and are one of the most widely reused triggers in a smart home — powering everything from automatic lighting to security alerts.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To detect occupancy or movement in a space and trigger a response — turning on a light, starting a camera recording, or sending a security alert. Common uses: hands-free hallway/closet lighting, occupancy-based climate control, and unauthorized-entry detection while away.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              A PIR sensor detects changes in infrared radiation (heat) within its field of view, caused by a warm body moving across it. When the change exceeds a threshold, the sensor fires an "motion detected" event, then a "clear" event once no motion is seen for a set timeout period (commonly 30 seconds to a few minutes, depending on the model's fixed or adjustable timeout).
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>PIR (passive infrared) sensors</strong> — the most common type; detect heat-signature movement, cheap and reliable</li>
              <li><strong>Microwave sensors</strong> — emit and read reflected radio waves, detect motion through thin materials, more prone to false triggers</li>
              <li><strong>Dual-technology sensors</strong> — combine PIR and microwave, requiring both to agree before triggering, reducing false alarms</li>
              <li>
                <strong>mmWave presence sensors</strong> — newer technology that detects still (non-moving) occupancy, not just motion, useful for rooms where people sit still
              </li>
              <li><strong>Outdoor motion sensors</strong> — weatherproofed and tuned to ignore small animals or moving foliage</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>PIR-based motion detection, typically 5–8 meter range</li>
                  <li>Some models include a built-in ambient light (lux) sensor</li>
                  <li>Adjustable sensitivity and retrigger timeout on higher-end models</li>
                  <li>Compact, battery-powered, wall or corner-mountable</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Motion sensor unit + mounting bracket</li>
                  <li>Zigbee hub (for Zigbee models) or 2.4GHz Wi-Fi</li>
                  <li>Battery (CR123A or AA, model dependent)</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Confirm detection range and field of view (commonly 90–120°) match the room size and mounting height you intend. Zigbee motion sensors need a hub already on the network; Wi-Fi models connect directly but drain batteries faster.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Detection range</span><span className="v">5 – 8 meters</span></li>
                  <li><span className="k">Field of view</span><span className="v">90° – 120°</span></li>
                  <li><span className="k">Battery life</span><span className="v">6 – 18 months</span></li>
                  <li><span className="k">Retrigger interval</span><span className="v">30 seconds – 5 minutes (adjustable on some models)</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "mo-c1", label: <>Chosen a corner or wall spot with a clear line of sight to the room</> },
                    { id: "mo-c2", label: <>Confirmed it won't face a window (sunlight can trigger false positives)</> },
                    { id: "mo-c3", label: <>Hub or Wi-Fi network ready for pairing</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Mount at a height of roughly 2–2.4 meters in a corner, angled to cover the room's main walking path.</li>
              <li>Avoid pointing directly at windows, heaters, or air vents, which can cause false triggers from temperature fluctuations.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Pair via the hub's "Add Device" flow or the manufacturer app.</li>
              <li>Set sensitivity and retrigger timeout appropriate to the room (shorter for hallways, longer for living rooms/offices).</li>
              <li>Test by walking through the coverage area and confirming the app registers motion within 1–2 seconds.</li>
            </ol>
            <div className="manual-box manual-box--note">
              <strong className="box-label">ℹ Note</strong> PIR sensors detect heat-based movement, not "presence" — a person sitting very still for an extended period may register as "no motion," which affects auto-off lighting timing.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Trigger lights or plugs automatically when a room becomes occupied</li>
                  <li>Combine with a lux/ambient light sensor to only trigger lights when it's dark</li>
                  <li>Use in "Away" mode as a security trip-wire</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>Motion detected + low light level → hallway light turns on at 40%</li>
                  <li>No motion for 10 minutes in an occupied room → lights turn off automatically</li>
                  <li>Motion detected while "Away" → camera recording starts + push alert sent</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Replace batteries when the app shows low battery — degraded battery power can reduce detection range before failing outright</li>
              <li>Dust the sensor lens periodically; a dirty lens reduces detection sensitivity</li>
              <li>Re-angle or reposition if seasonal sunlight changes start causing false triggers</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frequent false triggers</td>
                    <td>Sensor faces a window or heat source</td>
                    <td>Reposition away from direct sunlight, heaters or vents</td>
                  </tr>
                  <tr>
                    <td>Doesn't detect real motion</td>
                    <td>Sensitivity set too low, or out of range</td>
                    <td>Increase sensitivity in app; reposition closer to the walking path</td>
                  </tr>
                  <tr>
                    <td>Light turns off too soon while room is occupied</td>
                    <td>Retrigger timeout too short</td>
                    <td>Increase the "no motion" timeout for that room in the automation settings</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Can motion sensors tell people and pets apart?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Basic PIR sensors generally cannot. Some higher-end models offer "pet immune" modes that ignore heat signatures below a certain size/height, reducing false triggers from cats and small dogs.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Why does my auto-off light flicker on and off while I'm sitting still?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    The sensor isn't detecting continuous "presence," only movement events. Increase the retrigger/timeout window for rooms where people sit still for long periods, like a home office.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 7. SMART SPEAKERS ============ */}
          <DeviceGuide id="guide-speakers" category="convenience" name="Smart Speakers">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="2" width="6" height="12" rx="3"></rect>
                  <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M9 22h6"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Smart Speakers</h2>
                <div className="tag-row"><span className="tag">Convenience</span><span className="tag">Wi-Fi + Bluetooth</span><span className="tag">Easy</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Smart speakers combine a voice assistant (Google Assistant, Alexa) with audio playback, and often double as a smart home hub or Thread/Zigbee border router.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To provide voice control over other smart devices, answer questions, play media, and — on many current models — act as the local hub connecting Zigbee/Thread devices to your network. Common uses: hands-free control while cooking, a spoken morning briefing, and central voice control for the whole home.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              An always-listening microphone array detects a wake word locally, then streams the following speech to the cloud (or processes it on-device on some newer models) for natural-language interpretation. The resulting intent is matched to an action — playing music, answering a question, or sending a command to a linked smart home device.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Compact smart speakers</strong> — small form factor, basic speaker quality, lowest cost entry point for voice control</li>
              <li><strong>Premium/high-fidelity smart speakers</strong> — larger drivers for serious music listening in addition to voice control</li>
              <li><strong>Smart displays</strong> — add a touchscreen for video calls, visual responses, and camera feed viewing</li>
              <li><strong>Hub-integrated speakers</strong> — include a built-in Zigbee/Thread radio, acting as a hub for other devices as well as a speaker</li>
              <li><strong>Portable/battery smart speakers</strong> — battery-powered for outdoor or room-to-room use, connect over Wi-Fi/Bluetooth</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Voice assistant for queries, timers, reminders, and device control</li>
                  <li>Multi-room audio grouping</li>
                  <li>Built-in Zigbee/Thread hub on many newer models</li>
                  <li>Routines triggered by voice phrases</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Smart speaker unit + power cable</li>
                  <li>2.4GHz or 5GHz Wi-Fi (model dependent)</li>
                  <li>Google Home or Alexa app</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Check whether the specific model includes a built-in Zigbee/Thread hub if you plan to rely on it for those devices — not all smart speakers do, even within the same product family.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Wireless</span><span className="v">Wi-Fi 802.11 a/b/g/n/ac, Bluetooth 5.0</span></li>
                  <li><span className="k">Hub radios (select models)</span><span className="v">Zigbee, Thread</span></li>
                  <li><span className="k">Power</span><span className="v">Mains-powered, always-on</span></li>
                  <li><span className="k">Microphone array</span><span className="v">4–6 far-field mics</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "sp-c1", label: <>Chosen a central, open placement (not inside a cabinet)</> },
                    { id: "sp-c2", label: <>Google Home / Alexa app installed</> },
                    { id: "sp-c3", label: <>Know which other smart home accounts you'll link</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Place the speaker in a central, open location — avoid enclosed cabinets, which muffle both audio and microphone pickup.</li>
              <li>Plug in and wait for the ready indicator (usually a light ring or tone).</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Open the Google Home or Alexa app; the app should detect the new device automatically.</li>
              <li>Follow the in-app setup: connect to Wi-Fi, choose a room name, and grant requested permissions.</li>
              <li>Link other smart home accounts (lights, plugs, locks) from within the app's device linking section.</li>
              <li>Set up voice match/profiles if supported, so the assistant recognizes different household members.</li>
              <li>If the speaker has a built-in hub, look for a "Matter" or "Zigbee devices" section in the app to begin pairing those devices through it.</li>
            </ol>
            <div className="manual-box manual-box--info">
              <strong className="box-label">ℹ Privacy Note</strong> Mute the microphone physically when discussing sensitive matters nearby, and periodically review/delete stored voice recordings in the assistant's privacy settings.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Control lights, plugs, locks and thermostats by voice</li>
                  <li>Trigger multi-device routines with a single phrase ("Good night")</li>
                  <li>Stream music individually or grouped across multiple speakers</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>"Good morning" voice phrase triggers lights, thermostat and a news briefing together</li>
                  <li>Speaker chimes when a door sensor reports an unexpected opening</li>
                  <li>Voice command "I'm leaving" runs the full Leaving Home routine</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Keep firmware/app updated — most updates apply silently but should be confirmed periodically</li>
              <li>Dust the speaker grille occasionally to maintain audio and mic quality</li>
              <li>Review linked services periodically and remove ones no longer in use</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Assistant doesn't hear wake word</td>
                    <td>Background noise or mic muted</td>
                    <td>Reduce nearby noise/distance; check the mic mute switch isn't on</td>
                  </tr>
                  <tr>
                    <td>"Couldn't reach that device"</td>
                    <td>Linked account expired or device offline</td>
                    <td>Re-link the smart home account in the app; confirm target device is online</td>
                  </tr>
                  <tr>
                    <td>Multi-room audio out of sync</td>
                    <td>Speakers on different Wi-Fi bands/firmware</td>
                    <td>Ensure all speakers share the same band and are updated</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Is a smart speaker always recording?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    It continuously listens locally for the wake word only; audio is sent to the cloud for processing only after the wake word is detected, in almost all mainstream devices.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Can a smart speaker replace a dedicated hub?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Only if that specific model includes a built-in Zigbee/Thread radio — check the spec sheet, since not every speaker in a product line has one.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 8. THERMOSTATS / CLIMATE ============ */}
          <DeviceGuide id="guide-thermostat" category="climate" name="Thermostats and Climate Control">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 15a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.5A4 4 0 0 1 21 14a4 4 0 0 1-4 4H7a4 4 0 0 1-4-3z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Smart Thermostats &amp; Climate Control</h2>
                <div className="tag-row"><span className="tag tag--warn">Climate</span><span className="tag">Wi-Fi</span><span className="tag">Moderate–Hard</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Smart thermostats and AC controllers manage heating/cooling schedules and remote temperature control. In regions using split ACs rather than central HVAC, a smart AC controller (IR-based) achieves similar functionality without rewiring.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To automate temperature control based on schedule, occupancy or geofencing, reducing energy waste from heating/cooling an empty home. Common uses: pre-cooling a room before arrival, cutting AC runtime while away, and tracking climate-related energy usage.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              A wired thermostat reads room temperature via an internal sensor and switches HVAC relays (heat/cool/fan) directly. An IR-based AC controller instead reads the room temperature itself and sends recorded infrared signals — the same codes as the AC's physical remote — to replicate manual control without any wiring.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Wired smart thermostats</strong> — replace a central HVAC/furnace thermostat, wired directly into the system's control wires</li>
              <li><strong>IR-based smart AC controllers</strong> — sit in the room and control any IR remote-operated split/window AC without rewiring</li>
              <li><strong>Smart AC units</strong> — window or split ACs with Wi-Fi built directly into the unit, no separate controller needed</li>
              <li><strong>Smart radiator valves (TRVs)</strong> — control individual radiators in hydronic/central heating systems room by room</li>
              <li><strong>Multi-zone thermostat systems</strong> — coordinate several thermostats/dampers for different zones of a larger home</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Scheduling by time of day and day of week</li>
                  <li>Geofencing — adjusts when everyone leaves/returns home</li>
                  <li>Energy usage reports and efficiency recommendations</li>
                  <li>IR-based "smart AC controllers" work with existing split/window ACs without any wiring</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Smart thermostat (wired) or AC controller (plug-in, IR)</li>
                  <li>C-wire or adapter kit (wired thermostats)</li>
                  <li>2.4GHz Wi-Fi network</li>
                  <li>Screwdriver, wire labels (wired installs only)</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              If retrofitting a wired thermostat, confirm your HVAC system has a C-wire, or budget for a "C-wire adapter" kit — this is the most common installation blocker. IR-based AC controllers need a database entry for your specific AC brand/model to send the correct signals.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Power (wired)</span><span className="v">24V HVAC system, C-wire required</span></li>
                  <li><span className="k">Power (AC controller)</span><span className="v">Mains plug, 5–10W idle</span></li>
                  <li><span className="k">IR range</span><span className="v">6 – 8 meters, line-of-sight</span></li>
                  <li><span className="k">Sensor accuracy</span><span className="v">±0.5°C</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "th-c1", label: <>Confirmed C-wire presence (wired installs) or plug location with line-of-sight to AC (controllers)</> },
                    { id: "th-c2", label: <>Photographed/labeled existing thermostat wiring</> },
                    { id: "th-c3", label: <>Power off at breaker (wired installs)</> },
                    { id: "th-c4", label: <>Confirmed AC brand/model is in the controller's supported list</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li>Turn off power to the HVAC system at the breaker before removing the old thermostat.</li>
              <li>Label each wire according to its terminal before disconnecting (photograph the old wiring first).</li>
              <li>Mount the new thermostat's baseplate, connect wires to matching terminals, and attach the display unit.</li>
              <li>For AC controllers: plug into a nearby outlet with line-of-sight to the AC unit.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Restore power and complete Wi-Fi setup through the manufacturer app.</li>
              <li>For AC controllers: select your AC's brand/model in the app so it downloads the correct IR command set.</li>
              <li>Set your preferred schedule and enable geofencing if desired (requires location permission on your phone).</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Safety Precaution</strong> Always cut power at the breaker before wiring a thermostat — even low-voltage HVAC control wiring should not be handled live. If you're unsure about your HVAC wiring, use a licensed technician.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Set weekday/weekend schedules matching your routine</li>
                  <li>Use "away mode" to widen the temperature range when no one is home</li>
                  <li>Review monthly energy reports to spot inefficient habits</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>"Coming Home" routine pre-cools the living room 15 minutes before arrival</li>
                  <li>Window sensor open + AC running → pause cooling and notify</li>
                  <li>"Leaving Home" widens the temperature range to save energy</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Clean or replace HVAC filters regularly — a smart thermostat can't compensate for a clogged filter</li>
              <li>Keep the device's firmware updated for scheduling and integration fixes</li>
              <li>Recalibrate temperature readings if the thermostat is near a heat source (sunlight, vents) causing inaccurate readings</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thermostat keeps rebooting/losing power</td>
                    <td>Missing or weak C-wire</td>
                    <td>Install a C-wire adapter kit</td>
                  </tr>
                  <tr>
                    <td>AC controller commands not working</td>
                    <td>No line-of-sight, or wrong model selected</td>
                    <td>Confirm sightline to AC's IR receiver; re-select exact model in app</td>
                  </tr>
                  <tr>
                    <td>Geofencing not triggering</td>
                    <td>Location permission too restrictive</td>
                    <td>Set to "Always Allow" location access on your phone, not "While Using App"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>What if my HVAC system doesn't have a C-wire?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Most manufacturers sell a "C-wire adapter" kit that taps power from existing wires, or you can run a new C-wire — often requiring an electrician or HVAC technician.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>Can an IR AC controller work if furniture blocks the AC unit?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    No — IR requires an unobstructed line of sight between the controller and the AC's receiver. Reposition the controller or the AC unit's sightline if commands stop working.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
          {/* ============ 9. ENERGY MONITORING ============ */}
          <DeviceGuide id="guide-energy" category="energy" name="Energy Monitoring Devices">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Energy Monitoring Devices</h2>
                <div className="tag-row"><span className="tag tag--primary">Energy</span><span className="tag">Wi-Fi / Zigbee</span><span className="tag">Moderate–Hard</span></div>
              </div>
            </div>
            <span className="subhead">Overview</span>
            <p>
              Devices that measure electricity consumption — either whole-home via a panel-mounted clamp meter, or per-appliance via a monitoring smart plug — to help identify waste and track usage trends.
            </p>
            <span className="subhead">Purpose / Use Case</span>
            <p>
              To make electricity usage visible in real time and historically, so you can identify high-consumption appliances, detect phantom loads, and act on efficiency recommendations. Common uses: finding which appliance drives your bill, spotting a failing appliance via an unusual spike, and measuring the impact of efficiency changes.
            </p>
            <span className="subhead">How It Works</span>
            <p>
              A current transformer (CT) clamp or in-line shunt measures the current flowing through a wire without breaking the circuit, and combines this with the known voltage to calculate real-time wattage. The device reports this data over Wi-Fi or Zigbee, where the app aggregates it into hourly, daily and monthly consumption totals.
            </p>
            <span className="subhead">Types</span>
            <ul>
              <li><strong>Whole-home panel monitors</strong> — CT clamps on the main incoming lines at the breaker panel, installed by an electrician</li>
              <li><strong>Per-circuit monitors</strong> — one clamp per breaker, giving room- or circuit-level usage detail</li>
              <li><strong>Energy-monitoring smart plugs</strong> — plug-in, no wiring, measure only whatever appliance is plugged into them</li>
              <li><strong>Inline/shunt-based monitors</strong> — wired directly into a specific circuit for higher accuracy than a clamp</li>
              <li><strong>Solar/battery monitoring add-ons</strong> — extend basic consumption monitoring to also track home solar generation or battery storage</li>
            </ul>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Key Features</span>
                <ul>
                  <li>Whole-home monitors: clamp sensors on the main incoming lines, reporting total household usage</li>
                  <li>Per-circuit monitors: individual clamps per breaker for room/circuit-level detail</li>
                  <li>Per-appliance monitoring plugs: simplest option, no electrical work needed</li>
                  <li>Historical trends, cost estimates, and usage alerts</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Required Equipment</span>
                <ul>
                  <li>Energy-monitoring smart plug, or a whole-home/circuit CT clamp kit</li>
                  <li>2.4GHz Wi-Fi or Zigbee network</li>
                  <li>Licensed electrician (whole-home/circuit installs only)</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Compatibility</span>
            <p>
              Whole-home monitors need to match your panel's amperage and phase configuration (single-phase vs three-phase) — confirm this before purchase. Per-appliance plugs are the simplest and safest starting point for most homes.
            </p>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Technical Specifications (typical)</span>
                <ul className="spec-list">
                  <li><span className="k">Measurement accuracy</span><span className="v">±1–3%</span></li>
                  <li><span className="k">CT clamp rating</span><span className="v">100A – 200A per phase</span></li>
                  <li><span className="k">Sampling rate</span><span className="v">Every 1–10 seconds</span></li>
                  <li><span className="k">Data history retained</span><span className="v">12+ months (cloud-dependent)</span></li>
                </ul>
              </div>
              <div>
                <span className="subhead">Before-You-Start Checklist</span>
                <Checklist
                  items={[
                    { id: "em-c1", label: <>Confirmed panel amperage/phase configuration (whole-home installs)</> },
                    { id: "em-c2", label: <>Electrician booked, if required</> },
                    { id: "em-c3", label: <>Wi-Fi/Zigbee coverage confirmed near the panel or outlet</> },
                  ]}
                />
              </div>
            </div>
            <span className="subhead">Installation Procedure</span>
            <ol>
              <li><strong>Per-appliance plug:</strong> plug directly into the wall, then plug the target appliance into it.</li>
              <li>
                <strong>Whole-home/circuit monitor:</strong> power down the main breaker; a licensed electrician clamps current transformers (CTs) around the relevant wires inside the panel without cutting them.
              </li>
              <li>Mount the monitor's base unit near the panel.</li>
            </ol>
            <span className="subhead">Configuration / Setup</span>
            <ol>
              <li>Connect the monitor to your Wi-Fi network via the app.</li>
              <li>In the app, label each monitored circuit or plug by the appliance/area it covers.</li>
              <li>Allow 24–48 hours for the system to build a baseline usage profile before trusting detailed insights.</li>
            </ol>
            <div className="manual-box manual-box--warning">
              <strong className="box-label">⚠ Safety Precaution</strong> Never open a breaker panel or attempt CT clamp installation yourself unless qualified — this involves live electrical infrastructure. Always hire a licensed electrician for whole-home or circuit-level monitors.
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">How to Use It</span>
                <ul>
                  <li>Identify which appliances draw the most power and when</li>
                  <li>Set alerts for unusual spikes (a sign of a failing appliance or left-on device)</li>
                  <li>Track progress after making efficiency changes (e.g., switching to LED bulbs)</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Automation Examples</span>
                <ul>
                  <li>A plug's usage exceeds a threshold overnight → push alert sent</li>
                  <li>Combined with the "Leaving Home" routine, confirms all high-draw devices actually powered off</li>
                  <li>Monthly usage report triggers a reminder to review the Energy-Saving Setup</li>
                </ul>
              </div>
            </div>
            <span className="subhead">Maintenance</span>
            <ul>
              <li>Keep the monitoring app updated for accurate cost/rate calculations, especially after utility tariff changes</li>
              <li>Periodically verify readings against your utility bill to check calibration</li>
              <li>Dust and inspect panel-mounted units annually (electrician visit) for secure clamp connections</li>
            </ul>
            <span className="subhead">Troubleshooting</span>
            <div className="table-wrap" style={{ marginBottom: "20px" }}>
              <table className="compare pcs">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Possible Cause</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Readings don't match utility bill</td>
                    <td>Incorrect phase/line count clamped</td>
                    <td>Have the electrician confirm and recalibrate via the app</td>
                  </tr>
                  <tr>
                    <td>Plug shows 0W for an active device</td>
                    <td>Draw below minimum detection threshold</td>
                    <td>Check the spec sheet — very low-draw electronics may not register</td>
                  </tr>
                  <tr>
                    <td>Data gaps in history</td>
                    <td>Weak Wi-Fi near the panel</td>
                    <td>Add a Wi-Fi extender near the panel/utility area</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="subhead">FAQ</span>
            <div className="accordion">
              <AccordionItem>
                <AccordionTrigger>Do I need an electrician for a smart plug energy monitor?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    No — per-appliance monitoring plugs are plug-and-play. Only whole-home or circuit-level monitors that clamp onto panel wiring require an electrician.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger>How accurate are energy monitors compared to the utility meter?</AccordionTrigger>
                <AccordionPanel>
                  <p>
                    Quality monitors are typically accurate within 1–3%, close enough for identifying trends and high-draw appliances, though not a substitute for the official utility meter for billing purposes.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </div>
          </DeviceGuide>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Ready to plan your setup?</h2>
              <p>Turn what you've just read into an actual shopping list with the Smart Home Planner.</p>
            </div>
            <Link href="/planner" className="btn btn--primary">Start Building Your Smart Home</Link>
          </div>
        </div>
      </section>
    </DeviceFilterProvider>
  );
}
