import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 - Page not found" };

export default function NotFound() {
  return (
    <div className="px-4 py-8 mx-auto bg-[#86efac]">
      <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 className="text-4xl font-bold">404 - Page not found</h1>
        <p className="my-4">The page you were looking for doesn&apos;t exist.</p>
        <a href="/" className="underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
