import type { FAQItem } from "@/types/event";

/**
 * FAQ items. Answers stay honest: anything not confirmed by the
 * organizers reads "Details will be announced by the organizers."
 */
export const faqs: FAQItem[] = [
  {
    id: "faq-what",
    question: "What is DEVSPRINT 36?",
    answer:
      "DEVSPRINT 36 is a 36-hour collaborative innovation sprint. Teams of students identify meaningful problems and turn them into working prototypes — learning, building and presenting with mentor support along the way.",
  },
  {
    id: "faq-who",
    question: "Who can participate?",
    answer:
      "The event is open to students, subject to the organizers' final eligibility conditions. Beginners are welcome, and you can join solo or with a team of up to four.",
  },
  {
    id: "faq-experience",
    question: "Do I need previous hackathon experience?",
    answer:
      "No. Prior hackathon experience is not mandatory. The first hours include team formation and ideation support, and mentors are available throughout the sprint to help first-time builders.",
  },
  {
    id: "faq-individual",
    question: "Can I register individually?",
    answer:
      "Yes. Individual participants are welcome. If you register solo, you can still form or join a team during the team-formation session on Day 1.",
  },
  {
    id: "faq-team-size",
    question: "What is the maximum team size?",
    answer:
      "Teams can have up to 4 participants. Registering with 1–3 people is also fine — team size is flexible between 1 and 4.",
  },
  {
    id: "faq-ai",
    question: "Can I use AI tools or public APIs?",
    answer:
      "Yes, AI coding assistants and public APIs may be used unless the organizers publish different restrictions. You remain responsible for the code you submit, and significant AI-generated contributions should be disclosed when requested. Never expose API keys or credentials.",
  },
  {
    id: "faq-bring",
    question: "What should I bring?",
    answer:
      "Bring your laptop, chargers and any hardware you plan to use. Details about provided equipment will be announced by the organizers.",
  },
  {
    id: "faq-food",
    question: "Will food and accommodation be provided?",
    answer:
      "Meal plans and overnight arrangements are being finalized. Details will be announced by the organizers before the event.",
  },
  {
    id: "faq-evaluated",
    question: "How are projects evaluated?",
    answer:
      "Judges evaluate the submitted project, the clarity of the solution, its implementation, the team's decisions and the quality of the demonstration, using published criteria: problem relevance (25%), technical implementation (25%), impact & innovation (20%), UX (15%) and presentation (15%).",
  },
  {
    id: "faq-submit",
    question: "What do I need to submit?",
    answer:
      "A project title and description, your selected track, a source link (when applicable), a demo link where available, a README with setup instructions and core features, plus a short presentation or demo following the organizers' format.",
  },
  {
    id: "faq-attendance",
    question: "Is attendance required for the entire event?",
    answer:
      "The event runs for 36 hours, and teams manage their own rest rotations overnight. Be present for the opening, demo and closing sessions. Full attendance policy details will be shared by the organizers.",
  },
  {
    id: "faq-contact",
    question: "How can I contact the organizers?",
    answer:
      "Use the contact section on this page. Official channels will be published once confirmed — we will never ask you to reach an unverified number or personal account.",
  },
];
