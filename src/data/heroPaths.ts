// src/data/heroPaths.ts

export type HeroPath = {
  id: "business" | "product" | "presence";
  number: "01" | "02" | "03";
  label: string;
  description: string;
  headline: string;
  highlightedHeadline: string;
  body: string;
  cta: string;
  image: string;
  imagePosition: string;
  overlay: string;
  contentTheme: "onDark" | "onLight";
};

export const heroPaths = [
  {
    id: "business",
    number: "01",
    label: "My business",
    description: "A website that no longer reflects your quality.",
    headline: "Make your website match",
    highlightedHeadline: "the quality of your business.",
    body: "For growing businesses with an outdated  online presence. We create digital experiences that earn trust and create better enquiries.",
    cta: "Improve my website",
    image: "/assets/business300.jpg",
    imagePosition: "center center",
    overlay:
      "linear-gradient(90deg, rgba(16, 42, 67, 0.98) 0%, rgba(16, 42, 67, 0.9) 38%, rgba(16, 42, 67, 0.5) 72%, rgba(16, 42, 67, 0.2) 100%)",
    contentTheme: "onDark",
  },
  {
    id: "product",
    number: "02",
    label: "My product idea",
    description: "A promising idea that needs a clear direction.",
    headline: "Turn your product idea into",
    highlightedHeadline: "something people can use.",
    body: "For founders who need help shaping, designing, and building a useful first version of their digital product.",
    cta: "Discuss my idea",
    image: "/assets/product1.jpg",
    imagePosition: "center center",
    overlay:
      "linear-gradient(90deg, rgba(16, 42, 67, 0.98) 0%, rgba(16, 42, 67, 0.88) 38%, rgba(23, 105, 209, 0.55) 72%, rgba(16, 42, 67, 0.22) 100%)",
    contentTheme: "onDark",
  },
  {
    id: "presence",
    number: "03",
    label: "My digital presence",
    description: "A strong business that is hard to understand online.",
    headline: "Make your business easier to understand",
    highlightedHeadline: "and easier to choose.",
    body: "For businesses with valuable expertise but a website that is not communicating their value clearly enough.",
    cta: "Build a clearer presence",
    image: "/assets/db700.webp",
    imagePosition: "center center",
    overlay:
      "linear-gradient(10deg, rgba(246, 242, 234, 0.65) 0%, rgba(246, 242, 234, 0.55) 45%, rgba(246, 242, 234, 0.4) 100%)",
    contentTheme: "onLight",
  },
] as const satisfies readonly HeroPath[];