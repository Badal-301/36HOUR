import { eventConfig, getEventEnd, getEventStart } from "@/config/event";
import { tracks } from "@/data/tracks";
import type { RegistrationRecord, TeamMemberInput } from "@/types/event";

/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIRMATION EMAIL COMPOSER
 * ─────────────────────────────────────────────────────────────
 *  Builds the "complete registration info" email sent to every
 *  student after a successful registration. Output is a fully
 *  self-contained HTML email (inline styles, table layout for
 *  email-client compatibility) plus a plain-text alternative.
 *
 *  Security: every user-provided value is HTML-escaped, because
 *  the exact same HTML is served in the browser at
 *  /api/register/email-preview/[token].
 * ─────────────────────────────────────────────────────────────
 */

export interface ComposedEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/** Escapes a string for safe interpolation into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Formats a Date in the event timezone (IST) for email copy. */
function formatIst(date: Date, withTime: boolean): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: eventConfig.timezone,
      day: "numeric",
      month: "short",
      year: "numeric",
      ...(withTime
        ? { hour: "numeric", minute: "2-digit", hour12: true }
        : {}),
    }).format(date);
  } catch {
    return date.toISOString().replace("T", " ").slice(0, 16) + " UTC";
  }
}

/* ── Palette (email-safe inline hex values) ────────────────── */
const C = {
  ink: "#0B0D12",
  surface: "#131722",
  acid: "#C6FF4D",
  body: "#F4F5F7",
  card: "#FFFFFF",
  text: "#1B2432",
  muted: "#5B6472",
  line: "#E6E9EF",
  aqua: "#48D8E8",
};

