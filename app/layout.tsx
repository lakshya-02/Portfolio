import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AR_One_Sans, Sora } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

const arOneSans = AR_One_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-ar-one-sans",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${arOneSans.variable} scroll-smooth`}
    >
      <body className="bg-void font-body text-ink antialiased">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-pink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            {siteConfig.skipToContent}
          </a>
          <Navbar />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
