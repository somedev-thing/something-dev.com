"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GithubLogo, DiscordLogo, List, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  return (
    <>
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-black/50 backdrop-blur-xl border-white/5 py-4" 
        : "bg-transparent border-transparent py-8"
    )}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50" onClick={() => setMobileOpen(false)}>
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
                <Image 
                    src="/d.png" 
                    alt="Dustin Logo" 
                    fill 
                    className="object-contain"
                />
            </div>
            <span className={cn(
                "text-lg font-bold text-white transition-opacity font-display",
                scrolled || mobileOpen ? "opacity-100" : "opacity-0 md:opacity-100"
            )}>
                {config.identity.siteName.toUpperCase().replace(".COM", "").replace("-", " ")}
            </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 bg-white/5 backdrop-blur-md border border-white/5 rounded-full px-6 py-2">
            {config.nav.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href} 
                    className={cn(
                        "text-sm font-bold transition-colors font-nav", 
                        pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
        
        {/* Desktop Socials / CTA */}
        <div className="hidden md:flex items-center gap-4">
             <Link 
                href="https://github.com/somedev-thing" 
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white hover:text-black transition-all border border-white/10"
            >
                <GithubLogo size={20} weight="fill" />
            </Link>
             <Link 
                href="https://dscrd.wtf/?from=something-dev" 
                target="_blank"
                className="group relative px-6 py-2 rounded-full font-bold font-nav overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(88,101,242,0.5)] hover:shadow-[0_0_40px_rgba(88,101,242,0.7)]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#404EED] opacity-100 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] via-white to-[#5865F2] opacity-0 group-hover:opacity-20 animate-shine" />
                <span className="relative z-10 text-white flex items-center gap-2">
                    <DiscordLogo weight="fill" /> dscrd.wtf
                </span>
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
        >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
        </button>

      </div>
    </nav>

    {/* Mobile Overlay */}
    <AnimatePresence>
        {mobileOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 md:hidden"
            >
                {config.nav.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-4xl font-bold font-display text-white hover:text-neon-blue transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}

                <div className="flex gap-6 mt-8">
                     <Link 
                        href="https://github.com/somedev-thing" 
                        target="_blank"
                        className="p-4 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all"
                    >
                        <GithubLogo size={32} weight="fill" />
                    </Link>
                     <Link 
                        href="https://dscrd.wtf" 
                        target="_blank"
                        className="p-4 rounded-full bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all"
                    >
                        <DiscordLogo size={32} weight="fill" />
                    </Link>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
