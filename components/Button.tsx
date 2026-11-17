"use client";

import { useEffect, useState, type ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  // Disabled until hydrated, matching the previous IS_BROWSER behaviour.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <button
      {...props}
      disabled={!hydrated || props.disabled}
      className="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
