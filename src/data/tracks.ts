import type { Track } from "@/types/event";

/**
 * The five innovation tracks.
 * NOTE: challenge statements are EXAMPLES unless the organizers
 * publish official problem statements.
 */
export const tracks: Track[] = [
  {
    id: "ai-for-good",
    number: 1,
    name: "AI for Good",
    color: "#8b82ff",
    icon: "BrainCircuit",
    tagline: "Build responsible, useful AI solutions for everyday problems.",
    description:
      "Build responsible, useful AI solutions for everyday problems — from personalized learning to accessibility support and safer information discovery.",
    challenge:
      "Create an AI-assisted solution that improves education, accessibility, public services, or information discovery. Explain its data sources, limitations, evaluation method, and privacy considerations.",
    ideas: [
      "Personalized learning assistant",
      "Accessibility support tools",
      "Document understanding",
      "Responsible misinformation detection",
    ],
  },
  {
    id: "campus-innovation",
    number: 2,
    name: "Campus Innovation",
    color: "#48d8e8",
    icon: "GraduationCap",
    tagline: "Make student life smarter, easier, and more connected.",
    description:
      "Make student life smarter, easier, and more connected — identify a recurring campus problem and design a practical digital solution that improves the student experience.",
    challenge:
      "Identify a recurring problem on campus and design a practical digital solution that improves the student experience.",
    ideas: [
      "Campus navigation and discovery",
      "Student collaboration platform",
      "Lost-and-found management",
      "Campus resource or event discovery",
    ],
  },
  {
    id: "climate-sustainability",
    number: 3,
    name: "Climate & Sustainability",
    color: "#34d399",
    icon: "Leaf",
    tagline: "Use technology to make sustainable choices easier.",
    description:
      "Use technology to make sustainable choices easier — help individuals or institutions reduce waste, monitor resource usage, and make better daily decisions.",
    challenge:
      "Develop a prototype that helps individuals or institutions reduce waste, monitor resource usage, or make more sustainable decisions.",
    ideas: [
      "Food-waste reduction",
      "Energy-use monitoring",
      "Water conservation",
      "Waste segregation assistance",
    ],
  },
  {
    id: "developer-tools",
    number: 4,
    name: "Developer Tools & Open Source",
    color: "#fbbf24",
    icon: "Terminal",
    tagline: "Build tools that make developers more productive.",
    description:
      "Build tools that make developers more productive — remove friction from real development workflows with useful tools, APIs and open-source improvements.",
    challenge:
      "Create a useful tool, application, API, or open-source improvement that removes friction from an existing development workflow.",
    ideas: [
      "Debugging assistance",
      "API testing and visualization",
      "Developer productivity tools",
      "Documentation and code-quality utilities",
    ],
  },
  {
    id: "open-innovation",
    number: 5,
    name: "Open Innovation",
    color: "#c6ff4d",
    icon: "Lightbulb",
    tagline: "Find a problem worth solving and build your own solution.",
    description:
      "Find a problem worth solving and build your own solution — the wildcard track for teams with a strong idea that does not fit anywhere else.",
    challenge:
      "Choose a clearly defined user problem, research the need, and build a working prototype with a compelling explanation of its value.",
    ideas: [
      "A real problem from your community",
      "An underserved user group",
      "A fresh take on a daily annoyance",
      "Anything that ships value in 36 hours",
    ],
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}
