// Template Schema Definitions
// This file contains the JSON schemas for different resume templates

import { registerTemplate, createTemplateDefinition } from './template-registry';

export interface TemplateSchema {
  version?: string;
  key?: string;
  name?: string;
  page?: {
    size?: string;
    margins?: number;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  colors?: {
    primary?: string;
    text?: string;
    muted?: string;
    divider?: string;
    background?: string;
    accent?: string;
  };
  layout: any; // The rendering schema - can be array or object
}

export interface SampleResumeData {
  basics: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    links: Array<{ label: string; url: string }>;
  };
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    start: string;
    end: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
    details?: string;
  }>;
  projects?: Array<{
    name: string;
    link: string;
    bullets: string[];
  }>;
  skills: string[];
}

// Classic Template Schema
export const classicTemplateSchema: TemplateSchema = {
  version: "v1",
  key: "classic",
  name: "Classic",
  page: { size: "A4", margins: 32 },
  fonts: { heading: "'Plus Jakarta Sans', Inter, system-ui", body: "Inter, system-ui" },
  colors: { primary: "#4F46E5", text: "#0F172A", muted: "#475569", divider: "#E2E8F0" },
  layout: {
    type: "vstack",
    style: { gap: 14 },
    children: [
      {
        type: "vstack",
        style: { gap: 2 },
        children: [
          { type: "text", text: "{{basics.fullName}}", style: { font: "heading", size: 28, weight: 700 } },
          { type: "text", text: "{{basics.title}}", showIf: "basics.title", style: { color: "muted", size: 14 } },
          { type: "text", text: "{{basics.email}} • {{basics.phone}} • {{basics.location}}", style: { color: "muted", size: 12 } },
        ],
      },
      { type: "divider" },
      {
        type: "section",
        showIf: "summary",
        label: "SUMMARY",
        labelStyle: { weight: 600, size: 11, color: "muted" },
        child: { type: "text", text: "{{summary}}", style: { size: 14 } },
      },
      {
        type: "section",
        showIf: "experience.length",
        label: "EXPERIENCE",
        labelStyle: { weight: 600, size: 11, color: "muted" },
        child: {
          type: "list",
          from: "experience",
          item: {
            type: "vstack",
            style: { mb: 8 },
            children: [
              {
                type: "hstack",
                gap: 8,
                columns: [
                  { width: 8, child: { type: "text", text: "{{role}} • {{company}}", style: { weight: 600 } } },
                  { width: 4, child: { type: "text", text: "{{location}} • {{start}} – {{end}}", style: { align: "right", size: 12, color: "muted" } } },
                ],
              },
              {
                type: "list",
                from: "bullets",
                item: { type: "text", text: "• {{.}}", style: { size: 14 } },
              },
            ],
          },
        },
      },
      {
        type: "section",
        showIf: "education.length",
        label: "EDUCATION",
        labelStyle: { weight: 600, size: 11, color: "muted" },
        child: {
          type: "list",
          from: "education",
          item: {
            type: "hstack",
            columns: [
              { width: 8, child: { type: "text", text: "{{school}} • {{degree}}", style: { weight: 600 } } },
              { width: 4, child: { type: "text", text: "{{start}} – {{end}}", style: { align: "right", size: 12, color: "muted" } } },
            ],
          },
        },
      },
      {
        type: "section",
        showIf: "skills.length",
        label: "SKILLS",
        labelStyle: { weight: 600, size: 11, color: "muted" },
        child: { type: "text", text: "{{skills|join: • }}", style: { size: 14 } },
      },
    ],
  },
};

