import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import { components } from "@/components/mdx/components";

interface PostMeta {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
  link?: string;
}

const rootDirectory = path.join(process.cwd(), "content");

export async function getPostBySlug(slug: string, type: "posts" | "projects" | "graveyard" = "posts") {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, type, `${realSlug}.mdx`);
  
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<PostMeta>({
    source: fileContent,
    options: { 
        parseFrontmatter: true,
        mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
        }
    },
    components: components,
  });

  return { meta: { ...frontmatter, slug: realSlug }, content };
}

export async function getAllPosts(type: "posts" | "projects" | "graveyard" = "posts") {
  const files = fs.readdirSync(path.join(rootDirectory, type));

  const posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file, type);
    posts.push(meta);
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
