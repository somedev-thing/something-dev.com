import Link from "next/link";
import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xl font-display mb-2">{config.identity.siteName}</h4>
                <p className="text-muted-foreground text-sm font-sans max-w-xs">
                    Built with hate, love, and legacy hardware. <br/>
                    © {new Date().getFullYear()} {config.identity.name}. All rights reserved.
                </p>
            </div>

            <nav className="flex items-center gap-8">
                <Link href="/about" className="text-muted-foreground hover:text-white transition-colors text-sm font-bold font-sans">LORE</Link>
                <Link href="/projects" className="text-muted-foreground hover:text-white transition-colors text-sm font-bold font-sans">WORK</Link>
                <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors text-sm font-bold font-sans">LOGS</Link>
                <Link href="/uses" className="text-muted-foreground hover:text-white transition-colors text-sm font-bold font-sans">SETUP</Link>
            </nav>

            <div className="flex gap-4">
                 {config.socials.map((social) => (
                    <Link key={social.name} href={social.url} target="_blank" className="text-muted-foreground hover:text-white transition-colors">
                        <social.icon size={24} weight="fill" />
                    </Link>
                 ))}
            </div>

        </div>
    </footer>
  );
}
