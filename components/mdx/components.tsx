import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

export const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight font-display text-gradient",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-glass-border pb-1 text-3xl font-semibold tracking-tight first:mt-0 font-display",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-accent-lime pl-6 italic text-foreground opacity-80",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    // We just pass children because `pre` usually wraps `code`
    <div className={cn("mt-6 mb-4", className)} {...props as React.HTMLAttributes<HTMLDivElement>} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // If it's inline code (no children array usually, or simple text), style it simply
    // But standard MDX passes `className` for language to the code block
    // We will use our CodeBlock for block-level code usually found inside `pre`
    // However, next-mdx-remote often renders `pre > code`. 
    // Let's check if it has a classname (language).
    const isBlock = className?.includes("language-");
    
    if (isBlock) {
      return <CodeBlock className={className} {...props} />;
    }

    return (
        <code
          className={cn(
            "relative rounded bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm border border-glass-border text-accent-cyan",
            className
          )}
          {...props}
        />
    );
  },
};
