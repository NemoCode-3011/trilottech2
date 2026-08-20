export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start with the problem, the people involved, and what needs to change.",
  },
  {
    number: "02",
    title: "Shape",
    description:
      "We turn the insight into a clear direction, structure, and visual language.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We design, develop, test, and prepare the work for real use.",
  },
  {
    number: "04",
    title: "Keep moving",
    description:
      "We launch carefully, then stay available for the improvements that come after.",
  },
] as const satisfies readonly ProcessStep[];