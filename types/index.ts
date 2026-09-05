export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  problem?: string;
  solution?: string;
  results?: string[];
  images?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface AboutData {
  bio: string[];
  skills: Skill[];
  timeline: TimelineItem[];
  technologies: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
