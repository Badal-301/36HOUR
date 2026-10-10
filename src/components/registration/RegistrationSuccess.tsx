"use client";

import {
  ArrowRight,
  CircleCheckBig,
  ExternalLink,
  MailCheck,
  MailWarning,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EmailStatus } from "@/lib/registrationService";
import type { RegistrationFormValues } from "@/lib/validation";
import { tracks } from "@/data/tracks";

/**
 * Success screen shown after a registration is accepted.
 * Reports the confirmation-email status honestly:
 *  - "sent"   → delivered via SMTP
 *  - "outbox" → composed, awaiting SMTP configuration
 *  - "failed" → registration saved, but delivery errored
 *  - "demo"   → backend unreachable, saved in this browser only
 */
export function RegistrationSuccess({
  reference,
  emailStatus,
  emailPreviewUrl,
  values,
  onDone,
}: {
  reference: string;
  emailStatus: EmailStatus;
  emailPreviewUrl?: string;
  values: RegistrationFormValues;
  onDone: () => void;
}) {
  const track = tracks.find((t) => t.id === values.trackId);
  const isTeam = values.mode === "Team";

  const summary: { label: string; value: string }[] = [
    { label: "Name", value: values.fullName },
    { label: "Email", value: values.email },
    { label: "Contact", value: values.phone },
    { label: "College", value: values.college },
    { label: "Academic year", value: values.academicYear },
    {
      label: "Participation",
      value: isTeam
        ? `Team “${values.teamName}” · ${values.teamSize} members`
        : "Individual",
    },
    { label: "Track", value: track?.name ?? "—" },
  ];

  return (
    <div className="scroll-slim max-h-[92vh] overflow-y-auto px-6 py-10 text-center sm:px-10">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-acid/40 bg-acid/10">
        <CircleCheckBig aria-hidden="true" className="h-8 w-8 text-acid" />
      </span>

      <DialogTitle className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
        Registration confirmed!
      </DialogTitle>
      <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Thanks, {values.fullName.split(" ")[0]} — your registration for
        DEVSPRINT 36 has been recorded successfully.
      </DialogDescription>

      {/* Reference code */}
      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-acid/30 bg-acid/[0.05] p-5">
        <p className="mono-label text-[0.5625rem] text-muted-foreground">
          Registration reference
        </p>
        <p className="mt-2 font-mono text-2xl font-bold tracking-[0.2em] text-acid">
          {reference}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Save this reference — you will need it at the check-in desk on event
          day, and it is included in your confirmation email.
        </p>
      </div>

      {/* Email status banner */}
      {emailStatus === "sent" && (
        <p className="mx-auto mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-acid/30 bg-acid/[0.06] p-4 text-left text-xs leading-relaxed text-foreground/90">
          <MailCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
          A confirmation email with your complete registration details has
          been sent to <span className="font-semibold">{values.email}</span>.
          Please check your inbox (and spam folder, just in case).
        </p>
      )}
      {emailStatus === "outbox" && (
        <p className="mx-auto mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/[0.06] p-4 text-left text-xs leading-relaxed text-muted-foreground">
          <MailWarning
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]"
          />
          A confirmation email with your complete registration details has
          been composed for <span className="font-semibold">{values.email}</span>.
          Delivery activates as soon as the organizers connect an SMTP account
          — meanwhile, you can preview the exact email below.
        </p>
      )}
      {emailStatus === "failed" && (
        <p className="mx-auto mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/[0.06] p-4 text-left text-xs leading-relaxed text-muted-foreground">
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
          />
          Your registration was recorded, but the confirmation email could not
          be delivered to <span className="font-semibold">{values.email}</span>{" "}
          right now. The organizers have been notified through the outbox — you
          can still view the email contents below.
        </p>
      )}
      {emailStatus === "demo" && (
        <p className="mx-auto mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/[0.06] p-4 text-left text-xs leading-relaxed text-muted-foreground">
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]"
          />
          The registration backend is currently unreachable, so your entry was
          saved only in this browser and no confirmation email was sent. Please
          contact the organizers to confirm your registration.
        </p>
      )}

      {/* Preview link */}
      {emailPreviewUrl && (
        <a
          href={emailPreviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-acid/50 hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          View the confirmation email
        </a>
      )}

      {/* Submitted information */}
      <dl className="mx-auto mt-6 max-w-sm space-y-2.5 rounded-2xl border border-border bg-surface p-5 text-left">
        {summary.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
          >
            <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {row.label}
            </dt>
            <dd className="min-w-0 break-words text-right text-sm font-medium text-foreground/95">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Teammates */}
      {isTeam && values.teammates.length > 0 && (
        <div className="mx-auto mt-4 max-w-sm rounded-2xl border border-border bg-surface p-5 text-left">
          <p className="mono-label text-[0.5625rem] text-muted-foreground">
            Teammates
          </p>
          <ul className="mt-2 space-y-1.5">
            {values.teammates.map((member, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="min-w-0">
                  <span className="font-medium text-foreground/95">
                    {member.name}
                  </span>
                  {member.college && (
                    <span className="text-muted-foreground">
                      {" "}
                      · {member.college}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {member.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={onDone} size="lg" className="mt-8 font-semibold">
        Return Home
        <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
      </Button>
    </div>
  );
}
