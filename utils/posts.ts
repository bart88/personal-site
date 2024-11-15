import { extract, Extract } from "@std/front-matter/any";
import type { Post } from "../types/posts.ts";

export async function getPost(slug: string): Promise<Post> {
    const text = await Deno.readTextFile(`./posts/${slug}.md`);
    const { attrs, body } = extract(text) as Extract<any>;
    return {
        slug,
        title: attrs.title as string,
        publishedAt: new Date(attrs.published_at),
        snippet: attrs.snippet,
        content: body,
    }
}


export async function getPosts(): Promise<Post[]> {
    const files = Deno.readDir("./posts");
    const promises = [];

    for await (const file of files) {
        const slug = file.name.replace(".md", "");
        promises.push(getPost(slug))
    }

    const posts = await Promise.all(promises) as Post[];

    posts.sort((a,b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return posts;
}