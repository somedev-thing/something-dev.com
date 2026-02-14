import Link from "next/link";
import { ArrowLeft, BookOpen, PenNib } from "@phosphor-icons/react/dist/ssr";
import { getPosts } from "@/lib/blog";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 max-w-5xl mx-auto">
      
      <div className="mb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-bold font-nav">
            <ArrowLeft /> Back Home
        </Link>
        <span className="text-neon-purple font-bold uppercase tracking-widest mb-4 block font-sans">Thoughts</span>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-none font-display">
            LOGS.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl font-sans">
            Engineering notes from the farm and the terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block p-10 rounded-[2.5rem] bg-glass border border-glass-border hover:bg-glass-hover transition-all">
                 <div className="flex justify-between items-start mb-6">
                     <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest text-neon-blue border border-white/5 font-sans">
                        {post.category}
                     </span>
                     <span className="text-muted-foreground font-mono text-sm">{post.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors font-display">
                    {post.title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl font-sans">
                    {post.excerpt}
                </p>
                <div className="mt-8 flex items-center text-white font-bold group-hover:gap-4 transition-all gap-2 font-nav">
                    Read Entry <ArrowLeft className="rotate-180" />
                </div>
            </Link>
        ))}
      </div>

    </main>
  );
}
