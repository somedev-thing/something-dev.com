import {
  ArrowLeft,
  BookOpen,
  BracketsCurly,
  Cloud,
  Code,
  Cpu,
  Database,
  Globe,
  HardDrives,
  Laptop,
  Layout,
  Lightbulb,
  Lightning,
  Memory,
  Palette,
  Play,
  Sliders,
  TerminalWindow,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const dailyDrivers = [
  {
    title: "Editor",
    value: "IntelliJ IDEA",
    note: "VS Code has left the building. The IDE now knows more about my project than I do.",
    icon: Code,
    color: "#fb7185",
  },
  {
    title: "Terminal",
    value: "iTerm2 + Oh My Zsh",
    note: "If the command fails, at least the prompt looks expensive.",
    icon: TerminalWindow,
    color: "#fb923c",
  },
  {
    title: "Browser",
    value: "Zen",
    note: "Vertical tabs, because horizontal space is precious on thirteen inches.",
    icon: Globe,
    color: "#c084fc",
  },
  {
    title: "Design",
    value: "Figma",
    note: "I arrange rectangles until somebody calls it a design system.",
    icon: Palette,
    color: "#f472b6",
  },
  {
    title: "Notes",
    value: "Obsidian",
    note: "A beautifully linked graph of thoughts I will definitely revisit.",
    icon: BookOpen,
    color: "#facc15",
  },
];

const stack = [
  { label: "Frontend", value: "Next.js 16, React 19, Framer Motion", icon: Layout },
  { label: "Styling", value: "Tailwind CSS 4 and occasional actual CSS", icon: Palette },
  { label: "Backend", value: "Node.js, PostgreSQL, Supabase, Redis", icon: Database },
  { label: "Languages", value: "TypeScript, JavaScript, Java, Lua, Python, C", icon: BracketsCurly },
  { label: "Operations", value: "Cloudflare, Vercel, Linux, Git, stubbornness", icon: Cloud },
];

export default function Uses() {
  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <header className="mb-20 border-b border-white/10 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12 font-bold">
          <ArrowLeft /> Back home
        </Link>
        <span className="text-neon-blue font-mono uppercase tracking-[0.28em] text-xs mb-5 block">The very constrained setup</span>
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <h1 className="text-6xl md:text-[8.5rem] font-display tracking-[-0.055em] text-white leading-[0.8]">
            EIGHT GIG<br />
            <span className="text-white/20">WORKHORSE.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md lg:text-right leading-relaxed">
            A development setup balanced carefully between professional software and the spinning beach ball of death.
          </p>
        </div>
      </header>

      <div className="space-y-6">
        <section className="rounded-[2.5rem] border border-white/10 overflow-hidden relative bg-[#080808]">
          <div className="absolute inset-0 project-grid opacity-40" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-neon-blue/20 blur-[110px]" />
          <div className="relative p-8 md:p-14">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-blue mb-6">
                  <Laptop size={20} weight="fill" /> Primary machine
                </div>
                <h2 className="text-4xl md:text-6xl font-display mb-5">MacBook Pro 12,1</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The 13-inch Early 2015 model. It is old enough to have opinions about modern JavaScript and compact enough to heat one lap at a time.
                </p>
                <div className="inline-flex items-center gap-2 mt-8 rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-lime-300">
                  <span className="w-2 h-2 rounded-full bg-lime-300" /> Still shipping
                </div>
              </div>

              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3 min-w-0 lg:min-w-[390px]">
                {[
                  { label: "Processor", value: "Dual-core Intel Core i5", note: "Two brave little cores", icon: Cpu },
                  { label: "Memory", value: "8 GB RAM", note: "Every megabyte has a job", icon: Memory },
                  { label: "Storage", value: "120 GB", note: "Caches are temporary enemies", icon: HardDrives },
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-5">
                      <Icon size={28} className="text-white/65 shrink-0" weight="fill" />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{spec.label}</div>
                        <div className="font-bold text-white">{spec.value}</div>
                        <div className="text-xs text-muted-foreground">{spec.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-[#080808] border border-white/10 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Code size={30} className="text-green-400" weight="fill" />
            <h2 className="text-3xl font-display">DAILY DRIVERS</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {dailyDrivers.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 hover:bg-white/[0.06] transition-colors">
                  <Icon size={30} className="mb-8" weight="fill" style={{ color: tool.color }} />
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 mb-1">{tool.title}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{tool.value}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.note}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 rounded-[2.5rem] bg-[#080808] border border-white/10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Lightning size={30} className="text-yellow-400" weight="fill" />
              <h2 className="text-3xl font-display">CHAOS STACK</h2>
            </div>
            <div>
              {stack.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="grid sm:grid-cols-[180px_1fr] gap-3 border-t border-white/10 py-5 first:border-t-0">
                    <div className="flex items-center gap-3 text-white font-bold">
                      <Icon className="text-white/40" /> {item.label}
                    </div>
                    <div className="text-muted-foreground sm:text-right">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-yellow-300/15 p-8 md:p-10 bg-gradient-to-b from-yellow-300/10 to-[#080808] flex flex-col justify-between">
            <Lightning size={54} weight="fill" className="text-yellow-300 mb-10" />
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-300 mb-3">System fuel</div>
              <h2 className="text-4xl font-display mb-4">NO COFFEE.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Coke Vanilla, Fanta Exotic, Pepsi, and the fear of a production outage.
              </p>
            </div>
          </section>
        </div>

        <section className="rounded-[2.5rem] bg-[#080808] border border-white/10 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Play size={30} className="text-red-400" weight="fill" />
            <h2 className="text-3xl font-display">THE PHYSICAL REALM</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Lighting", value: "Daslight 5 with MPC", icon: Lightbulb, color: "#fde68a" },
              { title: "Show control", value: "QLab 5, the reliable adult", icon: Play, color: "#4ade80" },
              { title: "Hardware", value: "Enttec nodes and physical faders", icon: Sliders, color: "#93c5fd" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 p-7 bg-white/[0.025]">
                  <Icon size={36} weight="fill" className="mb-6" style={{ color: item.color }} />
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
