"use client";

import { useState } from "react";

/** Flips `data-theme` on <html>, defaulting from the OS preference on first tap
 *  (ported from the prototype). The explicit value then overrides the OS. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  function toggleTheme() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      className="grid size-10 place-items-center rounded-full border border-edge bg-surface text-ink-soft shadow-soft transition-transform active:scale-90"
    >
      {theme === "dark" ? "☀︎" : "☾"}
    </button>
  );
}
