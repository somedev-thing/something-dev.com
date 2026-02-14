"use client";

import { motion } from "framer-motion";
import { CircleNotch, Lightning } from "@phosphor-icons/react";

export default function ComingSoonPage() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 p-12 glass-panel rounded-3xl border border-accent-primary/20 shadow-[0_0_50px_rgba(0,114,255,0.1)]">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CircleNotch size={64} className="text-accent-primary" />
          </motion.div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Lightning size={24} weight="fill" className="text-white" />
          </motion.div>
        </div>

        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-white"
          >
            Deploying to Prod...
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-mono"
          >
            Current Status: <span className="text-accent-primary animate-pulse">DNS_PROPAGATION</span>
          </motion.p>
        </div>

        {/* Fake Progress Bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent-primary"
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 10, ease: "circOut" }}
          />
        </div>

        <p className="text-xs text-muted-foreground/50 max-w-xs text-center">
            If you are seeing this, the domain works but the code doesn't. 
            Check back when I feel like finishing it.
        </p>
      </div>
    </main>
  );
}
