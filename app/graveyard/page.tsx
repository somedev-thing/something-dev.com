import Link from "next/link";
import { Ghost, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function Graveyard() {
  
  const graveyard = [
      {
        title: "Port3k",
        description: "Social media platform for developers. Database management hell.",
        tags: ["Social", "Database Hell"]
      },
      {
        title: "Narrato",
        description: "Kids-only social media. Legal nightmare.",
        tags: ["Safety", "Social"]
      },
      {
        title: "Portalbound",
        description: "Custom Minecraft server. Financial ruin.",
        tags: ["Game", "Minecraft"]
      }
  ];

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-4xl mx-auto">
      
      <div className="mb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-bold">
            <ArrowLeft /> Back Home
        </Link>
        <span className="text-red-500 font-bold uppercase tracking-widest mb-4 block">Archive</span>
        <h1 className="text-8xl md:text-[8rem] font-bold tracking-tighter text-white mb-8 leading-none">
            VOID.
        </h1>
        <p className="text-2xl text-muted-foreground font-medium">
            Where projects go to die.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 text-left">
        {graveyard.map((project) => (
            <div key={project.title} className="p-8 rounded-[2.5rem] bg-glass border border-glass-border hover:bg-red-500/10 transition-colors group">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{project.title}</h2>
                    <Ghost weight="fill" className="text-white/20 group-hover:text-red-500" size={24} />
                </div>
                <p className="text-muted-foreground">{project.description}</p>
            </div>
        ))}
      </div>

    </main>
  );
}
