# My personal site

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Deployed on Vercel.

## Usage

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm test         # unit tests
npm run lint     # type check
```

## Blog posts

Add a markdown file to `posts/` with front matter:

```
---
title: My post
published_at: 2025-01-01T00:00:00.000Z
snippet: One line summary
---
```

Posts are rendered statically at build time.