/** A single label/value row inside a details table. */
function row(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 14px;border-bottom:1px solid ${C.line};font:600 12px/1.5 Arial,Helvetica,sans-serif;color:${C.muted};text-transform:uppercase;letter-spacing:.04em;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:10px 14px;border-bottom:1px solid ${C.line};font:400 14px/1.55 Arial,Helvetica,sans-serif;color:${C.text};vertical-align:top;word-break:break-word;">${escapeHtml(value)}</td>
</tr>`;
}

function sectionHeading(title: string): string {
  return `<tr><td colspan="2" style="padding:26px 14px 10px;font:700 12px/1 Arial,Helvetica,sans-serif;color:${C.ink};text-transform:uppercase;letter-spacing:.12em;">${escapeHtml(title)}</td></tr>`;
}

function eventDetailLine(label: string, value: string): string {
  return `<tr>
<td style="padding:6px 14px;font:600 12px/1.5 Arial,Helvetica,sans-serif;color:${C.muted};text-transform:uppercase;letter-spacing:.04em;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:6px 14px;font:400 14px/1.55 Arial,Helvetica,sans-serif;color:${C.text};vertical-align:top;">${escapeHtml(value)}</td>
</tr>`;
}

function buildHtml(record: RegistrationRecord): string {
  const track = tracks.find((t) => t.id === record.trackId);
  const teammates = Array.isArray(record.teammates)
    ? (record.teammates as TeamMemberInput[])
    : [];
  const isTeam = record.mode === "Team";
  const firstName = record.fullName.trim().split(/\s+/)[0] ?? "there";

  const start = getEventStart();
  const end = getEventEnd();
  const dateLine = start
    ? `${formatIst(start, true)} – ${end ? formatIst(end, true) : ""}`.trim()
    : "To be announced";
  const venueParts = [
    eventConfig.location.venue,
    eventConfig.location.college,
    eventConfig.location.city,
  ].filter(Boolean) as string[];
  const venueLine = venueParts.length > 0 ? venueParts.join(", ") : "To be announced";
  const submitted = new Date(record.submittedAt);
  const submittedLine = `${formatIst(submitted, true)} ${eventConfig.timezoneLabel}`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DEVSPRINT 36 — Registration confirmed</title></head>
<body style="margin:0;padding:0;background:${C.body};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.body};padding:24px 12px;">
<tr><td align="center">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${C.card};border-radius:14px;overflow:hidden;border:1px solid ${C.line};">
  <!-- Header -->
  <tr><td style="background:${C.ink};padding:28px 32px;">
    <p style="margin:0;font:700 22px/1.1 Arial,Helvetica,sans-serif;color:${C.acid};letter-spacing:.02em;">DEVSPRINT&nbsp;36</p>
    <p style="margin:6px 0 0;font:400 12px/1.4 Arial,Helvetica,sans-serif;color:#9AA3B2;letter-spacing:.08em;text-transform:uppercase;">${escapeHtml(String(eventConfig.durationHours))}-hour campus hackathon · ${escapeHtml(eventConfig.format)}</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:8px;">
        <span style="display:inline-block;width:44px;height:44px;line-height:44px;text-align:center;border-radius:50%;background:${C.acid};color:${C.ink};font:700 22px/44px Arial,Helvetica,sans-serif;">&#10003;</span>
      </td></tr>
      <tr><td style="font:700 24px/1.25 Arial,Helvetica,sans-serif;color:${C.ink};padding-bottom:8px;">Your registration is confirmed!</td></tr>
      <tr><td style="font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${C.muted};padding-bottom:20px;">
        Hi ${escapeHtml(firstName)}, thanks for registering for DEVSPRINT 36.
        Your spot is locked in. Below is the complete information you submitted —
        keep this email for your records.
      </td></tr>
    </table>

    <!-- Reference box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink};border-radius:12px;margin:0 0 6px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <p style="margin:0;font:600 11px/1 Arial,Helvetica,sans-serif;color:#9AA3B2;text-transform:uppercase;letter-spacing:.14em;">Registration reference</p>
        <p style="margin:8px 0 0;font:700 26px/1 Arial,Helvetica,sans-serif;color:${C.acid};letter-spacing:.14em;">${escapeHtml(record.reference)}</p>
        <p style="margin:8px 0 0;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#9AA3B2;">Save this reference — you will need it at the check-in desk on event day.</p>
      </td></tr>
    </table>

    <!-- Details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:12px;overflow:hidden;">
      ${sectionHeading("Your registration details")}
      ${row("Reference", record.reference)}
      ${row("Full name", record.fullName)}
      ${row("Email", record.email)}
      ${row("Contact number", record.phone)}
      ${row("College / institution", record.college)}
      ${row("Academic year", record.academicYear)}
      ${record.portfolioUrl ? row("GitHub / portfolio", record.portfolioUrl) : ""}
      ${row(
        "Participation",
        isTeam ? `Team — ${record.teamName} (${record.teamSize} members)` : "Individual",
      )}
      ${isTeam ? row("Team name", record.teamName) : ""}
      ${row("Preferred track", track ? track.name : record.trackId)}
      ${record.idea ? row("Idea / interests", record.idea) : ""}
    </table>

    ${
      isTeam && teammates.length > 0
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:12px;overflow:hidden;margin-top:16px;">
      ${sectionHeading("Your team")}
      ${teammates
        .map((member, i) =>
          row(
            `Member ${i + 2}`,
            `${member.name} — ${member.email}${member.college ? ` · ${member.college}` : ""}`,
          ),
        )
        .join("")}
    </table>`
        : ""
    }

    <!-- Event details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:12px;overflow:hidden;margin-top:16px;">
      ${sectionHeading("Event details")}
      ${eventDetailLine("Dates", dateLine)}
      ${eventDetailLine("Duration", `${eventConfig.durationHours} hours of building`)}
      ${eventDetailLine("Format", eventConfig.format)}
      ${eventDetailLine("Venue", venueLine)}
      ${eventDetailLine("Timezone", eventConfig.timezoneLabel)}
    </table>

    <!-- Consent + support -->
    <p style="margin:24px 0 0;font:400 12px/1.7 Arial,Helvetica,sans-serif;color:${C.muted};">
      You accepted the event rules and the privacy notice on ${escapeHtml(submittedLine)}.
      If any detail above looks incorrect, or you did not register for DEVSPRINT 36,
      please contact the organizers${
        eventConfig.contactEmail
          ? ` at <a href="mailto:${escapeHtml(eventConfig.contactEmail)}" style="color:${C.ink};">${escapeHtml(eventConfig.contactEmail)}</a>`
          : ""
      }.
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:${C.surface};padding:18px 32px;border-top:1px solid ${C.line};">
    <p style="margin:0;font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#9AA3B2;">
      This is an automated registration confirmation for DEVSPRINT 36,
      organized by ${escapeHtml(eventConfig.organizer.name)}.
      Reference ${escapeHtml(record.reference)} · Submitted ${escapeHtml(submittedLine)}.
    </p>
  </td></tr>
