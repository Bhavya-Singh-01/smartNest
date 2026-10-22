import Link from "next/link";

export const metadata = {
  title: "Automation Guide",
  description: "Morning, Good Night, Coming Home, Leaving Home, Motion Lighting, Security and Energy-Saving automation routines shown as Trigger → Condition → Action → Result flowcharts.",
};

export default function AutomationPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Automation Guide</div>
          <span className="eyebrow">Automation Guide</span>
          <h1>Automation Guide</h1>
          <p className="lead">
            Seven ready-to-build routines. Each one follows the same structure — Trigger → Condition → Action → Result — plus the devices required and setup notes.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tab-bar">
            <a href="#morning" className="tab-btn">Morning</a> <a href="#goodnight" className="tab-btn">Good Night</a> <a href="#cominghome" className="tab-btn">Coming Home</a> <a href="#leavinghome" className="tab-btn">Leaving Home</a> <a href="#security" className="tab-btn">Security</a> <a href="#motion" className="tab-btn">Motion Lighting</a> <a href="#energy" className="tab-btn">Energy-Saving</a>
          </div>
          <div className="callout callout--info" style={{ marginBottom: "30px" }}>
            <div>
              <strong>How to read these flows</strong>Every routine follows the same four stages: a <strong>Trigger</strong> (what starts it), a <strong>Condition</strong> (what must also be true), an <strong>Action</strong> (what the system does), and a <strong>Result</strong> (the outcome you actually experience).
            </div>
          </div>
          {/* MORNING */}
          <div className="device-guide" id="morning">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Morning Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>Gently wakes the home up on your schedule.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Alarm time reached (6:30 AM, weekdays)</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Someone is home</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Bedroom lights fade in + thermostat shifts to day temp + speaker plays briefing</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>The home is warm, lit and informative before you get out of bed</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Smart bulbs (bedroom)</li>
                  <li>Thermostat or AC controller</li>
                  <li>Smart speaker</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Use a gradual fade (5–10 minutes) rather than an instant switch to avoid a jarring wake-up</li>
                  <li>Add a weekday-only schedule condition to skip weekends automatically</li>
                  <li>Layer in "someone is home" using phone-location presence so the routine skips when you're traveling</li>
                </ul>
              </div>
            </div>
          </div>
          {/* GOOD NIGHT */}
          <div className="device-guide" id="goodnight">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Good Night Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>One command secures and quiets the home for sleep.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Voice command "Good night" or 11 PM schedule</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Front door is currently unlocked</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Lights off (except hallway dim) + door locks + thermostat to night temp + cameras to Night mode</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>Home is dark, locked and monitored without a manual walkthrough</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Smart bulbs (whole home)</li>
                  <li>Smart lock</li>
                  <li>Thermostat</li>
                  <li>Security cameras</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Add a check step that reports back if the door failed to lock, rather than assuming success</li>
                  <li>Keep one low, warm-toned light on a path to the bathroom for safety</li>
                  <li>Consider a confirmation chime or notification so you know the routine actually ran</li>
                </ul>
              </div>
            </div>
          </div>
          {/* COMING HOME */}
          <div className="device-guide" id="cominghome">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l9-9 9 9M5 10v10h14V10"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Coming Home Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>The home responds as you approach, before you reach the door.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Phone enters home geofence (~200m)</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Time is after sunset</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Porch/entryway lights on + thermostat pre-adjusts + door unlocks at arrival</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>You walk into a lit, comfortable, unlocked home with no fumbling for keys</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Smart lock with auto-unlock/geofencing</li>
                  <li>Outdoor + entryway smart bulbs</li>
                  <li>Thermostat</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Geofence radius should be large enough to account for GPS drift (100–300m is typical)</li>
                  <li>Auto-unlock should trigger only for recognized household phones — review who has access periodically</li>
                  <li>Pair with a door sensor so the lock doesn't stay in an "unlocking" state if you don't actually reach the door</li>
                </ul>
              </div>
            </div>
          </div>
          {/* LEAVING HOME */}
          <div className="device-guide" id="leavinghome">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12L12 3 3 12M5 10v10h14V10"></path>
                  <path d="M9 14l3 3 3-3" transform="rotate(180 12 15)"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Leaving Home Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>Secures and de-energizes the home the moment everyone's out.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Last household phone exits geofence</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>No manual "stay in Home mode" override active</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Door locks + all lights off + thermostat to away range + mode switches to "Away"</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>Nothing is left running, the door is locked, and security automations arm themselves</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Smart lock</li>
                  <li>Smart bulbs and plugs</li>
                  <li>Thermostat</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Use "last person leaves," not "first person leaves," to avoid shutting things off while someone's still home</li>
                  <li>Switching to "Away" mode here is what arms the Security Routine below — the two are designed to chain together</li>
                  <li>Send a confirmation notification listing what was turned off, so you can catch anything unexpected</li>
                </ul>
              </div>
            </div>
          </div>
          {/* SECURITY */}
          <div className="device-guide" id="security">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Security Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>Escalating response when the home is set to "Away" and something happens.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Door/window sensor opens, or motion sensor fires</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Home mode is set to "Away"</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Push alert sent + nearest camera records + indoor lights flash</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>You're notified immediately with visual evidence, and a visible deterrent activates</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Door/window sensors</li>
                  <li>Motion sensors</li>
                  <li>Security cameras</li>
                  <li>Smart bulbs</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Always gate this routine behind an explicit "Away" mode — without it, every normal entry triggers a false alarm</li>
                  <li>Test the notification delivery path (not just in-app) so alerts reach you reliably when away from home</li>
                  <li>Consider adding a loud smart speaker chime as an additional deterrent layer</li>
                </ul>
              </div>
            </div>
          </div>
          {/* MOTION LIGHTING */}
          <div className="device-guide" id="motion">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Motion-Based Lighting</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>Hands-free lighting for hallways, bathrooms and closets.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Motion sensor detects movement</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Ambient light level is low</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Light turns on; turns off after 5 minutes of no motion</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>Lights appear exactly when needed and never get left on</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Motion sensor</li>
                  <li>Smart bulb or switch</li>
                  <li>Optional: light-level (lux) sensor</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Use the ambient-light condition to avoid the light triggering unnecessarily during the day</li>
                  <li>Set the "no motion" timeout based on room use — 2–3 minutes for a hallway, 10+ minutes for a home office</li>
                  <li>For a nightlight-style effect, cap brightness lower during late-night hours specifically</li>
                </ul>
              </div>
            </div>
          </div>
          {/* ENERGY SAVING */}
          <div className="device-guide" id="energy">
            <div className="device-guide-head">
              <div className="device-icon-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"></path>
                </svg>
              </div>
              <div>
                <h2 className="mb-0">Energy-Saving Routine</h2>
                <p className="mb-0" style={{ fontSize: "0.88rem" }}>Automatically reduces waste when nobody's around to notice.</p>
              </div>
            </div>
            <div className="flow">
              <div className="flow-node trigger"><strong>Trigger</strong>Energy monitor detects a high-draw device left on</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node condition"><strong>Condition</strong>Home mode is "Away"</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node action"><strong>Action</strong>Push notification sent with a remote-off option</div>
              <div className="flow-arrow">→</div>
              <div className="flow-node result"><strong>Result</strong>Wasted electricity is caught and stopped the same day, not at month-end billing</div>
            </div>
            <div className="device-guide-body">
              <div>
                <span className="subhead">Devices Needed</span>
                <ul>
                  <li>Smart plugs (with energy monitoring where possible)</li>
                  <li>Thermostat or AC controller</li>
                  <li>Smart bulbs</li>
                </ul>
              </div>
              <div>
                <span className="subhead">Setup Notes</span>
                <ul>
                  <li>Exclude essential always-on devices (router, refrigerator, medical equipment) from any "turn everything off" action</li>
                  <li>This routine complements Leaving Home — that one turns things off proactively, this one catches what slipped through</li>
                  <li>Review the monthly energy report to confirm the routine is actually reducing usage, not just running</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Automations are only as good as the setup behind them</h2>
              <p>Make sure your devices are configured correctly and securely before layering on automations.</p>
            </div>
            <Link href="/security" className="btn btn--primary">Go to Security &amp; Privacy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
