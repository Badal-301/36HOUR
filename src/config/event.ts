import type { EventFormat, SocialLinks } from "@/types/event";

/**
 * ─────────────────────────────────────────────────────────────
 *  DEVSPRINT 36 — CENTRAL EVENT CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Organizers: this is the ONLY file you need to edit to update
 *  event details. Everything marked `null` renders as an honest
 *  "Coming Soon / To Be Announced" state on the website.
 *
 *  Never present unconfirmed sponsors, addresses, phone numbers
 *  or dates as real — leave them null until officially confirmed.
 * ─────────────────────────────────────────────────────────────
 */
export const eventConfig = {
  /** Organizer attribution (keep the official club name here). */
  organizer: {
    name: "GDG on Campus",
    communityType: "Google Developer community program for universities",
  },

  /** Location — null renders "To Be Announced". */
  location: {
    venue: null as string | null,
    city: null as string | null,
    college: null as string | null,
  },

  /**
   * Event start — ISO 8601 string INCLUDING the timezone offset,
   * e.g. "2026-11-14T09:00:00+05:30" (9:00 AM IST).
   * The countdown, "Add to Calendar" and Google Calendar link all
   * derive from this value. null = date not announced yet.
   */
  startDate: null as string | null,

  /** Total build time in hours (schedule + countdown end derive from this). */
  durationHours: 36,

  /** Display labels for the event timezone. */
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST (UTC+05:30)",

  /** Registration deadline — ISO string or null = "To Be Announced". */
  registrationDeadline: null as string | null,

  /** Event format, configurable: "In-Person" | "Online" | "Hybrid". */
  format: "In-Person" as EventFormat,

  /** Team size bounds. */
  teamSize: { min: 1, max: 4 },

  /** Total prize pool (illustrative until confirmed). */
  prizePool: 30000,
  prizePoolConfirmed: false,

  /** Official contact email — null hides the email contact card. */
  contactEmail: null as string | null,

  /** Social URLs — null hides the corresponding link. Never link to "#". */
  socials: {
    instagram: null,
    linkedin: null,
    github: null,
    discord: null,
  } satisfies SocialLinks,

  /** Official documents — null hides the link. */
  links: {
    rulebookUrl: null as string | null,
    privacyUrl: null as string | null,
  },
} as const;

/** Event statistics shown under the countdown. */
export const eventStats = [
  { id: "hours", value: "36", label: "Hours of building" },
  { id: "tracks", value: "5", label: "Innovation tracks" },
  { id: "teams", value: "1–4", label: "Builders per team" },
  {
    id: "pool",
    value: "₹30,000",
    label: "Illustrative prize pool",
    footnote: "Illustrative until officially confirmed",
  },
] as const;

/** Derive the moment the sprint ends (start + duration). */
export function getEventEnd(): Date | null {
  if (!eventConfig.startDate) return null;
  const start = new Date(eventConfig.startDate);
  if (Number.isNaN(start.getTime())) return null;
  return new Date(start.getTime() + eventConfig.durationHours * 3_600_000);
}

export function getEventStart(): Date | null {
  if (!eventConfig.startDate) return null;
  const start = new Date(eventConfig.startDate);
  return Number.isNaN(start.getTime()) ? null : start;
}

/** Registration deadline as Date (falls back to event start). */
export function getRegistrationDeadline(): Date | null {
  if (eventConfig.registrationDeadline) {
    const d = new Date(eventConfig.registrationDeadline);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return getEventStart();
}
