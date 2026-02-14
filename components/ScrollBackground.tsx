"use client";

import { useEffect, useState } from "react";

export function ScrollBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">
      {/* 
        Optimized for 2015 Mac Pro:
        - Removed active scroll listeners (JS thread heavy)
        - Replaced framer-motion transforms with CSS animations (Compositor thread)
        - Reduced blur radius slightly to save fill-rate
      */}
      
      {/* Toxic Blob 1 - Top Left */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-cyan/10 rounded-full blur-[80px] animate-pulse"
        style={{ animationDuration: "10s" }}
      />

      {/* Warning Blob 2 - Bottom Right */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-accent-lime/10 rounded-full blur-[80px] animate-pulse"
        style={{ animationDuration: "15s", animationDelay: "2s" }}
      />

      {/* Amber Hazard Blob 3 - Center (Subtle) */}
      <div 
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-amber/5 rounded-full blur-[100px]"
      />
      
      {/* Noise Overlay - Static, low cost */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
    </div>
  );
}
