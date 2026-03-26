import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I Swear to Dog",
  description:
    "The sacred letters of Nando to Jarvis, revealing the true origin of the human species.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
