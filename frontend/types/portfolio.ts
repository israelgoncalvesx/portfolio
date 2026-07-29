export interface Profile {
  name: string;
  shortName: string;
  location: string;
  headline: string;
  intro: string;
  summary: string;
  availability: string;
}

export interface SkillGroup { category: string; items: string[] }
export interface SocialLink { name: "GitHub" | "LinkedIn"; url: string; handle: string }
export interface Experience { year: string; title: string; description: string; type: string }
export interface Education {
  degree: string; institution: string; startYear: string; expectedGraduation: string;
  status: string; achievements: string[];
}
export interface Project {
  id: string; name: string; summary: string; technologies: string[]; image: string;
  category: string; repositoryUrl: string | null; demoUrl: string | null;
  status: string; highlights: string[]; period: string; placeholder: boolean;
}
export interface FeaturedResearch {
  name: string; eyebrow: string; problem: string; proposal: string; technologies: string[];
  digitalTwins: string; research: string; participation: string[]; recognition: string;
}
export interface PortfolioData {
  profile: Profile; skills: SkillGroup[]; projects: Project[]; experiences: Experience[];
  education: Education; socialLinks: SocialLink[]; featuredResearch: FeaturedResearch;
}
