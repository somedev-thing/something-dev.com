"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, List, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoClicks = useRef<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((time) => now - time < 2400), now];
    if (logoClicks.current.length >= 5) {
      event.preventDefault();
      logoClicks.current = [];
      router.push("/backstage");
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[1500px] items-center justify-between rounded-2xl border px-4 transition-all duration-300 md:px-5",
            scrolled
              ? "border-white/10 bg-[#080808]/88 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
              : "border-transparent bg-transparent py-4"
          )}
        >
          <Link href="/" onClick={handleLogoClick} className="group flex items-center gap-3" aria-label="something-dev.com home">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-sm font-black text-black">
              D
              <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[#ff5c35] transition-transform group-hover:scale-[2.4]" />
            </span>
            <span className="hidden font-display text-sm font-black leading-none tracking-[-0.035em] text-white sm:block">
              SOMETHING<br />
              <span className="text-white/35">DEV</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.025] p-1 md:flex" aria-label="Main navigation">
            {config.nav.map((link, index) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-nav text-xs font-bold transition-colors",
                    active ? "bg-white text-black" : "text-white/48 hover:text-white"
                  )}
                >
                  <span className={cn("mr-1.5 font-mono text-[8px]", active ? "text-black/40" : "text-white/20")}>
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">Berlin time / probably awake</span>
            <Link
              href={`mailto:${config.identity.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff5c35] px-4 py-2.5 font-nav text-xs font-bold text-black transition-transform hover:scale-105"
            >
              Make trouble
              <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#080808] px-6 pb-8 pt-28 md:hidden"
          >
            <div className="project-grid absolute inset-0 opacity-35" />
            <nav className="relative flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
              {config.nav.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border-t border-white/10 py-5 last:border-b"
                >
                  <span className="font-display text-4xl font-black tracking-[-0.05em] text-white transition-colors group-hover:text-[#ff5c35]">
                    {link.name}
                  </span>
                  <span className="font-mono text-xs text-white/25">{(index + 1).toString().padStart(2, "0")}</span>
                </Link>
              ))}
            </nav>
            <div className="relative flex items-end justify-between border-t border-white/10 pt-6">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                Five logo taps<br />may void your warranty
              </div>
              <Link href={`mailto:${config.identity.email}`} className="rounded-full bg-[#ff5c35] px-5 py-3 font-nav text-sm font-bold text-black">
                Say hello
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
