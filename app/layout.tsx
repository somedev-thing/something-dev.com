import type { Metadata } from "next";
import { DM_Sans, Outfit, Lexend, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { EasterEggs } from "@/app/components/EasterEggs";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dustin | Digital Stagehand",
    template: "%s | something-dev.com",
  },
  description: "Websites, bots, game infrastructure, and theater tech built on charmingly inadequate hardware.",
  icons: {
    icon: "/d.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${outfit.variable} ${lexend.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <div className="fixed inset-0 z-[-1] bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
        <Navbar />
        <EasterEggs />
        {children}
        <Footer />
      </body>
    </html>
  );
}
