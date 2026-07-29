"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="grid min-h-screen place-items-center bg-sand p-5 text-center">
      <div className="max-w-lg rounded-3xl border border-line bg-card p-10 shadow-soft">
        <p className="eyebrow">Conexão interrompida</p>
        <h1 className="mt-3 text-3xl font-semibold text-coffee">Não foi possível carregar o portfólio.</h1>
        <p className="mt-4 text-earth">Verifique se a API Flask está em execução e tente novamente.</p>
        <button onClick={reset} className="button button-primary mt-7">Tentar novamente</button>
      </div>
    </main>
  );
}
