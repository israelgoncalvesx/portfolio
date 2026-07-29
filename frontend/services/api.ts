import type { PortfolioData } from "@/types/portfolio";

type ApiResponse<T> = { success: boolean; data: T; error: string | null };
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const serverApiUrl = process.env.INTERNAL_API_URL ?? publicApiUrl;

async function getResource<T>(resource: string): Promise<T> {
  const response = await fetch(`${serverApiUrl}/${resource}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Falha ao carregar ${resource}.`);
  const payload = (await response.json()) as ApiResponse<T>;
  if (!payload.success) throw new Error(payload.error ?? "Erro inesperado.");
  return payload.data;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [profile, skills, projects, experiences, education, socialLinks, featuredResearch] =
    await Promise.all([
      getResource<PortfolioData["profile"]>("profile"),
      getResource<PortfolioData["skills"]>("skills"),
      getResource<PortfolioData["projects"]>("projects"),
      getResource<PortfolioData["experiences"]>("experiences"),
      getResource<PortfolioData["education"]>("education"),
      getResource<PortfolioData["socialLinks"]>("social-links"),
      getResource<PortfolioData["featuredResearch"]>("featured-research"),
    ]);
  return { profile, skills, projects, experiences, education, socialLinks, featuredResearch };
}

export async function sendContact(body: Record<string, string>) {
  const response = await fetch(`${publicApiUrl}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as ApiResponse<{ message: string }>;
  if (!response.ok || !payload.success) throw new Error(payload.error ?? "Não foi possível enviar.");
  return payload.data;
}
