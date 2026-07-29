"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["Sobre", "#sobre"], ["Competências", "#competencias"], ["Projetos", "#projetos"],
  ["Trajetória", "#trajetoria"], ["PCED", "#pced"], ["Contato", "#contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav aria-label="Navegação principal" className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-coffee/10 bg-sand/90 px-4 py-3 shadow-soft backdrop-blur-xl sm:px-6">
        <a href="#topo" className="rounded-md text-sm font-bold tracking-[.18em] text-coffee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta">IG.</a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
          <ThemeToggle />
          <a href="#contato" className="button button-primary px-5 py-2.5 text-sm">Vamos conversar</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle compact />
          <button className="rounded-lg p-2 text-coffee transition hover:bg-olive/10 hover:text-olive active:scale-95" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto mt-2 max-w-7xl rounded-2xl border border-coffee/10 bg-sand p-3 shadow-soft lg:hidden">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-coffee hover:bg-olive/10 hover:text-olive">{label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
