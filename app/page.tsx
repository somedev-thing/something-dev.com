import Link from "next/link";
import { ArrowRight, DiscordLogo, SpotifyLogo } from "@phosphor-icons/react/dist/ssr";
import { TOOLKIT } from "@/lib/data";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getPosts();
  // Limit to 2 for homepage
  const recentPosts = posts.slice(0, 2);

  return (
    <main className="min-h-screen pt-32 pb-40 overflow-x-hidden">
      
      {/* 1. MANIFESTO HERO (Left-Aligned, Dense) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="max-w-5xl">
             <div className="flex items-center gap-3 mb-8 text-neon-blue font-mono text-sm uppercase tracking-widest">
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                System Online
            </div>

            <h1 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tight leading-[0.9] font-display">
                FULLSTACK <br />
                <span className="text-white/30">ENGINEERING.</span> <br />
                LEGACY <br />
                <span className="text-white/30">CONSTRAINTS.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-12 font-sans">
                I build high-performance software because my hardware leaves me no choice. 
                Running on a <strong className="text-white">2015 Mac Pro</strong>. Fueled by theater discipline and spite.
            </p>
            
            <div className="flex flex-wrap gap-6">
                <Link href="/projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 font-sans">
                    View Selected Work <ArrowRight weight="bold" />
                </Link>
                <Link href="/uses" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors font-sans">
                    The Legacy Rig
                </Link>
            </div>
        </div>
      </section>

      {/* 2. THE TOOLKIT (Restored V6 Grid) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="flex justify-between items-end mb-12">
             <h2 className="text-4xl font-bold text-white font-display">Technical Arsenal.</h2>
             <div className="text-right hidden md:block">
                 <p className="text-muted-foreground font-mono text-sm">UPDATED: FEB 2026</p>
             </div>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLKIT.map((item) => (
                <div  key={item.title} className="p-8 rounded-[2rem] bg-glass border border-glass-border hover:bg-glass-hover group transition-all">
                    <div className="mb-6 text-white group-hover:text-neon-blue transition-colors">
                        <item.icon size={32} weight="fill" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                        {item.tools}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* 3. SELECTED WORK (Side-by-Side Grid) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <h2 className="text-4xl font-bold text-white mb-12 font-display">Selected Deployments.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Project 1 */}
            <Link href="https://dscrd.wtf" target="_blank" className="group block relative h-full">
                 <div className="rounded-[2.5rem] bg-[#5865F2] p-10 md:p-12 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:brightness-110 shadow-2xl h-[500px] flex flex-col">
                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                         <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-bold text-white mb-6 w-fit backdrop-blur-md">
                             SaaS / Discord API
                        </span>
                        <h3 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter font-display">dscrd.wtf</h3>
                        <p className="text-white/80 text-lg max-w-sm leading-relaxed font-sans">
                            Premium vanity URLs for the Discord ecosystem. Analytics, custom branding, and massive scale.
                        </p>
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-end mt-auto">
                         <span className="inline-flex items-center gap-2 text-white font-bold text-lg border-b-2 border-white/30 pb-1 group-hover:border-white transition-colors font-sans">
                            View Production <ArrowRight weight="bold" />
                         </span>
                         {/* Icon Bottom Right */}
                          <DiscordLogo size={140} weight="fill" className="text-white/20 group-hover:text-white/40 transition-colors rotate-12 group-hover:rotate-0 duration-700" />
                    </div>
                 </div>
            </Link>

             {/* Project 2 */}
            <Link href="https://musilarity.xyz" target="_blank" className="group block relative h-full">
                 <div className="rounded-[2.5rem] bg-[#1DB954] p-10 md:p-12 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:brightness-110 shadow-2xl h-[500px] flex flex-col">
                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                         <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-bold text-white mb-6 w-fit backdrop-blur-md">
                             Algorithm / Spotify API
                        </span>
                        <h3 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter font-display">Musilarity</h3>
                        <p className="text-black/80 text-lg max-w-sm leading-relaxed font-sans">
                            Mathematical analysis of your music taste. Compare stats with friends and generate compatibility playlists.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end mt-auto">
                         <span className="inline-flex items-center gap-2 text-black font-bold text-lg border-b-2 border-black/30 pb-1 group-hover:border-black transition-colors font-sans">
                            View Production <ArrowRight weight="bold" />
                         </span>
                         {/* Icon Bottom Right */}
                          <SpotifyLogo size={140} weight="fill" className="text-black/20 group-hover:text-black/40 transition-colors rotate-12 group-hover:rotate-0 duration-700" />
                    </div>
                 </div>
            </Link>

        </div>
      </section>

      {/* 4. THEATER ORIGINS */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
         <div className="rounded-[3rem] bg-glass border border-glass-border p-12 md:p-20 relative overflow-hidden">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <h2 className="text-4xl font-bold text-white mb-6 font-display">Origins: The Booth.</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-sans">
                        Before software, I ran theater lighting. 
                        When a console crashes 30 seconds before a cue, you don't file a ticket. You fix it.
                    </p>
                    <Link href="/about" className="text-white border-b border-white/20 hover:border-white transition-colors font-sans font-bold">
                        Read the full lore →
                    </Link>
                 </div>
                 <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 opacity-50">
                        <div className="p-4 bg-white/5 rounded-xl text-center">
                            <span className="block text-2xl font-bold text-white font-display">ETC</span>
                            <span className="text-xs text-muted-foreground font-sans">Eos Family</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl text-center">
                            <span className="block text-2xl font-bold text-white font-display">GrandMA</span>
                            <span className="text-xs text-muted-foreground font-sans">MA2 User</span>
                        </div>
                         <div className="p-4 bg-white/5 rounded-xl text-center">
                            <span className="block text-2xl font-bold text-white font-display">QLab</span>
                            <span className="text-xs text-muted-foreground font-sans">Audio/Video</span>
                        </div>
                         <div className="p-4 bg-white/5 rounded-xl text-center">
                            <span className="block text-2xl font-bold text-white font-display">Dante</span>
                            <span className="text-xs text-muted-foreground font-sans">Networking</span>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* 5. THOUGHTS (Blog) */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-white/5">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white font-display">Latest Thoughts.</h2>
            <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors font-sans font-bold">View All →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-neon-blue font-sans">{post.category}</span>
                            <span className="text-muted-foreground text-sm font-sans">{post.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors font-display">{post.title}</h3>
                        <p className="text-muted-foreground font-sans">
                            {post.excerpt}
                        </p>
                    </div>
                </Link>
            ))}
            {recentPosts.length < 2 && (
                 <div className="p-8 rounded-[2rem] border border-white/5 border-dashed flex items-center justify-center text-muted-foreground font-sans">
                    More soon...
                </div>
            )}
        </div>
      </section>

    </main>
  );
}
