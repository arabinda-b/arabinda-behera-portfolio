export interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
  }
  
  export interface Project {
    title: string;
    description: string;
    tech: string[];
    link?: string;
  }
  
  export interface SkillGroup {
    category: string;
    skills: string[];
  }
  
  export interface Publication {
    title: string;
    journal: string;
    year: number;
    url: string;
    collaboration?: string;
  }
  
  export interface Award {
    title: string;
    org: string;
    year: number;
    url?: string;
  }
  
  export interface Certification {
    title: string;
    issuer: string;
    url?: string;
  }