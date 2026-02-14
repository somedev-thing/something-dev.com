import Link from "next/link";
import { ArrowUpRight, GithubLogo, DiscordLogo, SpotifyLogo, Code, Lightning, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function Projects() {
  
  const projects = [
    {
        title: "dscrd.wtf",
        description: "A premium vanity URL service for Discord. Allows users to create custom links for their profiles, bots, and servers.",
        link: "https://dscrd.wtf",
        tags: ["Next.js", "Discord API", "SaaS"],
        color: "bg-[#5865F2]",
        textColor: "text-[#5865F2]",
        icon: DiscordLogo
    },
    {
        title: "Musilarity",
        description: "Spotify compatibility engine. Analyzes listening history, genres, and audio features to determine musical compatibility scores.",
        link: "https://musilarity.xyz",
        tags: ["Spotify API", "Math", "Framer Motion"],
        color: "bg-[#1DB954]",
        textColor: "text-[#1DB954]",
        icon: SpotifyLogo
    },
    {
        title: "Tandur Spiess",
        description: "Production e-commerce platform for a restaurant. Handles real-time ordering and menu management.",
        link: "https://tandurspiess.de",
        tags: ["E-commerce", "Real-time"],
        color: "bg-orange-500",
        textColor: "text-orange-500",
        icon: Code
    },
    {
        title: "Electric Pony Fence",
        description: "IoT hardware project monitoring high-voltage fences. Uses ESP32 microcontrollers.",
        link: "#",
        tags: ["IoT", "C++", "Hardware"],
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
        icon: Lightning
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div>
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-bold">
                <ArrowLeft /> Back Home
            </Link>
            <h1 className="text-8xl md:text-[8rem] font-bold text-white tracking-tighter leading-none mb-6">
                WORK.
            </h1>
        </div>
        
        <Link href="https://github.com/somedev-thing" target="_blank" className="flex items-center gap-2 text-white hover:text-neon-blue transition-colors font-bold px-8 py-4 border border-white/20 rounded-full hover:bg-white/5">
            <GithubLogo size={24} weight="fill" /> GitHub Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 mb-32">
        {projects.map((project, i) => {
            const Icon = project.icon;
            return (
                <Link 
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    className="group block rounded-[3rem] bg-glass border border-glass-border p-10 md:p-14 hover:border-white/30 transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
                        <Icon size={300} weight="fill" className="text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                         <div className="max-w-2xl">
                             <div className="flex items-center gap-4 mb-6">
                                <span className={`w-12 h-12 rounded-full ${project.color} flex items-center justify-center text-white`}>
                                    <Icon size={24} weight="fill" />
                                </span>
                                <div className="flex gap-2">
                                     {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-neon-blue transition-colors">
                                {project.title}
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                         </div>

                         <div className="flex items-end">
                              <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowUpRight size={24} weight="bold" />
                            </span>
                         </div>
                    </div>
                </Link>
            );
        })}
      </div>

    </main>
  );
}
