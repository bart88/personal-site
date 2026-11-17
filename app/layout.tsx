import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chris Barton | Full stack software engineer, Frontend engineer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
