"use client";

import { Check, Clipboard } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract text content safely to copy
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (typeof node === "object" && node !== null && "props" in node) {
      return getTextContent((node as any).props.children);
    }
    return "";
  };

  const onCopy = () => {
    const text = getTextContent(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 group rounded-xl overflow-hidden border border-glass-border bg-[#0a0c10] shadow-2xl">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-glass-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error/80" />
          <div className="w-3 h-3 rounded-full bg-warning/80" />
          <div className="w-3 h-3 rounded-full bg-success/80" />
        </div>
        <div className="text-xs font-mono text-muted-foreground opacity-50">
          bash — 80x24
        </div>
        <button
          onClick={onCopy}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <code className={cn("font-mono text-sm leading-relaxed", className)} {...props}>
          {children}
        </code>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-transparent group-hover:ring-white/5 transition-all duration-500 rounded-xl" />
    </div>
  );
}
