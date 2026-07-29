import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-sand p-5 text-center"><div><p className="eyebrow">Erro 404</p><h1 className="mt-3 text-4xl font-semibold text-coffee">Página não encontrada.</h1><Link href="/" className="button button-primary mt-7">Voltar ao início</Link></div></main>;
}
