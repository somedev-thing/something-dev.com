"use client";

import { motion } from "framer-motion";
import { CaretRight, CheckCircle } from "@phosphor-icons/react";

export function Hero() {
  const steps = [
    { text: "Initializing chaos...", delay: 0.5 },
    { text: "Bypassing safety protocols...", delay: 1.5 },
    { text: "Deploying to production...", delay: 2.5 },
    { text: "Done.", delay: 3.5 },
  ];

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center relative px-6 pt-20">
      <div className="max-w-4xl w-full">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="glass-panel p-1 rounded-2xl overflow-hidden shadow-2xl shadow-accent-primary/10 border border-accent-primary/20"
         >
            {/* Fake Terminal Header */}
            <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5 dragging-none select-none">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs font-mono text-muted-foreground/70">deploy.sh — -zsh — 80x24</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-8 md:p-12 font-mono text-sm md:text-base space-y-6 min-h-[400px] flex flex-col bg-black/40 backdrop-blur-3xl">
                <div>
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: step.delay }}
                            className="flex items-center gap-3 text-muted-foreground/80 mb-3 last:mb-0"
                        >
                            <CaretRight className="text-accent-primary flex-shrink-0" weight="bold" /> 
                            <span className={i === steps.length - 1 ? "text-accent-primary font-bold" : ""}>{step.text}</span>
                            {i < steps.length - 1 && (
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: step.delay + 0.8 }}
                                >
                                    <CheckCircle className="text-accent-secondary inline ml-2" weight="fill" />
                                </motion.span>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4 }}
                    className="mt-auto pt-10 border-t border-white/10"
                >
                    <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
                        I break things <br />
                        <span className="text-gradient">in production.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                        Fullstack Developer. Digital Hoarder. <br />
                        <span className="text-accent-primary italic">"Testing is for doubters."</span>
                    </p>
                </motion.div>
            </div>
         </motion.div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
