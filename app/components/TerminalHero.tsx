"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { config } from "@/lib/config";

export function TerminalHero() {
  const [step, setStep] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]); // Parallax
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400); // Reveal main content
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative perspective-1000 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-void -z-20" />
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-neon-blue/10 to-neon-purple/10 rounded-full blur-[100px] -z-10" 
      />

      {/* 3D Tilting Terminal */}
      <motion.div 
        initial={{ rotateX: 20, rotateY: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-4xl p-1 bg-gradient-to-b from-white/10 to-white/5 rounded-xl backdrop-blur-md shadow-2xl border border-white/10 relative"
      >
        {/* Window Bar */}
        <div className="h-8 bg-black/40 rounded-t-lg flex items-center px-4 gap-2 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="ml-4 text-xs font-mono text-muted-foreground">
            zsh — {config.identity.name.toLowerCase()} — 1440x900
          </div>
        </div>

        {/* Console Content */}
        <div className="p-8 md:p-12 min-h-[400px] bg-black/80 font-mono text-base md:text-lg text-white rounded-b-lg font-mono relative overflow-hidden">
          
          <div className="space-y-2">
            <div className="flex gap-2 text-muted-foreground">
               <span className="text-neon-pink">➜</span>
               <span>~</span>
               <span className="text-neon-blue">init protocol --force</span>
            </div>
            {step >= 1 && (
               <div className="text-muted-foreground/80 pl-4">
                  Loading chaotic dependencies... <span className="text-green-500">Done</span> <br/>
                  Bypassing safety checks... <span className="text-green-500">Done</span> <br/>
                  Mounting volumes... <span className="text-green-500">Done</span>
               </div>
            )}

            {step >= 2 && (
               <div className="flex gap-2 text-muted-foreground mt-4">
                 <span className="text-neon-pink">➜</span>
                 <span>~</span>
                 <span className="text-neon-blue">whoami</span>
               </div>
            )}
            
            {step >= 3 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pl-4 border-l-2 border-neon-purple"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white mb-2">
                         <ScrambleText text="FULLSTACK" hover={false} /> <br />
                         <span className="text-white/50">& THEATER.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-sans mt-4">
                       Logic meets chaos. Running on <span className="text-white font-bold">MacBook Pro 2015</span>. <br/>
                       Powered by spite and caffeine.
                    </p>
                </motion.div>
            )}
          </div>

          {/* Cursor */}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-5 bg-neon-blue inline-block ml-1 align-middle"
          />

        </div>
      </motion.div>
    </section>
  );
}
