export type Project = {
  slug: string;
  number: string;
  name: string;
  industry: string;
  label: string;
  summary: string;
  brief: string;
  approach: string;
  outcome: string;
  services: string[];
  stack: string[];
  heroImage: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "orita",
    number: "01",
    name: "Orita",
    industry: "Fine dining / Hospitality",
    label: "Independent build",
    summary:
      "A fine-dining website shaped around atmosphere, detail, and helping guests decide to book.",
    brief:
      "The goal was to create a digital experience that feels considered before a guest ever arrives. The website needed to communicate the restaurant’s atmosphere, make essential information easy to find, and give visitors a clear path to booking.",
    approach:
      "The experience uses an editorial visual direction, deliberate type hierarchy, and an image-led layout to create a sense of pace and occasion. Navigation and calls to action remain simple so visual atmosphere does not get in the way of practical decisions.",
    outcome:
      "A focused hospitality website concept that balances visual character with a clear path toward exploring the menu, finding key details, and making a reservation.",
    services: ["Strategy", "UX direction", "Visual design", "Frontend development"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    heroImage: "/work/orita.webp",
    gallery: [
      "/work/orita.webp",
      "/work/orita-detail-01.webp",
      "/work/orita-detail-02.webp",
    ],
    githubUrl: "https://github.com/NemoCode-3011/Orita-fine-dining",
  },
  {
    slug: "arcadia-homes",
    number: "02",
    name: "Arcadia Homes",
    industry: "Property / Real estate",
    label: "Independent build",
    summary:
      "A property website designed to make browsing homes and taking the next step feel clearer.",
    brief:
      "The project explored how a property business could present homes, locations, and key information without overwhelming prospective buyers. The priority was clarity, confidence, and a structure that helps visitors move from browsing to enquiry.",
    approach:
      "The site uses a calm visual system, spacious layouts, and an information hierarchy that gives listings and property details room to breathe. Important actions remain visible throughout the experience, while content is organised around the questions a buyer is likely to have.",
    outcome:
      "A property website concept that demonstrates a clearer, more considered route from discovering a home to making an enquiry.",
    services: ["Information architecture", "UX design", "UI design", "Frontend development"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    heroImage: "/work/arcadia-homes.webp",
    gallery: [
      "/work/arcadia-homes.webp",
      "/work/arcadia-homes-detail-01.webp",
      "/work/arcadia-homes-detail-02.webp",
    ],
    githubUrl: "https://github.com/NemoCode-3011/arcadia-homes",
  },
  {
    slug: "knost-and-co",
    number: "03",
    name: "Knost & Co",
    industry: "Construction",
    label: "Independent build",
    summary:
      "A construction website built to communicate capability, trust, and the quality behind the work.",
    brief:
      "Construction businesses need a digital presence that makes their expertise feel tangible. This project explored how to communicate services, quality, and confidence without relying on generic trade-business patterns.",
    approach:
      "The design uses a structured layout, confident typography, and a direct content hierarchy. The experience focuses on helping a visitor understand what the company does, see the standard of work, and take a practical next step.",
    outcome:
      "A construction website concept with a stronger sense of craft, capability, and trust than a standard brochure-style site.",
    services: ["Content structure", "UX direction", "Visual design", "Frontend development"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    heroImage: "/work/knost-and-co.webp",
    gallery: [
      "/work/knost-and-co.webp",
      "/work/knost-and-co-detail-01.webp",
      "/work/knost-and-co-detail-02.webp",
    ],
    githubUrl: "https://github.com/NemoCode-3011/knost-and-co",
  },
  {
    slug: "de-prime-barbers",
    number: "04",
    name: "De Prime Barbers",
    industry: "Grooming / Local business",
    label: "Independent build",
    summary:
      "A local barbershop website with a direct, expressive presence built for appointment-focused browsing.",
    brief:
      "The brief was to create a website that reflects a modern barbershop’s personality while keeping the journey to services, location, and booking direct. The experience needed local-business practicality without losing character.",
    approach:
      "The design uses stronger contrast, expressive typography, and a clear content order to bring energy to the brand. Key details are made easy to scan so visitors can quickly understand the offer and decide to book.",
    outcome:
      "A distinctive local-business website concept that combines personality with a simple appointment-focused journey.",
    services: ["Brand expression", "UX design", "UI design", "Frontend development"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    heroImage: "/work/de-prime-barbers.webp",
    gallery: [
      "/work/de-prime-barbers.webp",
      "/work/de-prime-barbers-detail-01.webp",
      "/work/de-prime-barbers-detail-02.webp",
    ],
    githubUrl: "https://github.com/NemoCode-3011/de-prime-barbers",
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}