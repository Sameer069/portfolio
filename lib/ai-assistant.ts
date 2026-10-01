// AI Assistant Knowledge Base and Response Generator

interface KnowledgeBase {
  portfolio: {
    [key: string]: string;
  };
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    tags: string[];
  }>;
  contact: {
    email: string;
    location: string;
    availability: string;
    github: string;
    linkedin: string;
  };
}

export const knowledgeBase: KnowledgeBase = {
  portfolio: {
    name: "Sameer Das",
    role: "Full-Stack Developer",
    experience: "Building production web applications with MERN stack, Next.js, PostgreSQL, Prisma ORM, Redis, and AWS",
    currentRole: "Full-Stack Developer at Abhyaas Edu Technologies Pvt. Ltd. since April 2026",
    previousRole: "Full-Stack Developer Intern at Abhyaas Edu Technologies from October 2025 to April 2026",
    education: "Bachelor of Computer Application (BCA) from Academy of Technocrats, Berhampur University (Oct 2021 – Apr 2024)",
    specialization: "Real-time applications, secure authentication, payment integrations, and scalable systems",
  },
  skills: [
    "JavaScript", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3",
    "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
    "Prisma ORM", "Redis", "Socket.IO", "WebSocket", "REST APIs",
    "JWT", "AWS", "Git", "GitHub"
  ],
  projects: [
    {
      name: "Home Tuition Platform",
      description: "Full-stack web application for connecting students with tutors, featuring secure authentication, real-time chat, and payment integration",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Socket.IO", "Razorpay"]
    },
    {
      name: "PostClub Social Platform",
      description: "Social media platform with real-time features, user authentication, and interactive content sharing",
      tags: ["React.js", "Node.js", "MongoDB", "Socket.IO", "JWT"]
    },
    {
      name: "Video Library System",
      description: "Video management and streaming platform with AWS S3 integration and secure access control",
      tags: ["Next.js", "AWS", "PostgreSQL", "Redis", "Video Streaming"]
    }
  ],
  contact: {
    email: "sameerdas0907@gmail.com",
    location: "Odisha, India",
    availability: "Open for full-time opportunities",
    github: "https://github.com/sameerdas0907",
    linkedin: "https://linkedin.com/in/sameer-das"
  }
};

export interface AIResponse {
  text: string;
  action?: {
    type: 'redirect' | 'scroll' | 'external';
    target: string;
  };
  suggestions?: string[];
}

export class AIAssistant {
  private knowledgeBase: KnowledgeBase;

  constructor(kb: KnowledgeBase = knowledgeBase) {
    this.knowledgeBase = kb;
  }

  // Main query handler
  async handleQuery(query: string): Promise<AIResponse> {
    const q = query.toLowerCase().trim();

    // Check external questions FIRST (more specific)
    if (this.isExternalQuestion(q)) {
      return this.handleExternalQuestion(q);
    }

    // Then check portfolio questions
    if (this.isPortfolioQuestion(q)) {
      return this.handlePortfolioQuestion(q);
    }

    // Default: treat as portfolio question
    return this.handlePortfolioQuestion(q);
  }

  private isPortfolioQuestion(query: string): boolean {
    const portfolioKeywords = [
      'sameer', 'project', 'experience', 'skill', 'education', 
      'hire', 'contact', 'portfolio', 'background', 'tech stack', 
      'developer', 'what do you', 'tell me about yourself',
      'who are you', 'where do you work', 'show me your'
    ];
    return portfolioKeywords.some(keyword => query.includes(keyword));
  }

  private isExternalQuestion(query: string): boolean {
    const externalIndicators = [
      'what is', 'how to', 'explain', 'define', 'search for',
      'find', 'look up', 'google', 'open ', 'go to', 'redirect',
      'weather', 'news', 'what time', 'what date', 'current time'
    ];
    return externalIndicators.some(indicator => query.includes(indicator));
  }

