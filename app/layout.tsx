import type { Metadata } from "next";
import { Titan_One, Outfit, Lexend, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const titanOne = Titan_One({
  weight: "400",
  variable: "--font-titan",
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
  title: "Dustin | Creative Technologist",
  description: "Fullstack Engineering. Legacy Constraints. Theater Discipline.",
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
        className={`${titanOne.variable} ${outfit.variable} ${lexend.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground pb-24`}
      >
        <div className="fixed inset-0 z-[-1] bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
