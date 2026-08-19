export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  note: string;
};

export const processSteps = [
  {
    number: "01",
    title: "Clarify",
    description:
      "Before anything gets designed, we get specific about the real question you're trying to answer and who it actually needs to work for.",
    note: "start with the real question",
  },
  {
    number: "02",
    title: "Shape",
    description:
      "The insight becomes a structure — pages, priorities, the words that hold it together — so everyone's building toward the same thing.",
    note: "direction gets clearer here",
  },
  {
    number: "03",
    title: "Build",
    description:
      "This is where the site actually gets built — design and development happening together, not handed off in pieces. Every detail earns its place or it doesn't ship.",
    note: "test before polishing",
  },
  {
    number: "04",
    title: "Follow through",
    description:
      "Launch day isn't the finish line. We stay close after, fixing what only shows up once real people are using it.",
    note: "launch is not the end",
  },
] as const satisfies readonly ProcessStep[];