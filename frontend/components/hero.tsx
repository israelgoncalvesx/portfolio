"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { withBasePath } from "@/lib/paths";
import type { Profile, SocialLink } from "@/types/portfolio";

export function Hero({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  const reduced = useReducedMotion();
  const github = socials.find((link) => link.name === "GitHub")?.url ?? "#";
  const linkedin = socials.find((link) => link.name === "LinkedIn")?.url ?? "#";
  return (
    <section id="topo" className="relative flex min-h-screen items-center overflow-hidden bg-sand px-5 pb-16 pt-28 sm:px-8">
      <div className="noise" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-4 py-2 text-sm font-semibold text-olive">
            <span className="h-2 w-2 animate-pulse rounded-full bg-olive motion-reduce:animate-none" />
            {profile.availability}
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.22em] text-terracotta">Olá, eu sou</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.055em] text-coffee sm:text-7xl xl:text-[5.6rem]">
            Israel <span className="font-serif italic text-terracotta">Gonçalves.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-earth sm:text-2xl">{profile.intro}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-earth/70"><MapPin size={17} /> {profile.location}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <motion.a whileHover={reduced ? {} : { scale: 1.025 }} whileTap={reduced ? {} : { scale: .98 }} href="#projetos" className="button button-primary group">
              Ver projetos <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={19} />
            </motion.a>
            <motion.a whileHover={reduced ? {} : { scale: 1.025 }} href={withBasePath("/curriculo-israel-goncalves.pdf")} download className="button button-secondary">
              <Download size={18} /> Baixar currículo
            </motion.a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="Abrir GitHub em nova aba"><Github /></a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="Abrir LinkedIn em nova aba"><Linkedin /></a>
          </div>
        </motion.div>
        <motion.div initial={reduced ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
          <div className="absolute inset-[8%] rounded-[36%_64%_54%_46%/46%_42%_58%_54%] bg-[#3B2F2F] shadow-2xl dark:bg-[#3B3028]" />
          <div className="absolute inset-[15%] rounded-full border border-beige/20" />
          <div className="absolute inset-[25%] rounded-full border border-beige/20" />
          <div className="absolute left-[20%] top-[28%] h-3 w-3 rounded-full bg-terracotta shadow-[0_0_0_10px_rgba(181,101,77,.18)]" />
          <div className="absolute right-[24%] top-[38%] h-3 w-3 rounded-full bg-beige shadow-[0_0_0_10px_rgba(216,195,165,.14)]" />
          <div className="absolute bottom-[27%] left-[42%] h-3 w-3 rounded-full bg-olive shadow-[0_0_0_10px_rgba(102,115,79,.18)]" />
          <svg className="absolute inset-0 h-full w-full text-beige/55" viewBox="0 0 500 500">
            <path d="M105 164C185 120 280 158 382 205M105 164C187 260 272 305 315 366M382 205C325 253 317 312 315 366" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
          </svg>
          <div className="absolute bottom-[13%] right-[3%] rounded-2xl border border-white/20 bg-sand/95 p-4 shadow-soft backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-terracotta">Em construção</p>
            <p className="mt-1 font-serif text-xl italic text-coffee">dados → contexto → impacto</p>
          </div>
        </motion.div>
      </div>
      <a href="#sobre" aria-label="Rolar para a seção Sobre mim" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[.18em] text-earth/60 sm:flex">
        explorar <ArrowDown className="animate-bounce motion-reduce:animate-none" size={18} />
      </a>
    </section>
  );
}
