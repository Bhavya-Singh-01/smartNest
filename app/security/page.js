import Link from "next/link";
import { Checklist } from "@/components/ui/Checklist";

export const metadata = {
  title: "Security & Privacy",
  description: "Secure Wi-Fi, strong passwords, 2FA, firmware updates, device permissions, camera privacy, data protection, guest networks, safe device disposal and a security checklist.",
};

export default function SecurityPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Security &amp; Privacy</div>
          <span className="eyebrow">Security &amp; Privacy</span>
          <h1>Security &amp; Privacy</h1>
          <p className="lead">
            A smart home is only as secure as its weakest device. This page is the checklist we reference from every device and installation guide — read it once, then apply it everywhere.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="card" id="passwords">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Strong, Unique Passwords</h3>
              <p>
                Use a different password for every manufacturer account — reused passwords mean one breach anywhere compromises every linked device. A password manager makes this practical.
              </p>
              <div className="tag-row"><span className="tag tag--primary">Foundational</span></div>
            </div>
            <div className="card" id="2fa">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </div>
              <h3>Two-Factor Authentication</h3>
              <p>
                Enable 2FA on every manufacturer account that offers it, especially for locks, cameras and hubs. An authenticator app is stronger than SMS-based codes, which can be intercepted via SIM-swap attacks.
              </p>
              <div className="tag-row"><span className="tag tag--primary">Foundational</span></div>
            </div>
            <div className="card" id="wifi">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 19.5h.01"></path>
                </svg>
              </div>
              <h3>Secure Wi-Fi Configuration</h3>
              <p>
                Use WPA2 or WPA3 encryption (never open or WEP networks), change the router's default admin password, and consider a separate guest/IoT network segment for smart devices.
              </p>
              <div className="tag-row"><span className="tag tag--primary">Foundational</span></div>
            </div>
            <div className="card" id="firmware">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"></path>
                </svg>
              </div>
              <h3>Firmware Updates</h3>
              <p>
                Enable automatic firmware updates where offered. Manufacturers patch newly discovered vulnerabilities through firmware — an unpatched device is a known, documented risk, not a theoretical one.
              </p>
              <div className="tag-row"><span className="tag tag--accent">Ongoing</span></div>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="3"></rect>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <h3>Device Permissions</h3>
              <p>
                Review what each smart home app can access — location, contacts, microphone, camera roll — and revoke anything not essential to the device's function.
              </p>
              <div className="tag-row"><span className="tag tag--accent">Ongoing</span></div>
            </div>
            <div className="card" id="camera-privacy">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8a2 2 0 0 1 2-2h3l2-2h4l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>
                  <circle cx="12" cy="13" r="3.5"></circle>
                </svg>
              </div>
              <h3>Camera Privacy</h3>
              <p>
                Never place cameras in bedrooms or bathrooms. Mask or avoid pointing lenses at neighboring windows and public streets, and disclose indoor cameras to household members and guests.
              </p>
              <div className="tag-row"><span className="tag tag--warn">Privacy</span></div>
            </div>
            <div className="card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
                  <path d="M4 5v14a8 3 0 0 0 16 0V5"></path>
                </svg>
              </div>
              <h3>Data Protection</h3>
              <p>
                Understand what data each device collects (video, audio, usage patterns, location) and where it's stored. Prefer devices offering local storage or processing for sensitive data like camera footage.
              </p>
              <div className="tag-row"><span className="tag tag--warn">Privacy</span></div>
            </div>
            <div className="card" id="guest-network">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Guest Networks &amp; Segmentation</h3>
              <p>
                Where your router supports it, put IoT devices on a separate guest network or VLAN, and give visitors a different network entirely, so a compromised device or guest's phone can't directly reach your computers or phones.
              </p>
              <div className="tag-row">Advanced</div>
            </div>
            <div className="card" id="disposal">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z"></path>
                </svg>
              </div>
              <h3>Safe Device Disposal</h3>
              <p>
                Before selling, gifting or recycling any smart device, factory reset it and remove it from your manufacturer account and any linked ecosystem apps. Wipe stored Wi-Fi credentials and, for cameras/locks, delete access logs and user codes.
              </p>
              <div className="tag-row">Advanced</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt" id="checklist">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Interactive Checklist</span>
            <h2>Basic Smart-Home Security Checklist</h2>
            <p>Run through this once for your whole setup, and again for every new device you add.</p>
          </div>
          <Checklist style={{ maxWidth: "760px", margin: "0 auto" }}
            items={[
              { id: "sec-1", label: <>Router uses WPA2 or WPA3 encryption, not WEP or open</> },
              { id: "sec-2", label: <>Router's default admin password has been changed</> },
              { id: "sec-3", label: <>Every manufacturer account uses a unique, strong password</> },
              { id: "sec-4", label: <>Two-factor authentication enabled wherever offered</> },
              { id: "sec-5", label: <>Automatic firmware updates enabled, or a manual check scheduled</> },
              { id: "sec-6", label: <>App permissions reviewed and minimized for each device</> },
              { id: "sec-7", label: <>Camera fields of view checked for neighboring windows/public paths</> },
              { id: "sec-8", label: <>Factory-default PIN codes removed from locks</> },
              { id: "sec-9", label: <>IoT devices separated onto a guest network/VLAN where possible</> },
              { id: "sec-10", label: <>Every device named clearly and assigned to the correct room/group</> },
            ]}
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Something not working right?</h2>
              <p>The Troubleshooting Center covers connectivity, pairing and device-specific problems.</p>
            </div>
            <Link href="/troubleshooting" className="btn btn--primary">Open Troubleshooting Center</Link>
          </div>
        </div>
      </section>
    </>
  );
}
