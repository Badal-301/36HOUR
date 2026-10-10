import type { Prize } from "@/types/event";

/**
 * Prize breakdown. Labeled ILLUSTRATIVE until officially confirmed —
 * see eventConfig.prizePoolConfirmed.
 */
export const prizes: Prize[] = [
  {
    id: "grand-champion",
    name: "Grand Champion",
    amount: 15000,
    description:
      "The best overall project of DEVSPRINT 36 — strong problem fit, execution and demo.",
    emphasis: "grand",
  },
  {
    id: "runner-up",
    name: "Runner-Up",
    amount: 8000,
    description: "Outstanding execution, one step from the top of the podium.",
    emphasis: "standard",
  },
  {
    id: "social-impact",
    name: "Social Impact Award",
    amount: 4000,
    description: "The project with the most meaningful real-world impact.",
    emphasis: "standard",
  },
  {
    id: "best-first-hack",
    name: "Best First Hack",
    amount: 3000,
    description: "The most impressive build from a first-time hackathon team.",
    emphasis: "standard",
  },
];

/** Non-monetary benefits — subject to organizer confirmation. */
export const prizeBenefits = [
  {
    id: "certificates",
    title: "Participation certificates",
    note: "Subject to organizer confirmation",
  },
  {
    id: "mentorship",
    title: "Mentorship & feedback",
    note: "From mentors and judges during the sprint",
  },
  {
    id: "recognition",
    title: "Community recognition",
    note: "Showcased to the campus developer community",
  },
  {
    id: "continuation",
    title: "Continue your project",
    note: "Support to develop promising projects after the event",
  },
];

/**
 * Future special prizes / sponsor awards. Add entries here once
 * confirmed — the section stays hidden while the array is empty.
 */
export const specialPrizes: Prize[] = [];
