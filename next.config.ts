import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./posts/**/*"],
    "/blog": ["./posts/**/*"],
  },
};

export default nextConfig;