  private handlePortfolioQuestion(query: string): AIResponse {
    const q = query.toLowerCase();

    // Identity questions
    if (q.match(/who (are you|is sameer|is sam)|your name|introduce yourself|tell me about you/)) {
      return {
        text: `Hi! I'm ${this.knowledgeBase.portfolio.name}, a ${this.knowledgeBase.portfolio.role}. ${this.knowledgeBase.portfolio.experience}. Currently working at Abhyaas Edu Technologies building scalable web applications.`,
        suggestions: ['Tell me about your projects', 'What are your skills?', 'How can I contact you?']
      };
    }

    // Experience questions
    if (q.match(/experience|work|job|current role|company|employer|where do you work/)) {
      return {
        text: `${this.knowledgeBase.portfolio.currentRole}. Previously, ${this.knowledgeBase.portfolio.previousRole}. I specialize in ${this.knowledgeBase.portfolio.specialization}.`,
        action: { type: 'scroll', target: 'about' },
        suggestions: ['Show me your projects', 'What technologies do you use?']
      };
    }

    // Skills questions
    if (q.match(/skill|technology|tech stack|what.*know|what do you know|languages|frameworks|technologies/)) {
      const topSkills = this.knowledgeBase.skills.slice(0, 8).join(', ');
      return {
        text: `I work with: ${topSkills}, and more. I specialize in full-stack development with MERN stack, Next.js, PostgreSQL, and cloud deployment on AWS.`,
        action: { type: 'scroll', target: 'about' },
        suggestions: ['See your projects', 'How can I hire you?']
      };
    }

    // Projects questions
    if (q.match(/project|portfolio|built|created|developed|work samples|show.*work|your work/)) {
      const projectList = this.knowledgeBase.projects
        .map(p => `${p.name} (${p.tags.slice(0, 3).join(', ')})`)
        .join('; ');
      return {
        text: `I've built: ${projectList}. Check out the Projects section below for detailed case studies!`,
        action: { type: 'scroll', target: 'projects' },
        suggestions: ['Tell me about Home Tuition Platform', 'What are your technical skills?']
      };
    }

    // Contact/Hire questions
    if (q.match(/hire|contact|email|reach|available|freelance|opportunity/)) {
      return {
        text: `I'm ${this.knowledgeBase.contact.availability}! You can reach me at ${this.knowledgeBase.contact.email}. I'm based in ${this.knowledgeBase.contact.location}. Let's discuss your project!`,
        action: { type: 'scroll', target: 'contact' },
        suggestions: ['Open GitHub', 'Open LinkedIn', 'What kind of projects do you work on?']
      };
    }

    // GitHub/LinkedIn direct mentions
    if (q.match(/github|git hub/)) {
      return {
        text: `Opening Sameer's GitHub profile! You can see all the projects and code repositories there.`,
        action: { type: 'external', target: this.knowledgeBase.contact.github },
        suggestions: ['Show me your projects', 'What technologies do you use?']
      };
    }

    if (q.match(/linkedin|linked in/)) {
      return {
        text: `Opening Sameer's LinkedIn profile! Connect and see the professional experience.`,
        action: { type: 'external', target: this.knowledgeBase.contact.linkedin },
        suggestions: ['Tell me about your experience', 'What are your skills?']
      };
    }

    // Education questions
    if (q.match(/education|degree|university|college|study|studied/)) {
      return {
        text: `${this.knowledgeBase.portfolio.education}. I focused on full-stack development, database systems, and software engineering during my studies.`,
        action: { type: 'scroll', target: 'about' },
        suggestions: ['What projects have you built?', 'What technologies do you know?']
      };
    }

    // Greetings
    if (q.match(/^(hi|hello|hey|sup|greetings)/)) {
      return {
        text: `Hello! I'm ${this.knowledgeBase.portfolio.name}, ${this.knowledgeBase.portfolio.role}. Feel free to ask me about my projects, skills, or how we can work together!`,
        suggestions: ['Tell me about yourself', 'Show me your projects', 'What are your skills?']
      };
    }

    // Default portfolio response
    console.log('No specific match found for query:', q);
    return {
      text: `I'm ${this.knowledgeBase.portfolio.name}, specializing in ${this.knowledgeBase.portfolio.specialization}. Ask me about my projects, tech stack, or availability!`,
      suggestions: ['Show projects', 'List skills', 'Contact info']
    };
  }

