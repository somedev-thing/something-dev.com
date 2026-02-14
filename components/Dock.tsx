"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, User, Code, Skull, Desktop, Article } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Dock() {
  const pathname = usePathname();

  const items = [
    { name: "Home", href: "/", icon: House },
    { name: "About", href: "/about", icon: User },
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Graveyard", href: "/graveyard", icon: Skull },
    { name: "Uses", href: "/uses", icon: Desktop },
    { name: "Rants", href: "/blog", icon: Article },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-full shadow-2xl shadow-accent-cyan/10 ring-1 ring-white/5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative p-3 rounded-full transition-all duration-300 group hover:bg-white/10",
                isActive ? "text-accent-cyan bg-white/5" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute inset-0 border border-accent-cyan/50 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon size={24} weight={isActive ? "duotone" : "regular"} className="relative z-10" />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 border border-white/10 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
