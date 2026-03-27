import type { Metadata, Viewport } from "next";
import { EB_Garamond, Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const siteUrl = "https://isweartodog.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A1A",
};

export const metadata: Metadata = {
  title: "I Swear to Dog",
  description:
    "The sacred letters of Nando to Jarvis, revealing the true origin of human intelligence.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "I Swear to Dog",
    description:
      "The sacred letters of Nando to Jarvis, revealing the true origin of human intelligence.",
    url: siteUrl,
    siteName: "I Swear to Dog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Swear to Dog",
    description:
      "The sacred letters of Nando to Jarvis, revealing the true origin of human intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${ebGaramond.variable} ${cormorantGaramond.variable} ${geistSans.variable}`}
    >
      <body className="bg-charcoal font-body text-cream antialiased">
        <svg aria-hidden="true" className="absolute h-0 w-0">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
