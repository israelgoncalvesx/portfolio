import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Israel Gonçalves | Dados, Machine Learning e IA", template: "%s | Israel Gonçalves" },
  description: "Portfólio de Israel Gonçalves, estudante de Engenharia da Computação com foco em Python, Ciência de Dados, Machine Learning e Inteligência Artificial.",
  openGraph: {
    title: "Israel Gonçalves | Dados, Machine Learning e IA",
    description: "Projetos, pesquisa e trajetória em Engenharia da Computação, dados e inteligência artificial.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: withBasePath("/opengraph-image.svg"), width: 1200, height: 630, alt: "Portfólio de Israel Gonçalves" }],
  },
  icons: { icon: withBasePath("/favicon.svg") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
