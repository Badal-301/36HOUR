"use client";

import { ArrowRight, CircleCheckBig, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RegistrationFormValues } from "@/lib/validation";
import { tracks } from "@/data/tracks";

/**
 * Success screen shown after a demo registration is accepted.
 * Honest about demo limitations — no fake email claims.
 */
export function RegistrationSuccess({
  reference,
  values,
  onDone,
}: {
  reference: string;
  values: RegistrationFormValues;
  onDone: () => void;
}) {
  const track = tracks.find((t) => t.id === values.trackId);

  const summary: { label: string; value: string }[] = [
    { label: "Name", value: values.fullName },
    { label: "Email", value: values.email },
    {
      label: "Participation",
      value:
        values.mode === "Team"
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
        Registration received!
      </DialogTitle>
      <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Thanks, {values.fullName.split(" ")[0]} — your demo registration was
        recorded successfully.
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
          Save this reference for the demonstration — it is generated locally
          for this demo.
        </p>
      </div>

      {/* Submitted information */}
      <dl className="mx-auto mt-6 max-w-sm space-y-2.5 rounded-2xl border border-border bg-surface p-5 text-left">
        {summary.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {row.label}
            </dt>
            <dd className="min-w-0 break-words text-right text-sm font-medium text-foreground/95">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Honest demo note */}
      <p className="mx-auto mt-6 flex max-w-md items-start gap-2.5 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/[0.06] p-4 text-left text-xs leading-relaxed text-muted-foreground">
        <TriangleAlert
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]"
        />
        This is a demonstration registration system: your entry is stored only
        in this browser and no confirmation email was sent. When the organizers
        connect a real backend, registrations will be submitted and confirmed
        automatically.
      </p>

      <Button onClick={onDone} size="lg" className="mt-8 font-semibold">
        Return Home
        <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
      </Button>
    </div>
  );
}
