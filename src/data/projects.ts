export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  description: string;
  thumbnail: string;
  color: string;
  caseStudy?: {
    overview: string;
    problem: string;
    solution: string;
    process: string[];
    results: string[];
  };
  externalUrl?: string;
}

