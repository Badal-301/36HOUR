"use client";

import { Gavel, Handshake, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { judges, mentors, sponsors } from "@/data/people";
import type { PersonProfile, SponsorSlot } from "@/types/event";

function PersonCard({ person }: { person: PersonProfile }) {
  return (
    <article className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-acid/40">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="font-heading flex h-12 w-12 items-center justify-center rounded-full border border-acid/30 bg-acid/10 text-sm font-bold text-acid"
        >
          {person.initials}
        </span>
        <div className="min-w-0">
          <h4 className="truncate font-heading text-base font-bold tracking-tight">
            {person.name}
          </h4>
          <p className="truncate text-xs text-muted-foreground">{person.role}</p>
        </div>
      </div>
      {person.url && (
        <a
          href={person.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-xs font-medium text-acid hover:underline"
        >
          View profile →
        </a>
      )}
    </article>
  );
}

function EmptyState({
  Icon,
  title,
  body,
}: {
  Icon: typeof UserCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface/40 px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <p className="font-heading text-base font-bold tracking-tight text-foreground/90">
        {title}
      </p>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

const SPONSOR_TIER_STYLES: Record<SponsorSlot["tier"], string> = {
  Title: "border-acid/40 text-acid",
  Gold: "border-[#fbbf24]/40 text-[#fbbf24]",
  Silver: "border-border text-muted-foreground",
  Community: "border-aqua/40 text-aqua",
};

export function MentorsSection() {
  const mentorsReady = mentors.length > 0;
  const judgesReady = judges.length > 0;
  const sponsorsReady = sponsors.length > 0;

  return (
    <section
      id="community"
      aria-label="Mentors, judges and partners"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="07"
            eyebrow="Community"
            title="The people behind the sprint."
            description="Mentors, judges and partners make DEVSPRINT 36 possible. This section only shows verified, confirmed profiles — never placeholders presented as real."
          />
        </Reveal>

        {/* Mentors */}
        <Reveal delay={0.06}>
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <UserCheck aria-hidden="true" className="h-5 w-5 text-acid" />
              <h3 className="font-heading text-lg font-bold tracking-tight">
                Mentors
              </h3>
              <span className="mono-label text-[0.5625rem] text-muted-foreground">
                {mentorsReady ? `${mentors.length} confirmed` : "to be confirmed"}
              </span>
            </div>
            <div className="mt-5">
              {mentorsReady ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mentors.map((person) => (
                    <li key={person.id}>
                      <PersonCard person={person} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  Icon={UserCheck}
                  title="Mentors will be announced soon"
                  body="We are confirming the mentor lineup — verified profiles will appear here once announced."
                />
              )}
            </div>
          </div>
        </Reveal>

        {/* Judges */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <Gavel aria-hidden="true" className="h-5 w-5 text-electric" />
              <h3 className="font-heading text-lg font-bold tracking-tight">
                Judges
              </h3>
              <span className="mono-label text-[0.5625rem] text-muted-foreground">
                {judgesReady ? `${judges.length} confirmed` : "to be confirmed"}
              </span>
            </div>
            <div className="mt-5">
              {judgesReady ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {judges.map((person) => (
                    <li key={person.id}>
                      <PersonCard person={person} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  Icon={Gavel}
                  title="Judges will be announced soon"
                  body="The judging panel is being finalized. Profiles appear here only after confirmation."
                />
              )}
            </div>
          </div>
        </Reveal>

        {/* Sponsors / partners */}
        <Reveal delay={0.14}>
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <Handshake aria-hidden="true" className="h-5 w-5 text-aqua" />
              <h3 className="font-heading text-lg font-bold tracking-tight">
                Partners & Sponsors
              </h3>
              <span className="mono-label text-[0.5625rem] text-muted-foreground">
                {sponsorsReady ? `${sponsors.length} confirmed` : "opportunities open"}
              </span>
            </div>
            <div className="mt-5">
              {sponsorsReady ? (
                <ul className="flex flex-wrap gap-3">
                  {sponsors.map((sponsor) => (
                    <li key={sponsor.id}>
                      {sponsor.url ? (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center rounded-xl border bg-surface px-6 py-4 font-heading text-base font-bold tracking-tight transition-colors hover:bg-secondary ${SPONSOR_TIER_STYLES[sponsor.tier]}`}
                        >
                          {sponsor.name}
                          <span className="mono-label ml-3 text-[0.5rem] opacity-70">
                            {sponsor.tier}
                          </span>
                        </a>
                      ) : (
                        <span
                          className={`inline-flex items-center rounded-xl border bg-surface px-6 py-4 font-heading text-base font-bold tracking-tight ${SPONSOR_TIER_STYLES[sponsor.tier]}`}
                        >
                          {sponsor.name}
                          <span className="mono-label ml-3 text-[0.5rem] opacity-70">
                            {sponsor.tier}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  Icon={Sparkles}
                  title="Partner announcements coming soon"
                  body="Sponsor logos appear here only after partnerships are confirmed. Interested in supporting student builders? Reach out via the contact section below."
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
