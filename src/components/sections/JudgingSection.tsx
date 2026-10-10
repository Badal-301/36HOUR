"use client";

import { Scale, UserCheck } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { judgingCriteria, judgingTotal } from "@/data/judging";

export function JudgingSection() {
  return (
    <section
      id="judging"
      aria-label="Judging criteria"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left — heading + explanation */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                index="05"
                eyebrow="Judging"
                title="How projects are evaluated."
              />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Judges evaluate the submitted project, the clarity of the
                solution, its implementation, the team&apos;s decisions, and
                the quality of the demonstration. Weights are transparent —
                you know exactly what the panel is looking for.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-acid/40 bg-acid/10 text-acid">
                    <Scale aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-2xl font-bold tracking-tight">
                      {judgingTotal}%
                    </p>
                    <p className="mono-label text-[0.5625rem] text-muted-foreground">
                      Total weight across five criteria
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  These criteria are proposed guidelines — organizers may amend
                  them before publishing the final rulebook.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <UserCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-electric"
                />
                <span>
                  Judge profiles will be announced once verified information is
                  available — see the community section below.
                </span>
              </p>
            </Reveal>
          </div>

          {/* Right — weighted criteria bars */}
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {judgingCriteria.map((criterion, i) => (
                <Reveal as="li" key={criterion.id} delay={i * 0.07}>
                  <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-line">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-heading text-base font-bold tracking-tight sm:text-lg">
                        {criterion.label}
                      </h3>
                      <span className="font-heading text-xl font-bold tabular-nums text-acid">
                        {criterion.weight}%
                      </span>
                    </div>
                    {/* Accessible progress bar */}
                    <div
                      role="img"
                      aria-label={`${criterion.label}: ${criterion.weight} percent weight`}
                      className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-acid/70 to-acid transition-[width] duration-700"
                        style={{ width: `${criterion.weight}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {criterion.explanation}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