</table>

</td></tr>
</table>
</body>
</html>`;
}

function buildText(record: RegistrationRecord): string {
  const track = tracks.find((t) => t.id === record.trackId);
  const teammates = Array.isArray(record.teammates)
    ? (record.teammates as TeamMemberInput[])
    : [];
  const isTeam = record.mode === "Team";
  const start = getEventStart();
  const end = getEventEnd();
  const dateLine = start
    ? `${formatIst(start, true)} – ${end ? formatIst(end, true) : ""}`.trim()
    : "To be announced";
  const venueParts = [
    eventConfig.location.venue,
    eventConfig.location.college,
    eventConfig.location.city,
  ].filter(Boolean) as string[];
  const venueLine = venueParts.length > 0 ? venueParts.join(", ") : "To be announced";
  const submittedLine = `${formatIst(new Date(record.submittedAt), true)} ${eventConfig.timezoneLabel}`;

  const lines = [
    "DEVSPRINT 36 — REGISTRATION CONFIRMED",
    "",
    `Registration reference: ${record.reference}`,
    "(Save this reference — you will need it at the check-in desk.)",
    "",
    "YOUR REGISTRATION DETAILS",
    `- Full name: ${record.fullName}`,
    `- Email: ${record.email}`,
    `- Contact number: ${record.phone}`,
    `- College / institution: ${record.college}`,
    `- Academic year: ${record.academicYear}`,
    ...(record.portfolioUrl ? [`- GitHub / portfolio: ${record.portfolioUrl}`] : []),
    `- Participation: ${isTeam ? `Team — ${record.teamName} (${record.teamSize} members)` : "Individual"}`,
    `- Preferred track: ${track ? track.name : record.trackId}`,
    ...(record.idea ? [`- Idea / interests: ${record.idea}`] : []),
  ];

  if (isTeam && teammates.length > 0) {
    lines.push("", "YOUR TEAM");
    teammates.forEach((m, i) => {
      lines.push(
        `- Member ${i + 2}: ${m.name} — ${m.email}${m.college ? ` · ${m.college}` : ""}`,
      );
    });
  }

  lines.push(
    "",
    "EVENT DETAILS",
    `- Dates: ${dateLine}`,
    `- Duration: ${eventConfig.durationHours} hours`,
    `- Format: ${eventConfig.format}`,
    `- Venue: ${venueLine}`,
    `- Timezone: ${eventConfig.timezoneLabel}`,
    "",
    `You accepted the event rules and privacy notice on ${submittedLine}.`,
    `If any detail looks wrong, contact the organizers${eventConfig.contactEmail ? ` at ${eventConfig.contactEmail}` : ""}.`,
    "",
    `— Automated confirmation for DEVSPRINT 36, organized by ${eventConfig.organizer.name}. Reference ${record.reference}.`,
  );

  return lines.join("\n");
}

export function composeRegistrationEmail(
  record: RegistrationRecord,
): ComposedEmail {
  return {
    to: record.email,
    subject: `DEVSPRINT 36 — Registration confirmed (${record.reference})`,
    html: buildHtml(record),
    text: buildText(record),
  };
}
