import { Suspense } from "react";
import { IBM_Plex_Mono, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccountLink, LoginLink } from "@/components/layout/AccountLink";

// Serif design system typefaces (design.md), self-hosted by next/font.
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata = {
  title: {
    default: "SmartNest — Smart Living, Simplified",
    template: "%s — SmartNest",
  },
  description:
    "SmartNest is the complete smart home technical manual and planning platform: learn the technology, follow real device guides, and build a system that fits your home and budget.",
};

// Applies the saved dark theme before first paint (ivory is the default).
const themeScript = `try{if(localStorage.getItem("sn-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header
          account={
            <Suspense fallback={<LoginLink />}>
              <AccountLink />
            </Suspense>
          }
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
