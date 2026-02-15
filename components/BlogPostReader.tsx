"use client";

import { useState, useEffect } from "react";
import { TextAa, Moon, Sun, Palette } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPostReaderProps {
  children: React.ReactNode;
}

export function BlogPostReader({ children }: BlogPostReaderProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [accent, setAccent] = useState<"blue" | "pink" | "green" | "purple">("purple");
  const [controlsOpen, setControlsOpen] = useState(false);

  // Apply accent color variable to the article container
  const accentColors = {
    blue: "#00f3ff",
    pink: "#ff00ff",
    green: "#00ff9f",
    purple: "#bd00ff",
  };

  const fontSizes = {
    sm: "prose-base",
    base: "prose-lg",
    lg: "prose-xl",
  };

  return (
    <div 
        className="relative"
        style={{ "--accent-color": accentColors[accent] } as React.CSSProperties}
    >
        {/* Floating Controls Toggle */}
        <motion.button
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl"
            onClick={() => setControlsOpen(!controlsOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Palette size={24} weight="fill" />
        </motion.button>

        {/* Controls Menu */}
        <AnimatePresence>
            {controlsOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-24 right-8 z-50 bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-64 space-y-6"
                >
                    {/* Font Size Control */}
                    <div>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 block">Text Size</span>
                        <div className="flex bg-white/5 rounded-lg p-1">
                            {(["sm", "base", "lg"] as const).map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={cn(
                                        "flex-1 py-2 rounded-md transition-all text-white flex items-center justify-center",
                                        fontSize === size ? "bg-white/10 shadow-sm" : "hover:bg-white/5 text-white/50"
                                    )}
                                >
                                    <TextAa size={size === "sm" ? 16 : size === "base" ? 20 : 24} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Accent Color Control */}
                    <div>
                         <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 block">System Color</span>
                         <div className="flex justify-between gap-2">
                            {(Object.keys(accentColors) as Array<keyof typeof accentColors>).map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setAccent(color)}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                                        accent === color ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-100"
                                    )}
                                    style={{ backgroundColor: accentColors[color] }}
                                />
                            ))}
                         </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Article Content Wrapper */}
        <div className={cn(
            "prose prose-invert max-w-none transition-all duration-300",
            fontSizes[fontSize],
            // Custom CSS variables injection for dynamic styling
            "[&_h1]:text-[var(--accent-color)] [&_code]:text-[var(--accent-color)] [&_a]:text-[var(--accent-color)] [&_a]:decoration-[var(--accent-color)]/30 [&_blockquote]:border-[var(--accent-color)]"
        )}>
            {children}
        </div>
    </div>
  );
}
