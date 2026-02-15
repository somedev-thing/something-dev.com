import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { BlogPostReader } from "@/components/BlogPostReader";

export async function generateStaticParams() {
  const posts = await getAllPosts("posts");
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, meta } = await getPostBySlug(slug, "posts");

  return (
    <main className="container mx-auto px-6 py-24 min-h-screen">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-purple mb-8 transition-colors">
        <ArrowLeft /> Back to logs
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <span className="font-mono text-xs text-accent-pink tracking-widest">{meta.date}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 leading-tight text-gradient">
            {meta.title}
          </h1>
          {meta.description && (
            <p className="text-xl text-muted-foreground italic">
              {meta.description}
            </p>
          )}
        </header>
        
        <BlogPostReader>
          {content}
        </BlogPostReader>
      </article>
    </main>
  );
}
