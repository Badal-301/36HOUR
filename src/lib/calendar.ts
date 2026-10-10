import { eventConfig, getEventEnd, getEventStart } from "@/config/event";
import { siteConfig } from "@/config/site";

/**
 * Calendar helpers — "Add to Calendar" (ICS download) and a
 * Google Calendar template link. Both are only enabled when a
 * valid event start date is configured in config/event.ts.
 */

export function hasValidEventDate(): boolean {
  return getEventStart() !== null;
}

/** Formats a Date as UTC "basic" format required by calendar URLs: YYYYMMDDTHHMMSSZ */
function toUtcBasic(date: Date): string {
  return (
    date.getUTCFullYear().toString().padStart(4, "0") +
    (date.getUTCMonth() + 1).toString().padStart(2, "0") +
    date.getUTCDate().toString().padStart(2, "0") +
    "T" +
    date.getUTCHours().toString().padStart(2, "0") +
    date.getUTCMinutes().toString().padStart(2, "0") +
    date.getUTCSeconds().toString().padStart(2, "0") +
    "Z"
  );
}

function eventLocation(): string {
  const { venue, city, college } = eventConfig.location;
  const parts = [venue, college, city].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Venue to be announced";
}

function eventDescription(): string {
  return [
    siteConfig.tagline,
    `Format: ${eventConfig.format} · Team size: ${eventConfig.teamSize.min}–${eventConfig.teamSize.max}`,
    `The sprint runs for ${eventConfig.durationHours} hours (${eventConfig.timezoneLabel}).`,
    `Final submissions close at 5:00 PM on Day 2.`,
  ].join("\n");
}

/** Builds a downloadable ICS file for the full 36-hour event. */
export function downloadIcsFile(): boolean {
  const start = getEventStart();
  const end = getEventEnd();
  if (!start || !end) return false;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DEVSPRINT 36//Hackathon Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@devsprint36`,
    `DTSTAMP:${toUtcBasic(new Date())}`,
    `DTSTART:${toUtcBasic(start)}`,
    `DTEND:${toUtcBasic(end)}`,
    `SUMMARY:${siteConfig.name} — ${siteConfig.theme}`,
    `DESCRIPTION:${eventDescription().replace(/\n/g, "\\n")}`,
    `LOCATION:${eventLocation()}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT60M",
    "ACTION:DISPLAY",
    "DESCRIPTION:DEVSPRINT 36 starts in one hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  try {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "devsprint-36.ics";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}

/** Google Calendar "add event" template URL (opens in a new tab). */
export function getGoogleCalendarUrl(): string | null {
  const start = getEventStart();
  const end = getEventEnd();
  if (!start || !end) return null;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${siteConfig.name} — ${siteConfig.theme}`,
    dates: `${toUtcBasic(start)}/${toUtcBasic(end)}`,
    details: eventDescription(),
    location: eventLocation(),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
