"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const tickerItems = [
  ["Websites that load", "#ff5c35"],
  ["Infrastructure that stays up", "#a3e635"],
  ["Discord bots with manners", "#8b5cf6"],
  ["Minecraft, but better", "#3b82f6"],
  ["Theater after midnight", "#facc15"],
  ["2015 MacBook Pro", "#f8fafc"],
  ["Eight gig survivor", "#fb7185"],
  ["German FiveM cities", "#ef4444"],
  ["Actually free software", "#22d3ee"],
  ["Zero coffee involved", "#fb923c"],
];

function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {tickerItems.map(([label, color]) => (
        <div key={label} className="flex items-center gap-5 border-r border-white/10 px-7 py-4">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SpotlightHero() {
  return (
    <>
      <section className="relative min-h-[100svh] px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
        <div className="pointer-events-none absolute inset-0 project-grid opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="pointer-events-none absolute left-[56%] top-[43%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5c35]/15 blur-[130px]" />
        <div className="pointer-events-none absolute right-[3%] top-[18%] h-52 w-52 rounded-full border border-[#a3e635]/20" />
        <div className="pointer-events-none absolute right-[6%] top-[22%] h-40 w-40 rounded-full border border-[#a3e635]/10" />

        <div className="relative mx-auto flex min-h-[calc(100svh-13rem)] max-w-[1500px] flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-between border-b border-white/10 pb-5"
          >
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 md:text-xs">
              Dustin / Fullstack developer
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime-300 md:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
              </span>
              Taking on good trouble
            </div>
          </motion.div>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 min-w-0"
            >
              <h1 className="font-display text-[clamp(4.25rem,10.8vw,10.75rem)] font-black leading-[0.82] tracking-[-0.075em] text-white">
                <span className="block py-[0.055em]">WEIRD IDEAS.</span>
                <span className="block py-[0.055em] text-white/24">SERIOUS</span>
                <span className="block bg-gradient-to-r from-[#ff5c35] via-[#facc15] to-[#a3e635] bg-clip-text py-[0.055em] text-transparent">
                  UPTIME.
                </span>
              </h1>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="relative z-10 self-end border-l border-white/15 pl-6 lg:mb-8 lg:pl-8"
            >
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff5c35]">What I do</div>
              <p className="text-lg leading-relaxed text-white/65 md:text-xl">
                Websites, game infrastructure, bots, mods, and digital theater work that survives contact with actual humans.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/35">
                Built on a dual-core 2015 MacBook Pro with eight gigs of RAM and absolutely no sense of proportion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#work" className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 font-nav text-sm font-bold text-black transition-colors hover:bg-[#a3e635]">
                  See the work <ArrowDown weight="bold" className="transition-transform group-hover:translate-y-0.5" />
                </Link>
                <Link href="/blog/hello-world" className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 font-nav text-sm font-bold text-white transition-colors hover:bg-white/10">
                  Read the rant <ArrowUpRight weight="bold" />
                </Link>
              </div>
            </motion.aside>
          </div>

          <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
            {[
              ["12,1", "MacBook model"],
              ["8 GB", "Total memory"],
              ["4", "New releases"],
              ["0", "Cups of coffee"],
            ].map(([value, label]) => (
              <div key={label} className="border-white/10 px-4 py-5 even:border-l md:border-l md:first:border-l-0 md:px-6">
                <div className="text-2xl font-black tracking-tight text-white">{value}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden border-y border-white/10 bg-[#0a0a0a]">
        <div className="ticker-track">
          <TickerGroup />
          <TickerGroup hidden />
        </div>
      </div>
    </>
  );
}
