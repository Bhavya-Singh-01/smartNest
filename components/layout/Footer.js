import Link from "next/link";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="brand">
              <span className="logo-mark">SN</span>
              <span className="brand-word">
                <span style={{ display: "block" }}>SmartNest</span>
                <small>Smart Living, Simplified</small>
              </span>
            </Link>
            <p style={{ fontSize: "0.88rem", maxWidth: "280px" }}>
              SmartNest is an independent technical manual and planning platform for smart home technology — built for homeowners, renters, students and hobbyists who want to automate with confidence.
            </p>
          </div>
          <div className="footer-col">
            <h4>Manual</h4>
            <Link href="/basics">Smart Home Basics</Link>
            <Link href="/devices">Device Manual</Link>
            <Link href="/installation">Installation &amp; Setup</Link>
            <Link href="/automation">Automation Guide</Link>
            <Link href="/security">Security &amp; Privacy</Link>
            <Link href="/troubleshooting">Troubleshooting</Link>
          </div>
          <div className="footer-col">
            <h4>Plan &amp; Compare</h4>
            <Link href="/build">Build Your Smart Home</Link>
            <Link href="/planner">Smart Home Planner</Link>
            <Link href="/compare">Device Comparison</Link>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <Link href="/#about">SmartNest Solutions</Link>
            <Link href="/#about">Consultation &amp; Device Selection</Link>
            <Link href="/#about">Installation &amp; Automation Setup</Link>
            <Link href="/#about">Ongoing Maintenance</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/faq#glossary">Glossary</Link>
            <Link href="/faq#support">Contact Support</Link>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer &amp; safety note:</strong> SmartNest is an independent technical manual, not a manufacturer or installer. Always follow the safety instructions and specifications included with your specific device — they take precedence over general guidance on this site. Any work involving household electrical wiring should be performed or verified by a licensed electrician.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© <CurrentYear /> SmartNest. All rights reserved.</span>
          <span>Built as an independent technical manual &amp; planning platform.</span>
        </div>
      </div>
    </footer>
  );
}
