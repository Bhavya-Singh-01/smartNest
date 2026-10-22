import Link from "next/link";

export const metadata = {
  title: "Smart Home Basics",
  description: "Understand what a smart home is, IoT, smart devices, Wi-Fi, Bluetooth, Zigbee, Z-Wave, Thread, Matter, hubs, cloud vs local control, compatibility, and how devices communicate.",
};

export default function BasicsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Smart Home Basics</div>
          <span className="eyebrow">Foundations</span>
          <h1>Smart Home Basics</h1>
          <p className="lead">
            Before buying anything, it helps to understand how smart devices actually talk to each other. This page covers every concept referenced elsewhere on SmartNest — read it once, end to end, and the Device Manual will make a lot more sense.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container with-toc">
          <aside className="toc">
            <div className="toc-title">On this page</div>
            <a href="#what-is-smart-home">What Is a Smart Home?</a> <a href="#what-is-iot">What Is IoT?</a> <a href="#smart-devices">Smart Devices</a> <a href="#ecosystem">The Smart Home Ecosystem</a> <a href="#protocols">Wireless Protocols</a> <a href="#communication">How Devices Communicate</a> <a href="#hubs">Smart Hubs</a> <a href="#cloud-local">Cloud vs. Local Control</a> <a href="#compatibility">Device Compatibility</a>
          </aside>
          <div>
            <div id="what-is-smart-home" style={{ marginBottom: "60px" }}>
              <span className="subhead">00 — Starting Point</span>
              <h2>What Is a Smart Home?</h2>
              <p>
                A smart home is a residence where lighting, climate, security, entertainment and appliances are connected to a network and can be monitored or controlled remotely — through a smartphone app, a voice assistant, a physical control panel, or automatically through pre-set rules ("automations").
              </p>
              <p>
                The defining difference from a "normal" home isn't the individual gadgets — a programmable thermostat or a timer plug has existed for decades. It's that smart home devices are <strong>networked and interoperable</strong>: a motion sensor in the hallway can tell a light bulb in the same hallway to turn on, and a door sensor on the front door can tell a camera to start recording, without you touching anything. That connectivity is what turns a pile of gadgets into a system.
              </p>
              <div className="grid grid--3">
                <div className="card">
                  <h3>Convenience</h3>
                  <p style={{ fontSize: "0.9rem" }}>Control multiple devices from one app or one voice command instead of separate switches, remotes and dials.</p>
                </div>
                <div className="card">
                  <h3>Efficiency</h3>
                  <p style={{ fontSize: "0.9rem" }}>Automatic scheduling and occupancy-based control reduce wasted electricity from lighting and climate control.</p>
                </div>
                <div className="card">
                  <h3>Safety &amp; Security</h3>
                  <p style={{ fontSize: "0.9rem" }}>Real-time alerts, remote monitoring and keyless access reduce the risk of missed emergencies or unauthorized entry.</p>
                </div>
              </div>
            </div>
            <div id="what-is-iot" style={{ marginBottom: "60px" }}>
              <span className="subhead">01 — Core Concept</span>
              <h2>What Is IoT?</h2>
              <p>
                The Internet of Things (IoT) refers to everyday physical objects — light bulbs, locks, thermostats, cameras — that contain a small computer, a sensor or actuator, and a network radio. This lets them collect data (temperature, motion, door state) and receive commands (turn on, lock, dim to 40%) over a network instead of only working from a switch or dial on the object itself.
              </p>
              <p>
                A "smart home" is simply a collection of IoT devices that are set up to communicate with each other, with a central controller (an app, hub, or voice assistant), and often with the internet, so they can be monitored and automated as a system rather than as isolated gadgets.
              </p>
              <div className="callout callout--info">
                <div>
                  <strong>Why this matters before you buy</strong> Every device you add to a smart home has to fit into one connectivity model. Buying based on price or looks alone, without checking the protocol and hub requirements, is the single most common reason people end up with devices that "don't talk to each other."
                </div>
              </div>
            </div>
            <div id="smart-devices" style={{ marginBottom: "60px" }}>
              <span className="subhead">02 — Building Blocks</span>
              <h2>Smart Devices</h2>
              <p>
                A "smart device" is any IoT endpoint built for a specific job in the home. Almost every smart device is built from the same three internal parts:
              </p>
              <div className="grid grid--3">
                <div className="card">
                  <h3>1. Sensor or actuator</h3>
                  <p style={{ fontSize: "0.9rem" }}>The part that senses the world (motion, temperature, door state) or acts on it (turns a motor, switches a relay, dims an LED driver).</p>
                </div>
                <div className="card">
                  <h3>2. Radio / network chip</h3>
                  <p style={{ fontSize: "0.9rem" }}>Wi-Fi, Bluetooth, Zigbee, Z-Wave or Thread hardware that lets the device send and receive data.</p>
                </div>
                <div className="card">
                  <h3>3. Small onboard computer</h3>
                  <p style={{ fontSize: "0.9rem" }}>
                    A microcontroller running firmware that interprets commands, reports status, and in many devices runs basic logic even without the app open.
                  </p>
                </div>
              </div>
              <p style={{ marginTop: "18px" }}>
                Smart devices are generally grouped by the room or function they serve — lighting, entry/security, climate, entertainment and energy — which is exactly how the SmartNest Device Manual is organized. Some devices ("sensors") only report data; others ("actuators") only act on commands; many combine both, like a smart thermostat that reads temperature <em>and</em> controls the HVAC system.
              </p>
            </div>
            <div id="ecosystem" style={{ marginBottom: "60px" }}>
              <span className="subhead">03 — Structure</span>
              <h2>The Smart Home Ecosystem</h2>
              <p>A working smart home is made of four layers. Understanding them makes every later manual page easier to follow.</p>
              <div className="grid grid--2">
                <div className="card">
                  <h3>1. Devices (endpoints)</h3>
                  <p>
                    The physical hardware — bulbs, plugs, sensors, locks, cameras, thermostats. Each device has a radio (Wi-Fi, Zigbee, Bluetooth, Thread) and a small function it performs.
                  </p>
                </div>
                <div className="card">
                  <h3>2. Hubs &amp; controllers</h3>
                  <p>
                    A hub translates between low-power protocols (Zigbee, Thread, Z-Wave) and your home network, and often runs automation logic locally. Some ecosystems (pure Wi-Fi devices) skip the hub entirely.
                  </p>
                </div>
                <div className="card">
                  <h3>3. Apps &amp; voice assistants</h3>
                  <p>
                    The interface layer — manufacturer apps, Google Home, Amazon Alexa, Apple Home — where you view device status, create automations and issue voice commands.
                  </p>
                </div>
                <div className="card">
                  <h3>4. Cloud services</h3>
                  <p>
                    Manufacturer servers that store device state, process voice commands, send remote-access traffic, and push firmware updates. Some functions require the cloud; others can run entirely on your local network.
                  </p>
                </div>
              </div>
              <div className="card" style={{ marginTop: "24px" }}>
                <h3 style={{ marginBottom: "18px" }}>How the layers connect — simplified diagram</h3>
                <svg viewBox="0 0 760 260" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagram: devices connect to a hub, the hub connects to the home router, the router connects to the internet and cloud services, and the app and voice assistant connect through the cloud and directly to the local network.">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M0 0L10 5L0 10z" fill="var(--sn-accent)"></path>
                    </marker>
                  </defs>
                  {/* Devices */}
                  <rect className="node-box" x="20" y="20" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="95" y="42" textAnchor="middle">
                    Devices
                  </text>
                  <text className="node-sub" x="95" y="58" textAnchor="middle">
                    bulbs · locks · sensors
                  </text>
                  {/* Hub */}
                  <rect className="node-box" x="230" y="98" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="305" y="120" textAnchor="middle">
                    Smart Hub
                  </text>
                  <text className="node-sub" x="305" y="136" textAnchor="middle">
                    Zigbee / Thread bridge
                  </text>
                  {/* Router */}
                  <rect className="node-box" x="440" y="98" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="515" y="120" textAnchor="middle">
                    Home Router
                  </text>
                  <text className="node-sub" x="515" y="136" textAnchor="middle">
                    Wi-Fi network
                  </text>
                  {/* Cloud */}
                  <rect className="node-box" x="590" y="20" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="665" y="42" textAnchor="middle">
                    Cloud Services
                  </text>
                  <text className="node-sub" x="665" y="58" textAnchor="middle">
                    manufacturer servers
                  </text>
                  {/* App / Voice */}
                  <rect className="node-box" x="440" y="186" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="515" y="208" textAnchor="middle">
                    App / Voice Assistant
                  </text>
                  <text className="node-sub" x="515" y="224" textAnchor="middle">
                    your phone, speaker
                  </text>
                  {/* Wi-Fi direct devices */}
                  <rect className="node-box" x="230" y="186" width="150" height="54" rx="10"></rect>
                  <text className="node-label" x="305" y="208" textAnchor="middle">
                    Wi-Fi Devices
                  </text>
                  <text className="node-sub" x="305" y="224" textAnchor="middle">
                    cameras · plugs · TVs
                  </text>
                  <path className="lnk" d="M170,47 L230,120"></path>
                  <path className="lnk" d="M380,125 L440,125"></path>
                  <path className="lnk" d="M515,98 L590,60"></path>
                  <path className="lnk" d="M170,60 L230,205"></path>
                  <path className="lnk" d="M380,213 L440,213"></path>
                  <path className="lnk" d="M515,186 L515,152"></path>
                  <path className="lnk" d="M665,74 L665,150 L590,205"></path>
                </svg>
                <p style={{ fontSize: "0.85rem", marginTop: "12px", marginBottom: "0" }}>
                  Zigbee/Thread devices reach the network through the hub; Wi-Fi devices connect to the router directly. Either path can reach cloud services for remote access, and the app/voice assistant can command devices locally or via the cloud.
                </p>
              </div>
            </div>
            <div id="protocols" style={{ marginBottom: "60px" }}>
              <span className="subhead">04 — Connectivity</span>
              <h2>Wireless Protocols Explained</h2>
              <p>Almost every compatibility question in smart homes comes down to which of these protocols a device uses.</p>
              <div className="device-guide" style={{ marginTop: "24px" }}>
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 19.5h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Wi-Fi</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>The same network your router already runs.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">Strengths</span>
                    <ul>
                      <li>No hub required — devices join your router directly</li>
                      <li>High bandwidth, good for cameras and video doorbells</li>
                      <li>Long range within typical home Wi-Fi coverage</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">Trade-offs</span>
                    <ul>
                      <li>Higher power draw — poor choice for battery-only sensors</li>
                      <li>Every device eats into router connection slots and 2.4GHz airtime</li>
                      <li>Congested 2.4GHz bands can cause missed commands in dense device counts</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="device-guide">
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Bluetooth / Bluetooth LE</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>Short-range, low-power, phone-first.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">Strengths</span>
                    <ul>
                      <li>Very low power — ideal for locks, trackers and sensors</li>
                      <li>Direct phone pairing with no hub or app account required for basic use</li>
                      <li>Low latency for proximity-based unlock features</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">Trade-offs</span>
                    <ul>
                      <li>Short range (roughly 10–30m indoors, walls reduce this further)</li>
                      <li>Limited to one or a few simultaneous connections on many devices</li>
                      <li>No native remote access — usually needs a bridge for app control from outside the home</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="device-guide">
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <circle cx="5" cy="6" r="2"></circle>
                      <circle cx="19" cy="6" r="2"></circle>
                      <circle cx="5" cy="18" r="2"></circle>
                      <circle cx="19" cy="18" r="2"></circle>
                      <path d="M9.5 10.5L6.5 7.5M14.5 10.5l3-3M9.5 13.5l-3 3M14.5 13.5l3 3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Zigbee</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>Low-power mesh protocol built for smart homes.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">Strengths</span>
                    <ul>
                      <li>Mesh network — mains-powered devices (bulbs, plugs) extend range for battery devices</li>
                      <li>Very low power draw, ideal for sensors that must last months/years on a battery</li>
                      <li>Doesn't compete with Wi-Fi for router bandwidth</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">Trade-offs</span>
                    <ul>
                      <li>Requires a hub or bridge to reach the internet/app</li>
                      <li>Multiple "flavors" exist across brands — check hub compatibility lists</li>
                      <li>Weaker range per hop than Wi-Fi, relies on mesh density</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="device-guide">
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12h4l2-7 4 14 2-7h6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Z-Wave</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>A veteran low-power mesh protocol, popular in security devices.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">Strengths</span>
                    <ul>
                      <li>Operates on a sub-GHz radio band, so it doesn't compete with Wi-Fi/Bluetooth/Zigbee traffic at all</li>
                      <li>Strong backward compatibility — Z-Wave devices from many years apart typically still interoperate</li>
                      <li>Mature protocol with a long track record in locks, sensors and security systems</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">Trade-offs</span>
                    <ul>
                      <li>Requires a Z-Wave-compatible hub — it will not connect directly to Wi-Fi or a phone</li>
                      <li>Slightly higher device cost on average than equivalent Zigbee hardware</li>
                      <li>Fewer mainstream lighting products compared to Zigbee/Wi-Fi</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="device-guide">
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M12 12v9"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Thread</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>A newer, IP-based low-power mesh protocol.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">Strengths</span>
                    <ul>
                      <li>Native IP networking — each device gets a routable address, simplifying integration</li>
                      <li>Self-healing mesh with no single point of failure once several "border routers" exist</li>
                      <li>Backed by Apple, Google and Amazon devices as border routers (many smart speakers/hubs already act as one)</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">Trade-offs</span>
                    <ul>
                      <li>Newer — fewer devices support it compared to Zigbee</li>
                      <li>Still needs at least one Thread border router present on the network</li>
                      <li>Ecosystem tooling is younger, so troubleshooting resources are less mature</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="device-guide">
                <div className="device-guide-head">
                  <div className="device-icon-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3a9 9 0 1 0 9 9M12 3v9l6 3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0">Matter</h3>
                    <p className="mb-0" style={{ fontSize: "0.88rem" }}>Not a radio — a shared application-layer standard.</p>
                  </div>
                </div>
                <div className="device-guide-body">
                  <div>
                    <span className="subhead">What it actually is</span>
                    <ul>
                      <li>
                        Matter runs <em>on top of</em> Wi-Fi, Thread or Ethernet — it standardizes how devices describe themselves and respond to commands, so a Matter lock behaves the same way whether it's controlled from Google Home, Apple Home or Amazon Alexa
                      </li>
                      <li>A "Matter-certified" device can be set up once and used across multiple ecosystem apps without separate accounts</li>
                    </ul>
                  </div>
                  <div>
                    <span className="subhead">What to check</span>
                    <ul>
                      <li>Matter support does not guarantee every feature works identically across all apps — advanced features can still be app-specific</li>
                      <li>Older devices can sometimes gain Matter support via firmware update; check the manufacturer's roadmap</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="table-wrap" style={{ marginTop: "30px" }}>
                <table className="compare">
                  <thead>
                    <tr>
                      <th>Protocol</th>
                      <th>Power use</th>
                      <th>Range</th>
                      <th>Needs a hub?</th>
                      <th>Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wi-Fi</td>
                      <td>High</td>
                      <td>Long</td>
                      <td className="no">No</td>
                      <td>Cameras, TVs, plugs, speakers</td>
                    </tr>
                    <tr>
                      <td>Bluetooth / BLE</td>
                      <td>Very low</td>
                      <td>Short</td>
                      <td className="no">Optional</td>
                      <td>Locks, trackers, proximity sensors</td>
                    </tr>
                    <tr>
                      <td>Zigbee</td>
                      <td>Very low</td>
                      <td>Medium (mesh)</td>
                      <td className="yes">Yes</td>
                      <td>Bulbs, sensors, plugs at scale</td>
                    </tr>
                    <tr>
                      <td>Z-Wave</td>
                      <td>Very low</td>
                      <td>Medium (mesh)</td>
                      <td className="yes">Yes</td>
                      <td>Locks, security sensors</td>
                    </tr>
                    <tr>
                      <td>Thread</td>
                      <td>Very low</td>
                      <td>Medium (mesh)</td>
                      <td className="yes">Yes (border router)</td>
                      <td>Sensors, locks, next-gen ecosystems</td>
                    </tr>
                    <tr>
                      <td>Matter</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="no">Runs over the above</td>
                      <td>Cross-brand compatibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="communication" style={{ marginBottom: "60px" }}>
              <span className="subhead">05 — Message Flow</span>
              <h2>How Devices Communicate</h2>
              <p>Regardless of protocol, most smart home interactions follow the same basic message pattern:</p>
              <div className="flow">
                <div className="flow-node trigger"><strong>1. Event</strong>A sensor detects a change (motion, door state, button press)</div>
                <div className="flow-arrow">→</div>
                <div className="flow-node action"><strong>2. Report</strong>The device sends a small status message to the hub or router</div>
                <div className="flow-arrow">→</div>
                <div className="flow-node condition"><strong>3. Evaluate</strong>The hub, app or cloud checks if any automation rule matches</div>
                <div className="flow-arrow">→</div>
                <div className="flow-node action"><strong>4. Command</strong>A command message is sent to the target device(s)</div>
                <div className="flow-arrow">→</div>
                <div className="flow-node action"><strong>5. Act</strong>The target device executes (light turns on, lock engages)</div>
              </div>
              <p>
                This entire loop typically completes in under a second for local automations, and 1–3 seconds for cloud-routed ones (voice commands, remote app control). Two things affect reliability the most: <strong>signal strength/mesh coverage</strong> between the device and its hub/router, and <strong>whether the automation logic runs locally or requires an internet round-trip</strong>.
              </p>
            </div>
            <div id="hubs" style={{ marginBottom: "60px" }}>
              <span className="subhead">06 — Central Control</span>
              <h2>Smart Hubs</h2>
              <p>
                A hub (sometimes called a bridge or gateway) is a small always-on device that translates between a low-power protocol like Zigbee, Z-Wave or Thread and your home's IP network, so your phone app and voice assistant can reach devices that don't speak Wi-Fi directly.
              </p>
              <div className="grid grid--2">
                <div className="card">
                  <h3>When you need one</h3>
                  <ul>
                    <li>Any Zigbee device (most affordable sensors, some bulb lines)</li>
                    <li>Most Z-Wave devices</li>
                    <li>Thread devices, unless you already own a Thread border router (many modern smart speakers and set-top boxes act as one)</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>When you can skip one</h3>
                  <ul>
                    <li>Wi-Fi-only device lineups (many budget bulbs, plugs and cameras)</li>
                    <li>Bluetooth-only locks controlled solely by phone proximity</li>
                    <li>Ecosystems bundling the hub function into a smart speaker you already plan to buy</li>
                  </ul>
                </div>
              </div>
              <div className="callout callout--tip" style={{ marginTop: "20px" }}>
                <div>
                  <strong>Tip</strong>A single quality hub that supports Zigbee, Thread and Matter (many current-generation smart speakers do) future-proofs your setup better than buying a separate hub per brand.
                </div>
              </div>
            </div>
            <div id="cloud-local" style={{ marginBottom: "60px" }}>
              <span className="subhead">07 — Where Automations Run</span>
              <h2>Cloud vs. Local Control</h2>
              <p>
                Every command in a smart home is processed somewhere — either on a server on the internet ("the cloud") or on hardware inside your home ("local"). This affects speed, privacy and what happens when your internet goes down.
              </p>
              <div className="grid grid--2">
                <div className="card">
                  <h3>Cloud control</h3>
                  <p style={{ fontSize: "0.9rem" }}>
                    The device or hub sends your command to the manufacturer's servers, which process it and send a response back. Needed for remote access (checking your camera from outside), voice assistant processing, and firmware updates.
                  </p>
                  <div className="tag-row"><span className="tag tag--warn">Depends on internet</span><span className="tag">Enables remote access</span></div>
                </div>
                <div className="card">
                  <h3>Local control</h3>
                  <p style={{ fontSize: "0.9rem" }}>
                    The hub or device processes the command itself, on your home network, without needing internet access. Faster response time and keeps working during an internet outage.
                  </p>
                  <div className="tag-row"><span className="tag tag--primary">Works offline</span><span className="tag">Lower latency</span></div>
                </div>
              </div>
              <p style={{ marginTop: "18px" }}>
                Most modern hubs support a hybrid model: routine automations (e.g., "motion triggers a light") run locally for speed and reliability, while voice commands and remote app access still route through the cloud. When evaluating a device, it's worth checking whether basic on/off and sensor-triggered automations still work if your internet connection drops.
              </p>
            </div>
            <div id="compatibility" style={{ marginBottom: "20px" }}>
              <span className="subhead">08 — Before You Buy</span>
              <h2>Device Compatibility</h2>
              <div className="card">
                <ul>
                  <li>
                    <strong>Protocol match:</strong> Does the device's protocol (Wi-Fi/Zigbee/Z-Wave/Thread/BLE) match a hub or router you already own or plan to buy?
                  </li>
                  <li>
                    <strong>Ecosystem match:</strong> Is the device certified for the voice assistant / app ecosystem you use (Google Home, Amazon Alexa, Apple Home) — or is it Matter-certified for cross-ecosystem use?
                  </li>
                  <li>
                    <strong>Account requirement:</strong> Does it require a permanent manufacturer cloud account, and are you comfortable with that company's data practices?
                  </li>
                  <li><strong>Local fallback:</strong> Does basic functionality continue to work during an internet outage?</li>
                  <li><strong>Power source:</strong> Mains-powered, battery, or rechargeable — and does that match where you intend to install it?</li>
                  <li><strong>Firmware update policy:</strong> Does the manufacturer have a track record of shipping security updates?</li>
                </ul>
              </div>
              <div style={{ marginTop: "30px", textAlign: "center" }}><Link href="/devices" className="btn btn--primary">Continue to the Device Manual</Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
