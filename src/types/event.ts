/**
 * DEVSPRINT 36 — shared domain types.
 * All event content is strongly typed so organizers can edit
 * config/data files with compiler support.
 */

export type EventFormat = "In-Person" | "Online" | "Hybrid";

export interface SocialLinks {
  instagram: string | null;
  linkedin: string | null;
  github: string | null;
  discord: string | null;
}

/** A single track (theme) of the hackathon. */
export interface Track {
  id: string;
  number: number;
  name: string;
  /** Hex color used for the card accent. */
  color: string;
  /** lucide-react icon name, resolved in the component. */
  icon: "BrainCircuit" | "GraduationCap" | "Leaf" | "Terminal" | "Lightbulb";
  tagline: string;
  description: string;
  challenge: string;
  ideas: string[];
}

export type ScheduleItemType =
  | "checkin"
  | "milestone"
  | "build"
  | "break"
  | "judging"
  | "ceremony";

export interface ScheduleItem {
  id: string;
  day: 1 | 2;
  /** 24h display range, e.g. "9:00 AM – 10:00 AM" */
  time: string;
  title: string;
  description: string;
  /** Relative hour marker inside the 36 hours, e.g. "Hour 0–1" or "Pre-event". */
  hourMarker: string;
  type: ScheduleItemType;
}

export interface Prize {
  id: string;
  name: string;
  /** INR amount. */
  amount: number;
  description: string;
  emphasis: "grand" | "standard";
}

export interface JudgingCriterion {
  id: string;
  label: string;
  weight: number; // percentage
  explanation: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  summary: string;
  rules: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** Verified person profile — never fabricated. Empty array = "coming soon" state. */
export interface PersonProfile {
  id: string;
  name: string;
  role: string;
  /** Optional — only set when the person approved a specific URL. */
  url?: string;
  initials: string;
}

export interface SponsorSlot {
  id: string;
  name: string;
  url?: string;
  tier: "Title" | "Gold" | "Silver" | "Community";
}

/* ── Registration ─────────────────────────────────────────── */

export type ParticipationMode = "Individual" | "Team";
export type AcademicYear =
  | "First Year"
  | "Second Year"
  | "Third Year"
  | "Fourth Year"
  | "Postgraduate / Research";

export interface TeamMemberInput {
  name: string;
  email: string;
  college: string;
}

export interface RegistrationData {
  /* Step 1 — personal */
  fullName: string;
  email: string;
  phone: string;
  college: string;
  academicYear: AcademicYear;
  portfolioUrl: string;
  /* Step 2 — participation */
  mode: ParticipationMode;
  teamName: string;
  teamSize: number;
  trackId: string;
  idea: string;
  /* Step 3 — teammates (empty for individual) */
  teammates: TeamMemberInput[];
  /* Step 4 */
  agreedToRules: boolean;
}

export interface RegistrationRecord extends RegistrationData {
  reference: string;
  submittedAt: string;
}

export type RegistrationStep = 0 | 1 | 2 | 3;