// Modern Template Schema
export const modernTemplateSchema: TemplateSchema = {
  version: "v1",
  key: "modern",
  name: "Modern",
  page: { size: "A4", margins: 24 },
  fonts: { heading: "'Inter', system-ui", body: "'Inter', system-ui" },
  colors: { primary: "#2563EB", text: "#1F2937", muted: "#6B7280", divider: "#E5E7EB" },
  layout: {
    type: "vstack",
    style: { gap: 20 },
    children: [
      {
        type: "hstack",
        columns: [
          {
            width: 2,
            child: {
              type: "vstack",
              style: { gap: 16 },
              children: [
                { type: "text", text: "{{basics.fullName}}", style: { font: "heading", size: 24, weight: 700 } },
                { type: "text", text: "{{basics.title}}", style: { color: "primary", size: 16, weight: 500 } },
                { type: "text", text: "{{basics.email}}", style: { size: 12 } },
                { type: "text", text: "{{basics.phone}}", style: { size: 12 } },
                { type: "text", text: "{{basics.location}}", style: { size: 12 } },
              ],
            },
          },
          {
            width: 8,
            child: {
              type: "vstack",
              style: { gap: 20 },
              children: [
                {
                  type: "section",
                  showIf: "summary",
                  label: "PROFESSIONAL SUMMARY",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: { type: "text", text: "{{summary}}", style: { size: 13 } },
                },
                {
                  type: "section",
                  showIf: "experience.length",
                  label: "PROFESSIONAL EXPERIENCE",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: {
                    type: "list",
                    from: "experience",
                    item: {
                      type: "vstack",
                      style: { mb: 12 },
                      children: [
                        { type: "text", text: "{{role}}", style: { weight: 600, size: 14 } },
                        { type: "text", text: "{{company}} • {{start}} – {{end}}", style: { color: "muted", size: 12 } },
                        {
                          type: "list",
                          from: "bullets",
                          item: { type: "text", text: "• {{.}}", style: { size: 12 } },
                        },
                      ],
                    },
                  },
                },
                {
                  type: "section",
                  showIf: "skills.length",
                  label: "TECHNICAL SKILLS",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: { type: "text", text: "{{skills|join: • }}", style: { size: 12 } },
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

// Creative Template Schema
export const creativeTemplateSchema: TemplateSchema = {
  version: "v1",
  key: "creative",
  name: "Creative",
  page: { size: "A4", margins: 28 },
  fonts: { heading: "'Poppins', Inter, system-ui", body: "'Inter', system-ui" },
  colors: { primary: "#7C3AED", text: "#1F2937", muted: "#6B7280", divider: "#E5E7EB" },
  layout: {
    type: "vstack",
    style: { gap: 18 },
    children: [
      {
        type: "vstack",
        style: { gap: 4, alignItems: "center" },
        children: [
          { type: "text", text: "{{basics.fullName}}", style: { font: "heading", size: 32, weight: 700, align: "center" } },
          { type: "text", text: "{{basics.title}}", style: { color: "primary", size: 16, weight: 500, align: "center" } },
          { type: "text", text: "{{basics.email}} • {{basics.phone}} • {{basics.location}}", style: { color: "muted", size: 12, align: "center" } },
        ],
      },
      {
        type: "hstack",
        columns: [
          {
            width: 6,
            child: {
              type: "vstack",
              style: { gap: 16 },
              children: [
                {
                  type: "section",
                  showIf: "experience.length",
                  label: "EXPERIENCE",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: {
                    type: "list",
                    from: "experience",
                    item: {
                      type: "vstack",
                      style: { mb: 10 },
                      children: [
                        { type: "text", text: "{{role}}", style: { weight: 600, size: 14 } },
                        { type: "text", text: "{{company}} • {{start}} – {{end}}", style: { color: "muted", size: 11 } },
                        {
                          type: "list",
                          from: "bullets",
                          item: { type: "text", text: "• {{.}}", style: { size: 12 } },
                        },
                      ],
                    },
                  },
                },
                {
                  type: "section",
                  showIf: "education.length",
                  label: "EDUCATION",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: {
                    type: "list",
                    from: "education",
                    item: {
                      type: "vstack",
                      style: { mb: 8 },
                      children: [
                        { type: "text", text: "{{school}} • {{degree}}", style: { weight: 600, size: 13 } },
                        { type: "text", text: "{{start}} – {{end}}", style: { color: "muted", size: 11 } },
                      ],
                    },
                  },
                },
              ],
            },
          },
          {
            width: 4,
            child: {
              type: "vstack",
              style: { gap: 16 },
              children: [
                {
                  type: "section",
                  showIf: "summary",
                  label: "ABOUT",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: { type: "text", text: "{{summary}}", style: { size: 12 } },
                },
                {
                  type: "section",
                  showIf: "skills.length",
                  label: "SKILLS",
                  labelStyle: { weight: 700, size: 14, color: "primary" },
                  child: { type: "text", text: "{{skills|join: • }}", style: { size: 12 } },
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

// Sample data for previews
export const sampleResumeData: SampleResumeData = {
  basics: {
    fullName: "Alex Johnson",
    title: "Senior Frontend Developer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    links: [
      { label: "GitHub", url: "github.com/alexjohnson" },
      { label: "LinkedIn", url: "linkedin.com/in/alexjohnson" },
    ],
  },
  summary: "Experienced frontend developer with 5+ years building scalable web applications. Passionate about creating intuitive user experiences and optimizing performance. Led teams of 4+ developers and delivered projects that improved user engagement by 40%. Proven track record from junior to senior level positions.",
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      location: "San Francisco, CA",
      start: "Jan 2022",
      end: "Present",
      bullets: [
        "Led development of company's flagship product serving 100K+ users",
        "Implemented performance optimizations that reduced load time by 50%",
        "Mentored junior developers and established coding best practices",
        "Collaborated with design team to create consistent UI components",
      ],
    },
    {
      company: "StartupXYZ",
      role: "Frontend Developer",
      location: "Remote",
      start: "Mar 2020",
      end: "Dec 2021",
      bullets: [
        "Built responsive web applications using React and TypeScript",
        "Integrated with REST APIs and implemented real-time features",
        "Improved test coverage from 60% to 90% using Jest and Testing Library",
        "Participated in agile development process and code reviews",
      ],
    },
    {
      company: "WebSolutions Ltd.",
      role: "Junior Frontend Developer",
      location: "Austin, TX",
      start: "Jun 2019",
      end: "Feb 2020",
      bullets: [
        "Developed and maintained 15+ client websites using modern frameworks",
        "Implemented SEO best practices improving client rankings by 25%",
        "Reduced page load times by 45% through image optimization",
        "Collaborated with senior developers on complex feature implementations",
      ],
    },
  ],
  education: [
    {
      school: "University of California",
      degree: "Bachelor of Science in Computer Science",
      start: "2016",
      end: "2020",
      details: "Graduated Magna Cum Laude",
    },
    {
      school: "CodeAcademy",
      degree: "Full-Stack Web Development Certification",
      start: "2019",
      end: "2019",
      details: "Top 5% of cohort",
    },
  ],
  projects: [
    {
      name: "Personal Portfolio",
      link: "https://alexjohnson.dev",
      bullets: [
        "Built with Next.js and TypeScript",
        "Implemented dark mode and responsive design",
        "Achieved 100% Lighthouse performance score",
      ],
    },
  ],
  skills: [
    "React", "TypeScript", "Next.js", "Node.js", "GraphQL", 
    "Tailwind CSS", "Jest", "Cypress", "Git", "AWS"
  ],
};

// Template definition interface
export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  previewUrl?: string;
  schema: TemplateSchema;
  sampleData: SampleResumeData;
}

// Professional template with purple header
const professionalTemplateSchema: TemplateSchema = {
  version: "1.0",
  key: "professional-purple",
  name: "Professional Purple",
  page: {
    size: "A4",
    margins: 20,
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    primary: "#7c3aed", // purple-600
    text: "#374151", // gray-700
    muted: "#6b7280", // gray-500
    divider: "#d1d5db", // gray-300
  },
  layout: {
    type: "vstack",
    style: { gap: 0 },
    children: [
      {
        type: "container",
        style: { background: "#7c3aed", color: "white", padding: "32px" },
        child: {
          type: "hstack",
          columns: [
            { 
              width: 8, 
              child: { 
                type: "text", 
                text: "{{basics.fullName}}", 
                style: { weight: 700, size: 32 } 
              } 
            },
            { 
              width: 4, 
              child: { 
                type: "vstack",
                gap: 4,
                children: [
                  { type: "text", text: "{{basics.location}}", style: { align: "right", size: 14 } },
                  { type: "text", text: "{{basics.phone}}", style: { align: "right", size: 14 } },
                  { type: "text", text: "{{basics.email}}", style: { align: "right", size: 14 } }
                ]
              } 
            },
          ],
        },
      },
      {
        type: "container",
        style: { padding: "32px" },
        child: {
          type: "vstack",
          gap: 24,
          children: [
            {
              type: "text",
              text: "{{summary}}",
              style: { size: 14, lineHeight: 1.6 }
            },
            {
              type: "hstack",
              gap: 32,
              columns: [
                {
                  width: 8,
                  child: {
                    type: "vstack",
                    gap: 16,
                    children: [
                      {
                        type: "section",
                        showIf: "experience.length",
                        label: "Work History",
                        labelStyle: { weight: 600, size: 18, color: "text" },
                        child: {
                          type: "list",
                          from: "experience",
                          item: {
                            type: "vstack",
                            gap: 8,
                            children: [
                              {
                                type: "hstack",
                                columns: [
                                  { width: 8, child: { type: "text", text: "{{role}}", style: { weight: 600 } } },
                                  { width: 4, child: { type: "text", text: "{{start}} - {{end}}", style: { align: "right", size: 12, color: "muted" } } },
                                ],
                              },
                              {
                                type: "text",
                                text: "{{company}}, {{location}}",
                                style: { size: 14, color: "muted" }
                              },
                              {
                                type: "list",
                                from: "bullets",
                                item: { type: "text", text: "• {{.}}", style: { size: 14 } },
                              },
                            ],
                          },
                        },
                      }
                    ]
                  }
                },
                {
                  width: 4,
                  child: {
                    type: "vstack",
                    gap: 16,
                    children: [
                      {
                        type: "section",
                        showIf: "skills.length",
                        label: "Skills",
                        labelStyle: { weight: 600, size: 18, color: "text" },
                        child: {
                          type: "list",
                          from: "skills",
                          item: { type: "text", text: "• {{.}}", style: { size: 14 } },
                        },
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  }
};

// Template definitions with schemas
export const templateDefinitions: TemplateDefinition[] = [
  {
    id: "template-classic-001",
    name: "Executive Classic",
    description: "Traditional, professional layout ideal for senior positions and corporate roles.",
    category: "Classic",
    tags: ["Professional", "Traditional", "Executive"],
    isPremium: false,
    previewUrl: "/assets/resume-template.png",
    schema: classicTemplateSchema,
    sampleData: sampleResumeData,
  },
  {
    id: "template-modern-001",
    name: "Modern Professional",
    description: "Clean, minimal design with modern typography. Perfect for tech and creative roles.",
    category: "Modern",
    tags: ["Modern", "ATS-friendly", "Clean"],
    isPremium: false,
    previewUrl: "/assets/resume-template.png",
    schema: modernTemplateSchema,
    sampleData: sampleResumeData,
  },
  {
    id: "template-creative-001",
    name: "Creative Edge",
    description: "Contemporary design with subtle creative elements while maintaining professionalism.",
    category: "Creative",
    tags: ["Creative", "Modern", "Unique"],
    isPremium: false,
    previewUrl: "/assets/resume-template.png",
    schema: creativeTemplateSchema,
    sampleData: sampleResumeData,
  },
  {
    id: "template-professional-001",
    name: "Professional Purple",
    description: "Professional design with distinctive purple header and clean two-column layout.",
    category: "Professional",
    tags: ["Professional", "Purple", "Executive"],
    isPremium: false,
    previewUrl: "/assets/resume-template.png",
    schema: professionalTemplateSchema,
    sampleData: sampleResumeData,
  },
];

// Auto-register all templates with the registry
templateDefinitions.forEach(definition => {
  registerTemplate(definition);
});

// Helper function to create and register new templates dynamically
export const createAndRegisterTemplate = (
  id: string,
  name: string,
  category: string,
  schema: TemplateSchema,
  sampleData: SampleResumeData,
  options: Partial<Omit<TemplateDefinition, 'id' | 'name' | 'category' | 'schema' | 'sampleData'>> = {}
): TemplateDefinition => {
  const definition = createTemplateDefinition(id, name, category, schema, sampleData, options);
  registerTemplate(definition);
  templateDefinitions.push(definition);
  return definition;
};

// Types are already exported above
