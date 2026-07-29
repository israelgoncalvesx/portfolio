"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Project } from "@/types/portfolio";
import { Reveal, SectionTitle } from "./ui";

const filters = ["Todos", "Ciência de Dados", "Machine Learning", "Python", "Inteligência Artificial", "Back-end", "Cloud", "Outros"];

export function Projects({ projects, githubUrl }: { projects: Project[]; githubUrl: string }) {
  const [active, setActive] = useState("Todos");
  const reduced = useReducedMotion();
  const availableProjects = useMemo(() => projects.filter((project) => project.id !== "campo-escola-digital"), [projects]);
  const shown = useMemo(() => active === "Todos" ? availableProjects : availableProjects.filter((project) => project.category === active || (active === "Python" && project.technologies.includes("Python"))), [active, availableProjects]);
  return (
    <section id="projetos" className="section bg-sand">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="Projetos selecionados" title="Aprendizado que ganha forma." text="Projetos construídos para transformar estudo em prática, com decisões técnicas, código aberto e resultados verificáveis." />
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="button button-secondary shrink-0"><Github size={18} /> Ver no GitHub <ArrowUpRight size={16} /></a>
        </div>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-3" aria-label="Filtrar projetos">
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActive(filter)} aria-pressed={active === filter} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${active === filter ? "border-olive bg-olive text-sand" : "border-earth/20 text-earth hover:border-olive hover:text-olive"}`}>{filter}</button>
          ))}
        </div>
        <motion.div layout className="mt-7 grid gap-6 md:grid-cols-2">
          {shown.map((project) => (
            <Reveal key={project.id}>
              <motion.article layout whileHover={reduced ? {} : { y: -5 }} className="group overflow-hidden rounded-[2rem] border border-line/70 bg-card shadow-sm transition-shadow hover:border-olive/40 hover:shadow-soft">
                <div className="relative aspect-[16/9] overflow-hidden bg-beige/30">
                  <Image src={project.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute left-4 top-4 rounded-full bg-sand/90 px-3 py-1.5 text-xs font-bold text-coffee backdrop-blur">{project.category}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-terracotta">{project.period}</p>
                    <span className="rounded-full bg-olive/10 px-3 py-1 text-xs font-bold text-olive">{project.status}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-coffee">{project.name}</h3>
                  <p className="mt-3 leading-7 text-earth/80">{project.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm text-earth">
                    {project.highlights.map((highlight) => <li key={highlight} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{highlight}</li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="badge">{tech}</span>)}</div>
                  <div className="mt-7 flex gap-3">
                    {project.repositoryUrl ? <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Repositório <ArrowUpRight size={15} /></a> : <span className="flex items-center gap-1.5 text-sm text-earth/50"><LockKeyhole size={14} /> Link a adicionar</span>}
                    {project.demoUrl && <a className="text-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração <ArrowUpRight size={15} /></a>}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </motion.div>
        {!shown.length && <p className="mt-10 rounded-2xl border border-dashed border-earth/30 p-8 text-center text-earth">Nenhum projeto publicado nesta categoria ainda.</p>}
      </div>
    </section>
  );
}