  private handleExternalQuestion(query: string): AIResponse {
    const q = query.toLowerCase();

    // Time/Date questions
    if (q.match(/what.*time|current time|what.*date|today/)) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return {
        text: `Current time is ${time}, and today is ${date}. Is there anything else you'd like to know about my portfolio?`,
        suggestions: ['Show me your work', 'What technologies do you use?']
      };
    }

    // Web search/redirect questions
    if (q.match(/search for|google|look up|find (information|info)/)) {
      const searchTerm = query.replace(/(search for|google|look up|find (information|info) (on|about)?)/gi, '').trim();
      return {
        text: `I can help you search for "${searchTerm}". I'll open Google for you! Or would you like to know about my portfolio instead?`,
        action: { 
          type: 'external', 
          target: `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}` 
        },
        suggestions: ['Actually, tell me about your projects', 'What are your skills?']
      };
    }

    // Website redirect
    if (q.match(/open|go to|visit|redirect to/)) {
      const urlMatch = query.match(/(?:open|go to|visit|redirect to)\s+([\w\s.]+)/i);
      if (urlMatch) {
        const site = urlMatch[1].trim().toLowerCase();
        
        // Handle GitHub specially - open Sameer's profile
        if (site.includes('github') || site === 'github') {
          return {
            text: `Opening Sameer's GitHub profile for you! Check out all the projects and contributions.`,
            action: { type: 'external', target: this.knowledgeBase.contact.github },
            suggestions: ['Show me your projects', 'What technologies do you use?']
          };
        }
        
        // Handle LinkedIn specially - open Sameer's profile
        if (site.includes('linkedin') || site === 'linkedin') {
          return {
            text: `Opening Sameer's LinkedIn profile! Let's connect professionally.`,
            action: { type: 'external', target: this.knowledgeBase.contact.linkedin },
            suggestions: ['Tell me about your experience', 'How can I contact you?']
          };
        }
        
        // Handle YouTube
        if (site.includes('youtube') || site === 'youtube') {
          return {
            text: `Opening YouTube for you!`,
            action: { type: 'external', target: 'https://www.youtube.com' },
            suggestions: ['Show me your portfolio', 'What are your skills?']
          };
        }
        
        // Handle other common sites
        const commonSites: { [key: string]: string } = {
          'google': 'https://www.google.com',
          'twitter': 'https://www.twitter.com',
          'facebook': 'https://www.facebook.com',
          'instagram': 'https://www.instagram.com',
          'reddit': 'https://www.reddit.com',
          'stackoverflow': 'https://stackoverflow.com',
          'stack overflow': 'https://stackoverflow.com',
        };
        
        if (commonSites[site]) {
          return {
            text: `Opening ${site} for you!`,
            action: { type: 'external', target: commonSites[site] },
            suggestions: ['Tell me about your portfolio', 'Show your projects']
          };
        }
        
        const url = site.includes('.') ? `https://${site}` : `https://www.google.com/search?q=${encodeURIComponent(site)}`;
        return {
          text: `Opening ${site} for you! Meanwhile, feel free to explore my portfolio and projects.`,
          action: { type: 'external', target: url },
          suggestions: ['Show me your portfolio', 'What technologies do you know?']
        };
      }
    }

    // Technology explanations
    if (q.match(/what is (react|javascript|typescript|nodejs|nextjs|mongodb|postgresql|aws|redis)/)) {
      const tech = q.match(/(react|javascript|typescript|nodejs|node\.js|nextjs|next\.js|mongodb|postgresql|aws|redis)/)?.[0];
      return {
        text: `${tech} is a technology I use extensively! I can show you my projects using ${tech}, or I can help you search for more information about it online.`,
        action: { 
          type: 'external', 
          target: `https://www.google.com/search?q=what+is+${tech}` 
        },
        suggestions: [`Show projects using ${tech}`, 'What is your tech stack?']
      };
    }

    // General knowledge
    return {
      text: `That's an interesting question! While I'm focused on helping you learn about Sameer's portfolio, I can help you search for that online, or you can ask me about his projects and skills!`,
      action: { 
        type: 'external', 
        target: `https://www.google.com/search?q=${encodeURIComponent(query)}` 
      },
      suggestions: ['Tell me about your portfolio', 'Show me your projects', 'What are your skills?']
    };
  }
}

// Export singleton instance
export const aiAssistant = new AIAssistant();
