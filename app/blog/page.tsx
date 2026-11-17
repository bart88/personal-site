import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 className="text-5xl font-bold">Blog</h1>
      <h2 className="text-1xl">Random musings</h2>
      <div className="mt-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
