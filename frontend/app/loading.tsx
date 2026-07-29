export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-sand px-5 text-center">
      <div><span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-coffee/20 border-t-terracotta motion-reduce:animate-none" /><p className="mt-5 font-semibold text-coffee">Carregando portfólio…</p></div>
    </main>
  );
}
