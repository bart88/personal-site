import type { Post } from "@/lib/types";

export function PostCard(props: { post: Post }) {
    const { post } = props;
    return (
      <div className="py-8 border-t border-gray-200">
        <a className="sm:col-span-2" href={`/blog/${post.slug}`}>
          <h3 className="text-3xl text-gray-900 font-bold">
            {post.title}
          </h3>
          <time className="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="mt-4 text-gray-900">
            {post.snippet}
          </div>
        </a>
      </div>
    );
  }