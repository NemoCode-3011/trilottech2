

export type HeroPath = {
  id: "business" | "product" | "presence";
  number: "01" | "02" | "03";
  label: string;
  description: string;
  headline: string;
  highlightedHeadline: string;
  body: string;
  cta: string;
};

export const heroPaths = [
  {
    id: "business",
    number: "01",
    label: "My business",
    description: "A website that no longer reflects your quality.",
    headline: "Make your website match",
    highlightedHeadline: "the quality of your business.",
    body: "An outdated site quietly costs you trust — and enquiries. We build ones that earn both back.",
    cta: "Improve my website",
  },
  {
    id: "product",
    number: "02",
    label: "My product idea",
    description: "A promising idea that needs a clear direction.",
    headline: "Turn your product idea into",
    highlightedHeadline: "something people can use.",
    body: "From idea to a first version people can actually use — shaped, designed, and built with you.",
    cta: "Discuss my idea",
  },
  {
    id: "presence",
    number: "03",
    label: "My digital presence",
    description: "A strong business that is hard to understand online.",
    headline: "Make your business easier to understand",
    highlightedHeadline: "and easier to choose.",
    body: "Real expertise, buried under a website that doesn't say so. We make the value obvious.",
    cta: "Build a clearer presence",
  },
] as const satisfies readonly HeroPath[];