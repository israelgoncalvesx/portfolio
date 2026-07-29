import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: "rgb(var(--coffee) / <alpha-value>)",
        earth: "rgb(var(--earth) / <alpha-value>)",
        terracotta: "rgb(var(--terracotta) / <alpha-value>)",
        beige: "rgb(var(--beige) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        olive: "rgb(var(--olive) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(59, 47, 47, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
