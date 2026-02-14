import Link from "next/link";
import { config } from "@/lib/config";
import { GitCommit } from "@phosphor-icons/react/dist/ssr";

async function getLatestCommit() {
  try {
    const res = await fetch("https://api.github.com/repos/somedev-thing/something-dev.com/commits/main", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function Footer() {
  const commit = await getLatestCommit();
  const shortHash = commit ? commit.sha.substring(0, 7) : "HEAD";
  const message = commit ? commit.commit.message.split("\n")[0] : "Latest Build";

  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="text-center md:text-left">
                <Link href={config.identity.repo} target="_blank" className="group">
                    <h4 className="text-white font-bold text-xl font-display mb-2 group-hover:text-neon-blue transition-colors">
                        {config.identity.siteName}
                    </h4>
                </Link>
                
                <div className="text-muted-foreground text-sm font-sans max-w-xs space-y-2">
                    <p>Built with hate, love, and legacy hardware.</p>
                    
                    {/* Github Commit Data */}
                     <Link href={`${config.identity.repo}/commit/${commit?.sha || ""}`} target="_blank" className="inline-flex items-center gap-2 text-xs font-mono bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white/70">
                        <GitCommit />
                        <span>{shortHash}</span>
                        <span className="opacity-50">|</span>
                        <span className="truncate max-w-[150px]">{message}</span>
                     </Link>

                    <p>© {new Date().getFullYear()} {config.identity.name}. All rights reserved.</p>
                </div>
            </div>

            <nav className="flex items-center gap-8">
                {config.nav.map((link) => (
                    <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-white transition-colors text-sm font-bold font-sans uppercase">
                        {link.name}
                    </Link>
                ))}
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
