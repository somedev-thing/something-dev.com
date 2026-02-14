import { User, Terminal, Fire, Circuitry, ArrowLeft, Clock,  } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function About() {
  
  const timeline = [
    { year: "2018-2022", role: "Master Electrician / L.D.", desc: "Ran lighting for over 200 live productions. Zero show-stopping failures.", icon: Fire },
    { year: "2022-2024", role: "Creative Technologist", desc: "Building interactive installations and weird web experiments.", icon: Circuitry },
    { year: "2024-Present", role: "Fullstack Engineer", desc: "Shipping production code. Fighting legacy hardware constraints.", icon: Terminal },
  ];

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-5xl mx-auto">
      
      <div className="mb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-bold">
            <ArrowLeft /> Back Home
        </Link>
        <span className="text-neon-pink font-bold uppercase tracking-widest mb-4 block">The Lore</span>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-none">
            ORIGINS.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            From the lighting booth to the Linux terminal. The discipline is the same: The show must go on.
        </p>
      </div>

      <div className="space-y-20">
        
        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-glass border border-glass-border">
                <Circuitry size={48} className="text-neon-cyan mb-6" weight="fill" />
                <h2 className="text-3xl font-bold text-white mb-4">Engineering Chaos.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    I live on a farm. Physical reality is brutal. Things break. Ponies escape. 
                    This shapes my code: Resilient. Tolerant of failure. Built for the real world.
                </p>
            </div>
             <div className="p-10 rounded-[2.5rem] bg-glass border border-glass-border">
                <Fire size={48} className="text-neon-pink mb-6" weight="fill" />
                <h2 className="text-3xl font-bold text-white mb-4">Theater Tech.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Former theater technician. "It works on my machine" doesn't fly when the show is live.
                    I build software that performs when the curtain goes up.
                </p>
            </div>
        </div>
        
        {/* TIMELINE */}
        <div className="p-10 md:p-14 rounded-[3rem] bg-[#0A0A0A] border border-white/10">
             <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
                <Clock weight="fill" className="text-neon-blue" /> Timeline
             </h2>
             <div className="space-y-12 border-l border-white/10 pl-8 ml-4">
                 {timeline.map((item) => (
                    <div key={item.year} className="relative">
                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-neon-blue border-4 border-black" />
                        <span className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-2 block">{item.year}</span>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                        <p className="text-muted-foreground text-lg">{item.desc}</p>
                    </div>
                 ))}
             </div>
        </div>

      </div>
    </main>
  );
}
