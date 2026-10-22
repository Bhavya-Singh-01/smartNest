import Link from "next/link";
import { TroubleGroup, TroubleSearchInput, TroubleshootingProvider } from "@/components/troubleshooting/TroubleshootingSearch";
import { AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/Accordion";

export const metadata = {
  title: "Troubleshooting Center",
  description: "Problem, possible cause, and solution for the most common smart home issues: connection failures, offline devices, Wi-Fi problems, unresponsive sensors, automations not triggering, voice command failures, sync problems and pairing failures.",
};

export default function TroubleshootingPage() {
  return (
    <TroubleshootingProvider>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Troubleshooting Center</div>
          <span className="eyebrow">Troubleshooting Center</span>
          <h1>Troubleshooting Center</h1>
          <p className="lead">
            Search for a symptom or browse by category. Each entry follows the same format: Problem → Possible Cause → Solution, ordered from the fastest check to the least common cause.
          </p>
          <div className="search-box" style={{ marginTop: "24px" }}>
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M21 21l-4.3-4.3"></path>
              </svg>
            </span>
            {" "}
            <TroubleSearchInput placeholder="Search problems (e.g. offline, won't pair, no notifications)..." />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <TroubleGroup>
            <h2 id="connect" style={{ marginBottom: "18px" }}>Device Won't Connect / Pairing Failure</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Device won't join Wi-Fi during setup</td>
                    <td>Trying to connect to a 5GHz-only network</td>
                    <td>Confirm your router broadcasts 2.4GHz and use that during setup; some routers need bands temporarily split into separate SSIDs</td>
                  </tr>
                  <tr>
                    <td>Device won't enter pairing mode</td>
                    <td>Wrong reset sequence or timing</td>
                    <td>Check the manual for the exact hold duration — many devices need a specific press length, not just "hold until it blinks"</td>
                  </tr>
                  <tr>
                    <td>App says "device not found"</td>
                    <td>Bluetooth/location permissions not granted to the app</td>
                    <td>Grant Bluetooth and location permissions — many Wi-Fi setup flows still use Bluetooth for the initial handshake</td>
                  </tr>
                  <tr>
                    <td>Zigbee/Z-Wave device won't join hub</td>
                    <td>Device too far from hub, or previously paired elsewhere</td>
                    <td>Bring the device within 1–2 meters of the hub for first pairing; factory reset if it was on another hub before</td>
                  </tr>
                  <tr>
                    <td>Pairing keeps timing out</td>
                    <td>Stuck app session</td>
                    <td>Force-close and reopen the manufacturer app, then retry</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="offline" style={{ marginBottom: "18px" }}>Device Offline</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Device keeps going offline</td>
                    <td>Weak Wi-Fi/mesh signal at its location</td>
                    <td>Move it closer to the router/hub temporarily to confirm range is the cause; add an extender or mesh node if confirmed</td>
                  </tr>
                  <tr>
                    <td>Device offline after router reboot</td>
                    <td>Router changed channel or IP assignment</td>
                    <td>Power-cycle the device so it re-establishes its connection</td>
                  </tr>
                  <tr>
                    <td>Many devices dropping at once</td>
                    <td>Router device-count limit reached</td>
                    <td>Check your router's maximum connected-device specification, especially with 40+ devices</td>
                  </tr>
                  <tr>
                    <td>Battery device offline intermittently</td>
                    <td>Low battery reducing radio power</td>
                    <td>Replace the battery — many devices show connectivity issues before a full low-battery warning appears</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="wifi-issues" style={{ marginBottom: "18px" }}>Wi-Fi Problems</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Devices randomly disconnect</td>
                    <td>Wi-Fi channel congestion</td>
                    <td>Change your router's Wi-Fi channel, especially in dense apartment buildings with many overlapping networks</td>
                  </tr>
                  <tr>
                    <td>Setup fails at the "connecting to network" step</td>
                    <td>Incorrect Wi-Fi password entered</td>
                    <td>Double-check for typos, especially special characters, and confirm caps lock is off</td>
                  </tr>
                  <tr>
                    <td>Devices far from the router are unreliable</td>
                    <td>Weak signal strength at that location</td>
                    <td>Add a Wi-Fi extender or mesh node covering that area</td>
                  </tr>
                  <tr>
                    <td>MAC filtering blocks new devices</td>
                    <td>Router's MAC allowlist is enabled</td>
                    <td>Temporarily disable MAC filtering during setup, or add the new device's MAC address manually</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="sensor-issues" style={{ marginBottom: "18px" }}>Sensor Not Responding</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Door/window sensor shows wrong state</td>
                    <td>Gap between the two halves exceeds spec</td>
                    <td>Remount the two halves closer together (usually within 10–15mm)</td>
                  </tr>
                  <tr>
                    <td>Motion sensor gives false triggers</td>
                    <td>Faces a window, heater or vent</td>
                    <td>Reposition away from direct sunlight or temperature fluctuation sources</td>
                  </tr>
                  <tr>
                    <td>Motion sensor misses real motion</td>
                    <td>Sensitivity too low or out of range</td>
                    <td>Increase sensitivity in the app, or reposition closer to the walking path</td>
                  </tr>
                  <tr>
                    <td>Sensor completely unresponsive</td>
                    <td>Depleted battery</td>
                    <td>Replace the battery — resolves the large majority of reported sensor failures</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="automation-issues" style={{ marginBottom: "18px" }}>Automation Not Triggering</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Automation didn't run at all</td>
                    <td>A gating condition wasn't met (e.g. "Away" mode was off)</td>
                    <td>Check the automation's conditions against the actual mode/state at the time</td>
                  </tr>
                  <tr>
                    <td>Automation ran partially</td>
                    <td>One device in the chain was offline</td>
                    <td>Confirm every device involved was online — a single offline device can silently break the whole chain</td>
                  </tr>
                  <tr>
                    <td>Automation stopped after a device rename</td>
                    <td>Automation still references the old device name/ID</td>
                    <td>Re-save the automation after renaming any involved device</td>
                  </tr>
                  <tr>
                    <td>Geofencing automation is unreliable</td>
                    <td>Location permission set to "While Using App"</td>
                    <td>Set location permission to "Always Allow" for background geofencing to work</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="voice-issues" style={{ marginBottom: "18px" }}>Voice Command Failure</h2>
            <div className="table-wrap" style={{ marginBottom: "44px" }}>
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
                    <td>Assistant doesn't hear the wake word</td>
                    <td>Background noise or muted mic</td>
                    <td>Reduce ambient noise/distance; confirm the physical mic mute switch is off</td>
                  </tr>
                  <tr>
                    <td>"Couldn't reach that device"</td>
                    <td>Manufacturer account unlinked or device offline</td>
                    <td>Re-link the smart home account under "Works with..." in the assistant app; confirm the device is online</td>
                  </tr>
                  <tr>
                    <td>Assistant mishears a device name</td>
                    <td>Complex or unusual device name</td>
                    <td>Rename the device to something short and easy to pronounce clearly</td>
                  </tr>
                  <tr>
                    <td>Voice command works for one assistant but not another</td>
                    <td>Only one ecosystem account is linked</td>
                    <td>Link the manufacturer account separately in each assistant app, or use a Matter-certified device</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
          <TroubleGroup>
            <h2 id="sync-issues" style={{ marginBottom: "18px" }}>App / Device Synchronization Problems</h2>
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
                    <td>App shows a state that doesn't match reality</td>
                    <td>App cache is stale</td>
                    <td>Pull to refresh, or force-close and reopen the app</td>
                  </tr>
                  <tr>
                    <td>Changes made via voice don't show in the app</td>
                    <td>App hasn't polled for the latest state</td>
                    <td>Refresh the device list; check for a pending app update</td>
                  </tr>
                  <tr>
                    <td>Multiple household members see different device lists</td>
                    <td>Devices added under different accounts</td>
                    <td>Use a shared home/family setup within the app rather than separate personal accounts</td>
                  </tr>
                  <tr>
                    <td>Firmware update stuck "in progress"</td>
                    <td>Weak Wi-Fi during update</td>
                    <td>Move the device closer to the router and retry the update</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TroubleGroup>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow">Still Stuck?</span>
            <h2>Expandable Quick Answers</h2>
          </div>
          <div className="accordion" id="troubleAccordion">
            <AccordionItem>
              <AccordionTrigger>I've tried everything above and the device still won't work — what next?</AccordionTrigger>
              <AccordionPanel>
                <ol>
                  <li>Factory reset the device and start pairing from scratch.</li>
                  <li>Check the manufacturer's support site for a known outage or recall notice.</li>
                  <li>Confirm the device isn't simply defective by testing it at a different location/network if possible.</li>
                  <li>Reach out via the Support page — include the device model and what you've already tried.</li>
                </ol>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>Should I restart my router when troubleshooting any smart device?</AccordionTrigger>
              <AccordionPanel>
                <p>
                  It's a reasonable first step for widespread issues affecting multiple devices, but for a single device, restarting that device first is faster and just as effective in most cases.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Still stuck?</h2>
              <p>Check the FAQ and Glossary, or reach out through the Support page.</p>
            </div>
            <Link href="/faq#support" className="btn btn--primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </TroubleshootingProvider>
  );
}
