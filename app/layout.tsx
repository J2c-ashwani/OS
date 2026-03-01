import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Response Audit | Monitor Customer Inquiry Response Times",
  description: "Detect missed customer inquiries and response gaps with automated public channel monitoring. Deploy AI agents to scan your operations, identify leaks, and audit SOPs in under 60 seconds.",
  keywords: "response monitoring, customer inquiry tracking, lead response time, business monitoring, revenue leak detection, SOP compliance, AI audit",
  robots: "index, follow",
  openGraph: {
    title: "Response Audit | Recover Lost Revenue with Agentic AI",
    description: "Deploy intelligent agents to scan your operations. Identify leaks, analyze conversations, and audit SOPs in under 60 seconds.",
    type: "website",
    siteName: "Response Audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Response Audit | Recover Lost Revenue with Agentic AI",
    description: "Deploy intelligent agents to scan your operations. Identify leaks, analyze conversations, and audit SOPs in under 60 seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
