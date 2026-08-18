export type TrustPoint = {
  number: string;
  title: string;
  description: string;
  shortDescription: string;
};

export const trustPoints = [
  {
    number: "01",
    title: "Strategy-led",
    description:
      "We clarify the problem, audience, and opportunity before we decide what to build.",
    shortDescription: "We clarify the problem before we build.",
  },
  {
    number: "02",
    title: "Responsive by default",
    description:
      "Every experience is designed for real screens, real users, and the conditions people actually use them in.",
    shortDescription: "Designed for real screens and real conditions.",
  },
  {
    number: "03",
    title: "Practical digital tools",
    description:
      "We build around how the business works, so the final product is useful beyond the launch moment.",
    shortDescription: "Useful systems for the work behind the business.",
  },
  {
    number: "04",
    title: "Support after launch",
    description:
      "Launch is a starting point. We stay available for improvements, maintenance, and what comes next.",
    shortDescription: "Help continues after the site goes live.",
  },
] as const satisfies readonly TrustPoint[];