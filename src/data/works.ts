export type WorkItem = {
  number: string;
  name: string;
  category: string;
  description: string;
  caseStudyHref: string;
  liveHref?: string;
  githubHref?: string;
  image: string;
};

export const workItems = [
  {
    number: "01",
    name: "Orita",
    category: "Fine dining / Hospitality",
    description:
      "A digital experience shaped around atmosphere, detail, and the decision to book a table.",
    caseStudyHref: "/work/orita",
    liveHref: "https://orita-fine-dining.vercel.app/",
    githubHref: "https://github.com/NemoCode-3011/Orita-fine-dining",
    image: "/assets/orita.png",
  },
  {
    number: "02",
    name: "Arcadia Homes",
    category: "Property / Real estate",
    description:
      "A clear, confident digital presence for exploring homes and taking the next step.",
    caseStudyHref: "/work/arcadia-homes",
    liveHref: "https://arcadia-homes-wvni.vercel.app/",
    githubHref: "https://github.com/NemoCode-3011/arcadia-homes",
    image: "/assets/arcadia.png",
  },
  {
    number: "03",
    name: "Knost & Co",
    category: "Construction",
    description:
      "A grounded website concept built around trust, capability, and the quality of the work.",
    caseStudyHref: "/work/knost-and-co",
    liveHref: "https://knost-and-co.vercel.app/",
    githubHref: "https://github.com/NemoCode-3011/knost-and-co",
    image: "/assets/knostandco.png",
  },
  {
    number: "04",
    name: "De Prime Barbers",
    category: "Grooming / Local business",
    description:
      "A direct and expressive web presence for a modern barbershop and its local audience.",
    caseStudyHref: "/work/de-prime-barbers",
    liveHref: "https://de-prime-barbers.vercel.app/",
    githubHref: "https://github.com/NemoCode-3011/de-prime-barbers",
    image: "/assets/dprimeimg.png",
  },
] as const;
