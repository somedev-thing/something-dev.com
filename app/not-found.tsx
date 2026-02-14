"use client";

import Link from "next/link";
import { Warning, ArrowUUpLeft, Cube, Skull } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="h-screen w-full bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative font-mono">
      
      {/* Background Noise/Scanlines */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-[#050505] to-[#050505] opacity-50" />

      <div className="max-w-2xl w-full border border-white/10 bg-black/50 backdrop-blur-3xl rounded-[2rem] p-10 relative z-20 shadow-2xl">
        
        <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Skull size={40} weight="duotone" className="text-red-500" />
            </div>
        </div>

        <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-display">
                404
            </h1>
            <h2 className="text-xl text-red-500 font-bold uppercase tracking-widest font-sans">
                Critical Failure
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto font-sans">
                You have ventured into the void. This page does not exist. 
                Maybe I deleted it. Maybe you typed it wrong. 
                Either way, it's gone.
            </p>
        </div>

        <div className="mt-12 flex justify-center">
            <Link 
                href="/"
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 font-sans"
            >
                <ArrowUUpLeft weight="bold" />
                Return to Safety
            </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-muted-foreground opacity-50 font-mono">
                ERROR_CODE: ID_10_T // USER_ERROR // LEGACY_ROUTING_EXCEPTION
            </p>
        </div>

      </div>
    </main>
  );
}
