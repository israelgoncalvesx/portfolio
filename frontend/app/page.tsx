import { Portfolio } from "@/components/portfolio";
import { getPortfolioData } from "@/services/api";

export default async function Home() {
  const data = await getPortfolioData();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.profile.name,
    address: { "@type": "PostalAddress", addressLocality: "Salvador", addressRegion: "Bahia", addressCountry: "BR" },
    affiliation: { "@type": "CollegeOrUniversity", name: data.education.institution },
    sameAs: data.socialLinks.map((link) => link.url),
    knowsAbout: data.skills.flatMap((group) => group.items),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Portfolio data={data} />
    </>
  );
}
