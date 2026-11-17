import { describe, expect, it } from "vitest";
import { getPost, getPosts, parsePost, renderMarkdown } from "./posts";

describe("posts", () => {
  it("parses front matter", () => {
    const p = parsePost(
      "x",
      "---\ntitle: Hi\npublished_at: 2024-11-05T0:00:00.000Z\nsnippet: s\n---\n\nbody",
    );
    expect(p.title).toBe("Hi");
    expect(p.snippet).toBe("s");
    expect(p.publishedAt.toISOString()).toBe("2024-11-05T00:00:00.000Z");
    expect(p.content.trim()).toBe("body");
  });

  it("lists posts newest first", async () => {
    const posts = await getPosts();
    expect(posts.map((p) => p.slug)).toEqual(["mongo_pagination", "deno_20"]);
  });

  it("returns null for missing or unsafe slugs", async () => {
    expect(await getPost("nope")).toBeNull();
    expect(await getPost("../package")).toBeNull();
  });

  it("renders markdown with code highlighting", () => {
    const html = renderMarkdown("## T\n\n```js\nconst a = 1;\n```");
    expect(html).toContain("<h2");
    expect(html).toContain("hljs");
  });
});
