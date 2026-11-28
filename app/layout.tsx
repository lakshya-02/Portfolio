import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

// Apple devices use SF Pro and SF Mono from the system (see globals.css).
// These are fallbacks for everyone else, so they are not preloaded: a browser
// only downloads them when the system fonts ahead of them in the stack are missing.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}, ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`}>
      <body className="bg-void font-body text-ink antialiased">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-xs focus:text-void"
          >
            {siteConfig.skipToContent}
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
