import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-12 scroll-m-20 font-bold tracking-tight text-white mb-6 font-display",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-white/10 pb-2 font-semibold tracking-tight first:mt-0 text-white font-display",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 font-semibold tracking-tight text-white font-display",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground font-sans", className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    return (
      <Link
        className={cn("font-medium text-neon-blue underline underline-offset-4 decoration-neon-blue/30 hover:decoration-neon-blue transition-all inline-flex items-center gap-1", className)}
        href={href || "#"}
        target={isExternal ? "_blank" : undefined}
        {...props}
      >
        {props.children}
        {isExternal && <ArrowUpRight size={14} className="opacity-50" />}
      </Link>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc space-y-2 text-muted-foreground marker:text-neon-blue", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal space-y-2 text-muted-foreground marker:text-neon-pink marker:font-bold", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("relative pl-2 text-muted-foreground", className)} {...props}>
       {props.children}
    </li>
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-neon-purple pl-6 italic text-white/80 bg-white/5 py-4 pr-4 rounded-r-lg",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 md:my-12 border-white/10" {...props} />,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-white/10 px-[0.3rem] py-[0.1rem] font-mono text-[0.9em] font-bold text-neon-yellow inline-block align-middle",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border border-white/10 bg-[#050505] p-4 text-sm font-mono leading-relaxed text-white/80 shadow-2xl",
        className
      )}
      {...props}
    />
  ),
  Image: ({ className, alt, ...props }: React.ComponentProps<typeof Image>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-white/5">
        <Image
            className={cn("w-full h-auto object-cover transition-transform hover:scale-105 duration-700", className)}
            alt={alt}
            width={800}
            height={400}
            {...props}
        />
        {alt && <p className="p-2 text-center text-xs text-muted-foreground bg-black/50 backdrop-blur-sm border-t border-white/5">{alt}</p>}
    </div>
  ),
};
