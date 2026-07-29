"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`theme-toggle group ${compact ? "h-10 px-3" : "h-11 px-3.5"}`}
    >
      <span className="relative h-5 w-5" aria-hidden="true">
        <Sun className={`absolute inset-0 transition duration-300 ${dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} size={20} />
        <Moon className={`absolute inset-0 transition duration-300 ${dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} size={20} />
      </span>
      <span className={compact ? "sr-only" : "hidden text-sm font-semibold xl:inline"}>
        {mounted ? (dark ? "Tema claro" : "Tema escuro") : "Alternar tema"}
      </span>
    </button>
  );
}
