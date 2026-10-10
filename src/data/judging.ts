import type { JudgingCriterion } from "@/types/event";

/**
 * Judging criteria with weights. Weights must total 100 —
 * the UI displays the total and these are proposed guidelines
 * that organizers may amend before publishing final rules.
 */
export const judgingCriteria: JudgingCriterion[] = [
  {
    id: "problem",
    label: "Problem Relevance & Understanding",
    weight: 25,
    explanation:
      "Is the problem real, clearly defined and worth solving? Does the team understand its users?",
  },
  {
    id: "technical",
    label: "Technical Implementation",
    weight: 25,
    explanation:
      "Quality of the build — architecture decisions, working features and sensible use of technology.",
  },
  {
    id: "impact",
    label: "Impact & Innovation",
    weight: 20,
    explanation:
      "Potential value created and originality of the approach compared to obvious alternatives.",
  },
  {
    id: "ux",
    label: "User Experience & Usability",
    weight: 15,
    explanation:
      "Can the target user actually accomplish the task? Clarity of flows, interface and accessibility.",
  },
  {
    id: "demo",
    label: "Demonstration & Presentation",
    weight: 15,
    explanation:
      "How effectively the team presents the solution, explains decisions and shows what works.",
  },
];

/** Total weight — computed, never hard-coded. */
export const judgingTotal = judgingCriteria.reduce((sum, c) => sum + c.weight, 0);
