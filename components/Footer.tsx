import Link from "next/link";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 pb-8 pt-20 md:px-12 md:pt-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-16 border-b border-white/10 pb-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_#a3e635]" />
              Available when the fans are quiet
            </div>
            <h2 className="max-w-4xl font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              LET&apos;S MAKE THE INTERNET
              <span className="text-white/20"> LESS BORING.</span>
            </h2>
            <Link
              href={`mailto:${config.identity.email}`}
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#ff5c35] pb-1 font-display text-xl font-bold text-[#ff5c35]"
            >
              {config.identity.email}
              <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 self-end sm:grid-cols-3">
            <div>
              <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">Navigate</div>
              <div className="space-y-3">
                {config.nav.map((link) => (
                  <Link key={link.name} href={link.href} className="block font-nav text-sm font-bold text-white/50 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">Elsewhere</div>
              <div className="space-y-3">
                {config.socials.slice(0, 5).map((social) => (
                  <Link key={social.name} href={social.url} target="_blank" className="flex items-center gap-2 font-nav text-sm font-bold text-white/50 transition-colors hover:text-white">
                    <social.icon size={15} weight="fill" />
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">Questionable</div>
              <div className="space-y-3">
                <Link href="/backstage" className="block font-nav text-sm font-bold text-white/12 transition-colors hover:text-[#ff5c35]">
                  Do not click
                </Link>
                <Link href="/horse.exe" className="block font-nav text-sm font-bold text-white/12 transition-colors hover:text-lime-300">
                  horse.exe
                </Link>
                <span className="block font-mono text-[9px] leading-relaxed text-white/15">
                  ↑ Legal advised against both
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-b border-white/10 py-7">
          <div className="whitespace-nowrap font-display text-[clamp(4rem,13vw,13rem)] font-black leading-[0.72] tracking-[-0.085em] text-white">
            SOMETHING<span className="text-[#ff5c35]">/</span>DEV
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 font-mono text-[9px] uppercase tracking-[0.16em] text-white/22 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Dustin. Built on 8 GB and poor impulse control.</div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href={config.identity.repo} target="_blank" className="flex items-center gap-2 transition-colors hover:text-white">
              <GithubLogo size={14} weight="fill" /> Source
            </Link>
            <span>MacBook Pro 12,1</span>
            <span title="Try typing RICK">v2.0.15</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
