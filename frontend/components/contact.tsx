"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { sendContact } from "@/services/api";
import type { SocialLink } from "@/types/portfolio";
import { Reveal, SectionTitle } from "./ui";

type State = { kind: "idle" | "loading" | "success" | "error"; message: string };

const COLD_START_HINT_DELAY_MS = 4000;

export function Contact({ socials }: { socials: SocialLink[] }) {
  const [state, setState] = useState<State>({ kind: "idle", message: "" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState({ kind: "loading", message: "Enviando..." });
    const hintTimer = setTimeout(() => {
      setState({ kind: "loading", message: "Ainda enviando... o servidor pode levar até 30s para acordar." });
    }, COLD_START_HINT_DELAY_MS);
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    try {
      const result = await sendContact(data);
      setState({ kind: "success", message: result.message });
      form.reset();
    } catch (error) {
      setState({ kind: "error", message: error instanceof Error ? error.message : "Não foi possível enviar." });
    } finally {
      clearTimeout(hintTimer);
    }
  }
  return (
    <section id="contato" className="section bg-[#3B2F2F] text-[#F3E9DC] dark:bg-[#211E19]">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionTitle eyebrow="Contato" title="Uma boa conversa pode ser o começo." text="Tem uma oportunidade de estágio, colaboração acadêmica ou projeto em mente? Envie uma mensagem." />
          <div className="mt-8 flex flex-wrap gap-4">
            {socials.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-beige hover:text-white">{social.name} <ArrowUpRight size={16} /></a>)}
          </div>
        </div>
        <Reveal>
          <form onSubmit={submit} className="rounded-[2rem] bg-card p-6 text-ink shadow-2xl sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field">Nome<input name="name" required maxLength={100} autoComplete="name" /></label>
              <label className="field">E-mail<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
            </div>
            <label className="field mt-5">Assunto<input name="subject" required maxLength={150} /></label>
            <label className="field mt-5">Mensagem<textarea name="message" required maxLength={2000} rows={6} /><span className="text-xs font-normal text-earth/60">Máximo de 2.000 caracteres.</span></label>
            <label className="absolute -left-[10000px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button type="submit" disabled={state.kind === "loading"} className="button button-primary disabled:cursor-wait disabled:opacity-70">
                {state.kind === "loading" ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />} Enviar mensagem
              </button>
              <p role="status" aria-live="polite" className={`text-sm ${state.kind === "error" ? "text-red-700" : state.kind === "success" ? "text-olive" : "text-earth"}`}>{state.message}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
