import { Award, BookOpen, Box, BrainCircuit, Cloud, Code2, ExternalLink, GraduationCap, Search, Trophy } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { Contact } from "./contact";
import { Header } from "./header";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { Reveal, SectionTitle } from "./ui";

const skillIcons = [Code2, BrainCircuit, Box, Cloud, BookOpen];

export function Portfolio({ data }: { data: PortfolioData }) {
  const github = data.socialLinks.find((link) => link.name === "GitHub")?.url ?? "#";
  return (
    <>
      <Header />
      <main>
        <Hero profile={data.profile} socials={data.socialLinks} />

        <section id="sobre" className="section bg-beige/35">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <SectionTitle eyebrow="Sobre mim" title="Curiosidade técnica com os pés no mundo real." />
            <Reveal>
              <p className="text-xl leading-9 text-coffee sm:text-2xl">{data.profile.summary}</p>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {[["Formação", "Engenharia da Computação"], ["Foco", "Dados, ML e IA"], ["Agora", "Em busca de estágio"]].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-coffee/10 bg-sand/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-terracotta">{label}</p>
                    <p className="mt-2 font-semibold leading-6 text-coffee">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="competencias" className="section bg-sand">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Competências" title="Uma base multidisciplinar." text="Tecnologias e práticas que venho aplicando em estudos, pesquisa e projetos — organizadas por contexto, sem níveis artificiais de proficiência." />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {data.skills.map((group, index) => {
                const Icon = skillIcons[index] ?? Code2;
                return (
                  <Reveal key={group.category}>
                    <article className="h-full rounded-[1.75rem] border border-line/70 bg-card p-7 transition hover:-translate-y-1 hover:border-olive/40 hover:shadow-soft motion-reduce:hover:translate-y-0">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-olive/10 text-olive"><Icon size={22} /></span>
                      <h3 className="mt-6 text-xl font-semibold text-coffee">{group.category}</h3>
                      <div className="mt-5 flex flex-wrap gap-2">{group.items.map((item) => <span className="badge" key={item}>{item}</span>)}</div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Projects projects={data.projects} githubUrl={github} />

        <section id="trajetoria" className="section bg-beige/35">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Experiência e trajetória" title="Marcos de uma jornada em movimento." />
            <div className="relative mt-14 ml-3 border-l border-olive/40 pl-8 sm:ml-6 sm:pl-12">
              {data.experiences.map((item) => (
                <Reveal key={`${item.year}-${item.title}`} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.72rem] top-1.5 h-3 w-3 rounded-full bg-olive ring-8 ring-beige/40 sm:-left-[3.43rem]" />
                  <div className="grid gap-2 sm:grid-cols-[170px_1fr] sm:gap-8">
                    <p className="font-mono text-sm font-bold text-terracotta">{item.year}</p>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[.15em] text-olive">{item.type}</span>
                      <h3 className="mt-1 text-xl font-semibold text-coffee">{item.title}</h3>
                      <p className="mt-2 leading-7 text-earth/80">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="pced" className="section overflow-hidden bg-[#3B2F2F] text-[#F3E9DC] dark:bg-[#211E19]">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
              <Reveal>
                <p className="eyebrow text-beige">{data.featuredResearch.eyebrow}</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-[#F3E9DC] sm:text-6xl">{data.featuredResearch.name}</h2>
                <p className="mt-6 text-lg leading-8 text-beige">{data.featuredResearch.proposal}</p>
                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-terracotta/50 bg-terracotta/15 p-5">
                  <Award className="mt-1 shrink-0 text-beige" />
                  <div><p className="text-xs font-bold uppercase tracking-[.16em] text-beige">Reconhecimento científico</p><p className="mt-1 font-semibold">{data.featuredResearch.recognition}</p></div>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["O desafio", data.featuredResearch.problem],
                  ["Gêmeos digitais", data.featuredResearch.digitalTwins],
                  ["P&D e inovação", data.featuredResearch.research],
                ].map(([title, body]) => <Reveal key={title}><article className="h-full rounded-3xl border border-white/10 bg-white/5 p-6"><h3 className="font-semibold text-beige">{title}</h3><p className="mt-3 leading-7 text-[#F3E9DC]/75">{body}</p></article></Reveal>)}
                <Reveal>
                  <article className="h-full rounded-3xl bg-olive p-6">
                    <h3 className="font-semibold text-white">Minha participação</h3>
                    <ul className="mt-4 grid gap-2">
                      {data.featuredResearch.participation.map((item) => (
                        <li key={item} className="flex items-center gap-2 rounded-xl bg-black/10 px-3 py-2.5 text-sm font-medium text-white">
                          <Search aria-hidden="true" size={16} className="shrink-0 text-[#E8DDCD]" />{item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">{data.featuredResearch.technologies.map((tech) => <span key={tech} className="rounded-full border border-beige/20 px-3 py-1.5 text-sm text-beige">{tech}</span>)}</div>
          </div>
        </section>

        <section id="formacao" className="section bg-sand">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] border border-coffee/10 bg-beige/25 p-8 sm:p-10">
              <GraduationCap className="text-terracotta" size={32} />
              <p className="mt-8 text-sm font-bold uppercase tracking-[.16em] text-terracotta">Formação</p>
              <h2 className="mt-3 text-3xl font-semibold text-coffee">{data.education.degree}</h2>
              <p className="mt-3 text-lg text-earth">{data.education.institution}</p>
              <p className="mt-8 font-mono text-sm text-olive">{data.education.startYear} — conclusão prevista para {data.education.expectedGraduation}</p>
            </Reveal>
            <Reveal className="rounded-[2rem] bg-terracotta p-8 text-white sm:p-10">
              <Trophy size={32} />
              <p className="mt-8 text-sm font-bold uppercase tracking-[.16em] text-sand/80">Conquistas e desenvolvimento</p>
              <ul className="mt-6 space-y-5">{data.education.achievements.map((achievement) => <li key={achievement} className="flex gap-3 text-lg"><span aria-hidden="true">↗</span>{achievement}</li>)}</ul>
            </Reveal>
          </div>
        </section>

        <Contact socials={data.socialLinks} />
      </main>
      <footer className="border-t border-white/10 bg-[#3B2F2F] px-5 py-8 text-sm text-[#D8C3A5] dark:bg-[#211E19] dark:text-[#BFB2A1]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Israel Gonçalves. Desenvolvido com Next.js e Flask.</p>
          <div className="flex flex-wrap gap-5">
            {data.socialLinks.map((link) => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">{link.name}<ExternalLink size={13} /></a>)}
            <a href="#topo" className="hover:text-white">Voltar ao topo ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
