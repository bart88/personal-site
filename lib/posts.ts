import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "posts");

export function parsePost(slug: string, text: string): Post {
  const { data, content } = matter(text);
  return {
    slug,
    title: data.title as string,
    publishedAt: new Date(data.published_at),
    snippet: data.snippet as string,
    content,
  };
}

/** Returns null when the post does not exist (or the slug is unsafe). */
export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[\w-]+$/.test(slug)) return null;
  try {
    const text = await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), "utf8");
    return parsePost(slug, text);
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map((f) => getPost(f.replace(/\.md$/, ""))),
  );
  return (posts.filter(Boolean) as Post[]).sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  { gfm: true },
);

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
