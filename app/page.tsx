import { getPosts } from "@/lib/blog";
import { HomeContent } from "./components/HomeContent";

export default async function Home() {
  const posts = await getPosts();

  return <HomeContent posts={posts} />;
}
