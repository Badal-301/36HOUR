"use client";

import { CalendarPlus, ExternalLink, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { eventConfig, eventStats } from "@/config/event";
import { useCountdown } from "@/hooks/use-countdown";
import {
  downloadIcsFile,
  getGoogleCalendarUrl,
  hasValidEventDate,
} from "@/lib/calendar";

type Tile = { label: string; value: string; dim?: boolean };

function buildTiles(state: ReturnType<typeof useCountdown>): Tile[] {
  if (state.status === "unconfigured" || state.status === "loading") {
    return [
      { label: "Days", value: "––", dim: true },
      { label: "Hours", value: "––", dim: true },
      { label: "Minutes", value: "––", dim: true },
      { label: "Seconds", value: "––", dim: true },
    ];
  }
  const pad = (n: number) => n.toString().padStart(2, "0");
  return [
    { label: "Days", value: pad(state.days) },
    { label: "Hours", value: pad(state.hours) },
    { label: "Minutes", value: pad(state.minutes) },
    { label: "Seconds", value: pad(state.seconds) },
  ];
}

export function CountdownSection() {
  const state = useCountdown();
  const tiles = buildTiles(state);
  const dateConfigured = hasValidEventDate();
  const googleUrl = getGoogleCalendarUrl();

  const statusPill =
    state.status === "upcoming"
      ? { text: "Counting down to the sprint", tone: "acid" }
      : state.status === "live"
        ? { text: "The build sprint has started", tone: "acid" }
        : state.status === "ended"
          ? { text: "The event has ended — thanks for building", tone: "muted" }
          : { text: "Event date coming soon", tone: "amber" };

  return (
    <section
      id="countdown"
      aria-label="Event countdown and statistics"
      className="relative scroll-mt-24 border-y border-border bg-surface/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mono-label flex items-center justify-center gap-3 text-acid">
            <span aria-hidden="true">[</span>
            <Hourglass aria-hidden="true" className="h-3.5 w-3.5" />
            T-Minus
            <span aria-hidden="true">]</span>
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {state.status === "live"
              ? "Builders are coding right now"
              : state.status === "ended"
                ? "36 hours. Fully spent."
                : state.status === "upcoming"
                  ? "The clock starts soon"
                  : "36 hours of pure building"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {state.status === "unconfigured" || state.status === "loading"
              ? "The official date is being finalized. The live countdown activates the moment it is announced — the sprint kicks off at 9:00 AM sharp."
              : state.status === "upcoming"
                ? `The sprint window runs 9:00 AM → 9:00 PM (${eventConfig.timezoneLabel}). Get your team ready.`
                : state.status === "live"
                  ? "Elapsed build time since the opening ceremony. Submissions close at 5:00 PM on Day 2."
                  : "DEVSPRINT 36 has wrapped. Submissions were evaluated live at the demo stage."}
          </p>

          {/* Status pill */}
          <p
            role="status"
            aria-live="off"
            className={`mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              statusPill.tone === "acid"
                ? "border-acid/40 bg-acid/10 text-acid"
                : statusPill.tone === "amber"
                  ? "border-[#fbbf24]/40 bg-[#fbbf24]/10 text-[#fbbf24]"
                  : "border-border bg-secondary text-muted-foreground"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                statusPill.tone === "acid"
                  ? "animate-pulse bg-acid motion-reduce:animate-none"
                  : statusPill.tone === "amber"
                    ? "bg-[#fbbf24]"
                    : "bg-muted-foreground"
              }`}
            />
            {statusPill.text}
          </p>
        </Reveal>

        {/* Countdown tiles */}
        <Reveal delay={0.1}>
          <div
            className="mx-auto mt-10 grid max-w-3xl grid-cols-4 gap-2 sm:gap-4"
            aria-label={
              state.status === "upcoming" || state.status === "live"
                ? "Live countdown"
                : "Countdown awaiting event date"
            }
          >
            {tiles.map((tile, i) => (
              <div
                key={tile.label}
                className={`relative rounded-xl border border-border bg-surface p-3 text-center sm:p-6 ${
                  tile.dim ? "opacity-60" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mono-label absolute left-2 top-2 text-[0.5rem] text-muted-foreground/50"
                >
                  0{i + 1}
                </span>
                <p
                  className={`font-heading text-3xl font-bold tabular-nums tracking-tight sm:text-5xl lg:text-6xl ${
                    tile.dim ? "text-muted-foreground/50" : "text-foreground"
                  }`}
                >
                  {tile.value}
                </p>
                <p className="mono-label mt-2 text-[0.625rem] text-muted-foreground sm:text-[0.6875rem]">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Add to calendar — enabled only with a valid configured date */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              disabled={!dateConfigured}
              onClick={() => downloadIcsFile()}
              aria-disabled={!dateConfigured}
              title={
                dateConfigured
                  ? "Download a calendar file (.ics) for the full 36-hour event"
                  : "Available once the event date is announced"
              }
              className="h-9"
            >
              <CalendarPlus aria-hidden="true" className="h-4 w-4" />
              Add to Calendar (.ics)
            </Button>
            {googleUrl ? (
              <Button variant="ghost" size="sm" className="h-9" asChild>
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add DEVSPRINT 36 to Google Calendar (opens in a new tab)"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  Google Calendar
                </a>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-9"
                title="Available once the event date is announced"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Google Calendar
              </Button>
            )}
          </div>
          {!dateConfigured && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Calendar links activate automatically once the official date is
              announced.
            </p>
          )}
        </Reveal>

        {/* Event statistics */}
        <Reveal delay={0.2}>
          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {eventStats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center gap-1.5 bg-surface px-4 py-7 text-center"
              >
                <dd className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {stat.label}
                </dt>
                {"footnote" in stat && stat.footnote && (
                  <p className="mono-label text-[0.5rem] text-muted-foreground/60">
                    {stat.footnote}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
