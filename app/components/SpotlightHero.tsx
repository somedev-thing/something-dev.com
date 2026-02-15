"use client";

import { motion } from "framer-motion";

export function SpotlightHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-32">
      
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-blue/20 rounded-full blur-[120px] -z-10 opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >

        <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tight text-white mb-6 relative z-10">
          FULLSTACK <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">
            & THEATER.
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
          The <span className="text-white">Digital Stage</span>. Building robust software on <br className="hidden md:block"/> 
          legacy hardware (MBP 2015) with theater-grade discipline.
        </p>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12"
        >
             <div className="w-[1px] h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0 mx-auto" />
        </motion.div>

      </motion.div>
      
      {/* Visual blending with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-0" />
    </section>
  );
}
