import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts, renderMarkdown } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.snippet } : {};
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 className="text-5xl font-bold">{post.title}</h1>
      <time className="text-gray-500">
        {post.publishedAt.toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div
        className="mt-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </main>
  );
}
