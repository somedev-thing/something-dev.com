import { 
  Desktop, Cpu, Memory, HardDrives, 
  Code, TerminalWindow, Globe, PenNib, BookOpen, 
  Layout, Palette, Database, BracketsCurly, Cloud,
  Lightbulb, Play, Sliders, Lightning, Warning
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function Uses() {
  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-6xl mx-auto">
      
      <div className="mb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-bold">
            <ArrowLeft /> Back Home
        </Link>
        <span className="text-neon-blue font-bold uppercase tracking-widest mb-4 block font-sans">The Setup</span>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 leading-none font-display">
            LEGACY RIG.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-sans">
            "Constraint breeds creativity." <br />
            <span className="text-sm opacity-50">(Also, hardware upgrades are expensive.)</span>
        </p>
      </div>

      <div className="space-y-12">
        
        {/* THE TRASHCAN */}
        <div className="rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-10 md:p-16 relative overflow-hidden group">
             <div className="absolute right-[-10%] top-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
                <Desktop size={400} weight="fill" className="text-white" />
             </div>
             
             <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 font-display">
                    <Desktop className="text-neon-blue" weight="fill" /> The Trashcan (Primary Station)
                 </h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 font-sans">Model</h3>
                            <p className="text-xl font-bold text-white font-display">Mac Pro (Late 2015)</p>
                            <p className="text-sm text-muted-foreground mt-1">The Cylindrical Heater.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 font-sans">Status</h3>
                             <p className="text-xl font-bold text-red-500 font-sans">Legacy / End of Life</p>
                             <p className="text-sm text-muted-foreground mt-1">Surviving purely on spite.</p>
                        </div>
                     </div>

                     <div className="space-y-4">
                         <div className="flex items-center gap-4 p-4 border-b border-white/5">
                             <Cpu size={32} weight="fill" className="text-white" />
                             <div>
                                 <span className="block font-bold text-white">Processor</span>
                                 <span className="text-muted-foreground text-sm">Intel Xeon E5 (Quad Core). It tries its best.</span>
                             </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 border-b border-white/5">
                             <Memory size={32} weight="fill" className="text-white" />
                             <div>
                                 <span className="block font-bold text-white">Memory</span>
                                 <span className="text-muted-foreground text-sm">8GB DDR3 (ECC). Chrome tabs are a luxury.</span>
                             </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 border-b border-white/5">
                             <HardDrives size={32} weight="fill" className="text-white" />
                             <div>
                                 <span className="block font-bold text-white">Storage</span>
                                 <span className="text-muted-foreground text-sm">120GB SSD. I live life one "Disk Space Full" warning at a time.</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* DAILY DRIVERS */}
        <div className="rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-10">
             <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 font-display">
                <Code className="text-green-500" weight="fill" /> Daily Drivers
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <Code size={32} className="text-blue-400 mb-4" weight="fill" />
                    <h3 className="font-bold text-white mb-2">Editor</h3>
                    <p className="text-sm text-muted-foreground">VS Code. <br/>Theme: <strong>Catppuccin Mocha</strong>.<br/>Icon Pack: <strong>Flow</strong>.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <TerminalWindow size={32} className="text-orange-400 mb-4" weight="fill" />
                    <h3 className="font-bold text-white mb-2">Terminal</h3>
                    <p className="text-sm text-muted-foreground">iTerm2 + OhMyZsh.<br/>(If I can't code well, I can at least look cool doing it).</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <Globe size={32} className="text-purple-400 mb-4" weight="fill" />
                    <h3 className="font-bold text-white mb-2">Browser</h3>
                    <p className="text-sm text-muted-foreground">Zen.<br/>Because vertical tabs are the future.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <PenNib size={32} className="text-pink-400 mb-4" weight="fill" />
                    <h3 className="font-bold text-white mb-2">Design</h3>
                    <p className="text-sm text-muted-foreground">Figma.<br/>Where I draw rectangles and call it "UI/UX".</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <BookOpen size={32} className="text-yellow-400 mb-4" weight="fill" />
                    <h3 className="font-bold text-white mb-2">Docs</h3>
                    <p className="text-sm text-muted-foreground">Obsidian.<br/>The only place my thoughts are organized.</p>
                </div>
             </div>
        </div>

        {/* THE FULLSTACK */}
        <div className="rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-10">
             <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 font-display">
                <Lightning className="text-yellow-500" weight="fill" /> The Fullstack (Chaos Edition)
             </h2>
             <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                        <Layout className="text-white/50" /> <span className="text-white font-medium">Frontend</span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right">Next.js 15 (Bleeding Edge), React 19</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                        <Palette className="text-white/50" /> <span className="text-white font-medium">Styling</span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right">Tailwind CSS v4. Writing actual CSS is so 2015.</span>
                </li>
                 <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                        <Database className="text-white/50" /> <span className="text-white font-medium">Backend</span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right">Supabase (Postgres for dummies), Node.js</span>
                </li>
                 <li className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-2 gap-2">
                    <div className="flex items-center gap-3">
                        <BracketsCurly className="text-white/50" /> <span className="text-white font-medium">Languages</span>
                    </div>
                    <div className="text-right text-sm">
                        <span className="block text-white">Daily: TypeScript, JS, HTML/CSS</span>
                        <span className="block text-muted-foreground">Scripting: Lua, Python</span>
                        <span className="block text-red-400">Legacy: Java (Minecraft), C (Pain)</span>
                    </div>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                         <Cloud className="text-white/50" /> <span className="text-white font-medium">DevOps</span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right">Vercel, Cloudflare, Git</span>
                </li>
             </ul>
        </div>

        {/* THE PHYSICAL REALM */}
        <div className="rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-10">
             <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 font-display">
                <Play className="text-red-500" weight="fill" /> The Physical Realm (Theater Tech)
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                     <Lightbulb size={40} className="mx-auto mb-4 text-yellow-200" weight="fill" />
                     <h3 className="font-bold text-white mb-2">Lighting</h3>
                     <p className="text-muted-foreground text-sm">Daslight 5 w/ MPC.</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                     <Play size={40} className="mx-auto mb-4 text-green-400" weight="fill" />
                     <h3 className="font-bold text-white mb-2">Show Control</h3>
                     <p className="text-muted-foreground text-sm">QLab 5. <br/>The only software that doesn't crash.</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                     <Sliders size={40} className="mx-auto mb-4 text-blue-300" weight="fill" />
                     <h3 className="font-bold text-white mb-2">Hardware</h3>
                     <p className="text-muted-foreground text-sm">Enttec Nodes, Physical Faders.<br/>(Backup strategy: Panic).</p>
                 </div>
             </div>
        </div>

        {/* SYSTEM FUEL */}
        <div className="rounded-[3rem] bg-glass border border-glass-border p-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-6">
                <Lightning size={64} weight="fill" className="text-neon-yellow" />
                <div>
                     <h2 className="text-2xl font-bold text-white font-display">System Fuel</h2>
                     <p className="text-muted-foreground">Liquid & Mental State.</p>
                </div>
             </div>
             <div className="text-right space-y-2">
                 <p className="text-lg text-white">
                     <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest mr-3">Liquid</span>
                     Coke Vanilla, Fanta Exotic. <span className="text-red-500 font-bold">(No Coffee)</span>.
                 </p>
                 <p className="text-lg text-white">
                     <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest mr-3">Mental</span>
                     The fear of a production outage.
                 </p>
             </div>
        </div>

      </div>
    </main>
  );
}
