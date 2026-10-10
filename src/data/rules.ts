import type { RuleCategory } from "@/types/event";

/** Participation rules grouped into expandable categories. */
export const ruleCategories: RuleCategory[] = [
  {
    id: "eligibility",
    title: "Eligibility",
    summary: "Who can participate and in what team configuration.",
    rules: [
      "Open to students, subject to the organizers' final eligibility conditions.",
      "Individual participants and teams of up to four are allowed.",
      "Beginners are welcome — prior hackathon experience is not required.",
    ],
  },
  {
    id: "project",
    title: "Project Requirements",
    summary: "What you build during the event.",
    rules: [
      "Projects should primarily be developed during the hackathon.",
      "Existing libraries, frameworks, templates and legitimate open-source tools may be used.",
      "Clearly identify pre-existing components in your submission and README.",
      "Teams must be able to explain and demonstrate their implementation.",
      "Submit a working prototype or a meaningful proof of concept.",
    ],
  },
  {
    id: "ai-tools",
    title: "AI & Third-Party Tools",
    summary: "Responsible use of assistants, APIs and external services.",
    rules: [
      "AI coding assistants and public APIs may be used unless the organizers publish different restrictions.",
      "Participants remain responsible for the code they submit.",
      "Disclose significant AI-generated or pre-existing contributions when requested by the organizers.",
      "Never expose API keys, credentials or confidential data in public repositories.",
    ],
  },
  {
    id: "submission",
    title: "Submission Requirements",
    summary: "What your final submission must include.",
    rules: [
      "Project title and description.",
      "Selected track.",
      "GitHub repository or equivalent source link, when applicable.",
      "Working demo link, where available.",
      "README containing setup instructions, core features, technology stack and relevant limitations.",
      "Short presentation or demo following the organizers' submission format.",
    ],
  },
  {
    id: "conduct",
    title: "Conduct",
    summary: "How we treat each other during the event.",
    rules: [
      "Treat all participants, volunteers, mentors and judges respectfully.",
      "No plagiarism, harassment, impersonation or misuse of others' work.",
      "Follow applicable open-source licenses, API terms, privacy requirements and college venue rules.",
      "Respect organizer decisions and event instructions.",
    ],
  },
];
