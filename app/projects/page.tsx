import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Code,
  DiscordLogo,
  GameController,
  GithubLogo,
  Globe,
  Lightning,
  Play,
  SpotifyLogo,
} from "@phosphor-icons/react/dist/ssr";

const projects = [
  {
    title: "nordverkehr.xyz",
    kicker: "Digital city limits",
    description: "A German FiveM roleplay server. I provide the website and the infrastructure, which is a polite way of saying I keep the city online when everyone else is driving into lamp posts.",
    link: "https://nordverkehr.xyz",
    tags: ["FiveM", "Website", "Infrastructure"],
    color: "#ff3b30",
    glow: "rgba(255, 59, 48, .18)",
    icon: GameController,
    year: "2026",
    size: "lg:col-span-2",
  },
  {
    title: "atlasmods.org",
    kicker: "Free, somehow",
    description: "Minecraft plugins and mods so good there is no way they are actually free. Except they are. Capitalism takes a brief lunch break.",
    link: "https://atlasmods.org",
    tags: ["Minecraft", "Java", "Open access"],
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, .18)",
    icon: Code,
    year: "2026",
    size: "",
  },
  {
    title: "vye.lol",
    kicker: "Nyra grew up",
    description: "nyra.lol's better successor. A free Discord bot so good you might get an erection. Please remain calm and read the command list.",
    link: "https://vye.lol",
    tags: ["Discord", "Bot", "Free"],
    color: "#a855f7",
    glow: "rgba(168, 85, 247, .18)",
    icon: DiscordLogo,
    year: "2026",
    size: "",
  },
  {
    title: "bohlser-buehne.de",
    kicker: "Seven-hour premiere",
    description: "A landing page for the local theater I work with. Designed and built in seven hours overnight with lots of Pepsi, one deadline, and the sacred knowledge that the show must go on.",
    link: "https://bohlser-buehne.de",
    tags: ["Theater", "Landing page", "Pepsi"],
    color: "#f5c542",
    glow: "rgba(153, 27, 27, .28)",
    icon: Play,
    year: "2026",
    size: "lg:col-span-2",
  },
  {
    title: "dscrd.wtf",
    kicker: "Vanity infrastructure",
    description: "Premium vanity URLs for Discord identities, backed by edge caching and a mildly unhealthy concern for response times.",
    link: "https://dscrd.wtf",
    tags: ["Next.js", "Discord API", "Redis"],
    color: "#5865f2",
    glow: "rgba(88, 101, 242, .18)",
    icon: DiscordLogo,
    year: "2025",
    size: "",
  },
  {
    title: "Musilarity",
    kicker: "Taste, quantified",
    description: "A Spotify compatibility engine that turns listening history, genres, and audio features into a musical compatibility score.",
    link: "https://musilarity.xyz",
    tags: ["Spotify API", "Algorithms", "Motion"],
    color: "#1db954",
    glow: "rgba(29, 185, 84, .18)",
    icon: SpotifyLogo,
    year: "2025",
    size: "",
  },
  {
    title: "Tandur Spiess",
    kicker: "Dinner infrastructure",
    description: "A production e-commerce platform for a restaurant with real-time ordering and menu management.",
    link: "https://tandurspiess.de",
    tags: ["Commerce", "Real-time", "Web"],
    color: "#f97316",
    glow: "rgba(249, 115, 22, .18)",
    icon: Globe,
    year: "2025",
    size: "",
  },
  {
    title: "Electric Pony Fence",
    kicker: "Hardware meets mud",
    description: "An ESP32 experiment for monitoring high-voltage fences. The ponies remain unimpressed by the Internet of Things.",
    link: "/graveyard",
    tags: ["IoT", "C++", "Hardware"],
    color: "#eab308",
    glow: "rgba(234, 179, 8, .18)",
    icon: Lightning,
    year: "Lab",
    size: "",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen pt-32 pb-40 overflow-hidden">
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12 font-bold font-nav">
          <ArrowLeft /> Back home
        </Link>

        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-10 border-b border-white/10 pb-14">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-neon-blue mb-5">Things that escaped localhost</div>
            <h1 className="text-7xl md:text-[9rem] font-display tracking-[-0.055em] text-white leading-[0.78]">
              WORK<br />
              <span className="text-white/20">SHELF.</span>
            </h1>
          </div>
          <div className="max-w-sm lg:text-right">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Websites, bots, infrastructure, mods, and one electric fence. Every card has survived contact with reality.
            </p>
            <Link href="https://github.com/somedev-thing" target="_blank" className="inline-flex items-center gap-2 text-white hover:text-neon-blue transition-colors font-bold">
              <GithubLogo size={22} weight="fill" /> Inspect the GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.title}
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                className={`group relative min-h-[390px] rounded-[2rem] border border-white/10 overflow-hidden p-8 md:p-10 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 ${project.size}`}
                style={{ background: `linear-gradient(145deg, ${project.glow}, rgba(5,5,5,.96) 58%)` }}
              >
                <div className="absolute inset-0 project-grid opacity-30" />
                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: project.color }} />

                <div className="relative flex justify-between items-start">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                    {(index + 1).toString().padStart(2, "0")} / {project.year}
                  </div>
                  <div className="w-14 h-14 rounded-2xl border flex items-center justify-center" style={{ borderColor: `${project.color}55`, color: project.color, backgroundColor: `${project.color}10` }}>
                    <Icon size={28} weight="fill" />
                  </div>
                </div>

                <div className="relative max-w-3xl">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: project.color }}>{project.kicker}</div>
                  <div className="flex items-end justify-between gap-8">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-display text-white mb-4 leading-tight">{project.title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-7">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-[11px] uppercase tracking-wider font-mono text-white/55">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={20} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
