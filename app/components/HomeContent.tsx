"use client";

import Link from "next/link";
import { config } from "@/lib/config";
import { TOOLKIT } from "@/lib/data";
import { SpotlightHero } from "./SpotlightHero";
import { Spotlight } from "./Spotlight";
import { MagneticButton } from "./MagneticButton";
import { StarWarp } from "./StarWarp";
import { ArrowRight, DiscordLogo, SpotifyLogo, Newspaper, Info } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } as const }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } as const }
};

interface HomeContentProps {
  posts: {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
  }[];
}

export function HomeContent({ posts }: HomeContentProps) {
  return (
    <main className="min-h-screen bg-void text-white overflow-x-hidden selection:bg-neon-pink/30">
      
      <StarWarp />

      {/* 1. SPOTLIGHT HERO */}
      <SpotlightHero />

      {/* 2. BRIEFING (ABOUT) */}
      <section className="container mx-auto px-4 md:px-12 py-20 pb-32">
         <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
         >
            <div className="md:col-span-4">
               <div className="flex items-center gap-2 text-neon-pink mb-4 font-mono text-sm uppercase tracking-widest">
                  <Info size={16} weight="bold" />
                  <span>Briefing</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                  Building the <br/>
                  <span className="text-muted-foreground">Impossible.</span>
               </h2>
            </div>
            <div className="md:col-span-8 text-lg md:text-xl text-muted-foreground font-sans leading-relaxed space-y-6">
               <p>
                  I am a Fullstack Engineer with a background in theatrical production. 
                  This means I treat every deployment like opening night: <strong className="text-white">it has to work</strong>.
               </p>
               <p>
                  Specializing in React ecosystems, real-time infrastructure, and 
                  squeezing every ounce of performance out of legacy hardware (yes, even this 2015 MacBook).
               </p>
               <div className="pt-4">
                  <Link href="/about" className="inline-flex items-center gap-2 text-white font-bold hover:text-neon-pink transition-colors">
                     Read Full Bio <ArrowRight weight="bold" />
                  </Link>
               </div>
            </div>
         </motion.div>
      </section>

      {/* 3. OBSIDIAN CARD STREAM */}
      <div className="container mx-auto px-4 md:px-12 pb-32 space-y-32">
        
        {/* Project 1: dscrd.wtf */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={fadeInUp}
           className="w-full max-w-6xl mx-auto"
        >
           <Spotlight className="rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 group">
             <Link href="https://dscrd.wtf" target="_blank" className="block relative overflow-hidden rounded-[2.5rem]">
                <div className="flex flex-col-reverse md:grid md:grid-cols-2 min-h-[500px]">
                    
                    {/* Content Half */}
                    <div className="p-6 md:p-16 flex flex-col justify-between z-10 bg-black/40 md:bg-transparent">
                        <div>
                             <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#5865F2]" />
                                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Infrastructure</span>
                             </div>
                             {/* Fixed Title Clipping: relaxed leading + py-2 for ascenders/descenders */}
                             <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-normal py-1">dscrd.wtf</h3>
                             <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-md leading-relaxed">
                                Premium vanity URLs for the Discord ecosystem.
                                Serving millions of requests with high-performance edge caching.
                             </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-8 md:mt-12">
                             <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">Next.js</span>
                             <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">Redis</span>
                             <div className="ml-auto p-4 rounded-full bg-white text-black group-hover:scale-110 transition-transform hidden md:block">
                                <ArrowRight size={24} weight="bold" />
                             </div>
                        </div>
                    </div>

                    {/* Visual Half */}
                    <div className="relative bg-[#5865F2]/10 h-[300px] md:h-auto flex items-center justify-center overflow-hidden">
                        <DiscordLogo className="text-[#5865F2] w-[400px] h-[400px] absolute opacity-20 blur-3xl" weight="fill" />
                        <DiscordLogo className="text-[#5865F2] w-[150px] h-[150px] md:w-[200px] md:h-[200px] relative z-10 group-hover:scale-110 transition-transform duration-700" weight="fill" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-l" />
                    </div>

                </div>
             </Link>
           </Spotlight>
        </motion.div>

        {/* Project 2: Musilarity */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={fadeInUp}
           className="w-full max-w-6xl mx-auto"
        >
           <Spotlight className="rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 group">
             <Link href="https://musilarity.xyz" target="_blank" className="block relative overflow-hidden rounded-[2.5rem]">
                <div className="flex flex-col md:grid md:grid-cols-2 min-h-[500px]">
                    
                    {/* Visual Half */}
                    <div className="relative bg-[#1DB954]/10 h-[300px] md:h-auto flex items-center justify-center overflow-hidden">
                        <SpotifyLogo className="text-[#1DB954] w-[400px] h-[400px] absolute opacity-20 blur-3xl" weight="fill" />
                        <SpotifyLogo className="text-[#1DB954] w-[150px] h-[150px] md:w-[200px] md:h-[200px] relative z-10 group-hover:scale-110 transition-transform duration-700" weight="fill" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                    </div>

                    {/* Content Half */}
                    <div className="p-6 md:p-16 flex flex-col justify-between z-10 bg-black/40 md:bg-transparent">
                        <div>
                             <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Algorithm</span>
                             </div>
                             <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-normal py-1">Musilarity</h3>
                             <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-md leading-relaxed">
                                Mathematical analysis of music taste.
                                Visualizing the Spotify algorithm through vector space mapping.
                             </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-8 md:mt-12">
                             <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">Spotify API</span>
                             <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">Algorithms</span>
                             <div className="ml-auto p-4 rounded-full bg-white text-black group-hover:scale-110 transition-transform hidden md:block">
                                <ArrowRight size={24} weight="bold" />
                             </div>
                        </div>
                    </div>

                </div>
             </Link>
           </Spotlight>
        </motion.div>

      </div>

      {/* 4. ARSENAL (Holographic Tech Cards) */}
      <section className="container mx-auto px-4 md:px-12 py-32 border-t border-white/5">
         <h2 className="text-6xl md:text-8xl font-bold text-center mb-16 font-display opacity-20">
            ARSENAL
         </h2>
         
         <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
         >
            {TOOLKIT.map((tool) => (
                <Spotlight key={tool.title} className="rounded-3xl bg-white/5 border-white/5 overflow-hidden min-h-[250px] flex flex-col">
                    <motion.div variants={cardVariants} className="p-8 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-neon-blue">
                             <tool.icon size={24} weight="fill" />
                        </div>
                        <h3 className="text-xl font-bold font-display text-white mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                            {tool.tools}
                        </p>
                    </motion.div>
                </Spotlight>
            ))}
         </motion.div>
      </section>

      {/* 5. TRANSMISSIONS (BLOG) */}
      <section className="container mx-auto px-4 md:px-12 py-32 border-t border-white/5">
         <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-2 text-neon-yellow font-mono text-sm uppercase tracking-widest">
                  <Newspaper size={16} weight="bold" />
                  <span>Transmissions</span>
             </div>
             <Link href="/blog" className="text-sm font-bold hover:text-white transition-colors text-muted-foreground">
                View All →
             </Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {posts.slice(0, 2).map((post) => (
                 <Spotlight key={post.slug} className="rounded-3xl bg-white/5 border border-white/5 group cursor-pointer">
                     <Link href={`/blog/${post.slug}`} className="block p-8 md:p-12">
                        <span className="text-xs font-mono text-muted-foreground mb-4 block">{post.date}</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4 group-hover:text-neon-yellow transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground font-sans line-clamp-2">
                            {post.excerpt}
                        </p>
                     </Link>
                 </Spotlight>
             ))}
         </div>
      </section>

      {/* 6. FOOTER / SOCIALS */}
      <footer className="container mx-auto px-4 md:px-12 pb-20">
          <div className="flex flex-col items-center gap-12">
             <div className="flex flex-wrap justify-center gap-8">
                {config.socials.map((social) => (
                    <MagneticButton key={social.name} strength={50}>
                        <Link 
                            href={social.url} 
                            target="_blank"
                            className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl hover:bg-white hover:text-black transition-colors"
                        >
                            <social.icon weight="fill" />
                        </Link>
                    </MagneticButton>
                ))}
             </div>
             
             <p className="text-muted-foreground text-sm font-mono text-center">
                Running on MacBook Pro 2015. <br/>
                Wait for the fans to spin down. <br />
                <span className="opacity-50 mt-2 block">© {new Date().getFullYear()} {config.identity.name}</span>
             </p>
          </div>
      </footer>

    </main>
  );
}
