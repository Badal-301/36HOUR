"use client";

import { useState } from "react";
import {
  BedDouble,
  Code2,
  Coffee,
  FileCheck,
  Flag,
  Gavel,
  Info,
  MoonStar,
  PartyPopper,
  Scale,
  Ticket,
  UserCheck,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { schedule, scheduleNotice } from "@/data/schedule";
import type { ScheduleItem, ScheduleItemType } from "@/types/event";
import { cn } from "@/lib/utils";

const ITEM_ICONS: Record<string, typeof Flag> = {
  "d1-checkin": Ticket,
  "d1-opening": Flag,
  "d1-ideation": Users,
  "d1-lunch": Utensils,
  "d1-sprint1": Code2,
  "d1-mentors": UserCheck,
  "d1-dinner": Utensils,
  "d1-night": MoonStar,
  "d2-overnight": BedDouble,
  "d2-breakfast": Coffee,
  "d2-sprint2": Code2,
  "d2-lunch": Utensils,
  "d2-final": Zap,
  "d2-submission": FileCheck,
  "d2-demos": Gavel,
  "d2-deliberation": Scale,
  "d2-closing": PartyPopper,
};

const TYPE_STYLES: Record<
  ScheduleItemType,
  { dot: string; badge: string; card: string; label: string }
> = {
  checkin: {
    dot: "border-muted-foreground/50 bg-surface",
    badge: "border-border bg-secondary text-muted-foreground",
    card: "border-dashed border-border bg-transparent",
    label: "Pre-event",
  },
  milestone: {
    dot: "border-acid bg-acid/15",
    badge: "border-acid/40 bg-acid/10 text-acid",
    card: "border-acid/35 bg-acid/[0.04]",
    label: "Milestone",
  },
  build: {
    dot: "border-foreground/60 bg-surface",
    badge: "border-border bg-secondary text-muted-foreground",
    card: "border-border bg-surface",
    label: "Build",
  },
  break: {
    dot: "border-muted-foreground/40 bg-transparent",
    badge: "border-border bg-secondary text-muted-foreground/80",
    card: "border-dashed border-border/70 bg-surface/40 opacity-80",
    label: "Break",
  },
  judging: {
    dot: "border-electric bg-electric/15",
    badge: "border-electric/40 bg-electric/10 text-electric",
    card: "border-electric/35 bg-electric/[0.05]",
    label: "Judging",
  },
  ceremony: {
    dot: "border-aqua bg-aqua/15",
    badge: "border-aqua/40 bg-aqua/10 text-aqua",
    card: "border-aqua/35 bg-aqua/[0.05]",
    label: "Ceremony",
  },
};

type DayFilter = "all" | 1 | 2;

const DAY_FILTERS: { value: DayFilter; label: string; hint: string }[] = [
  { value: "all", label: "All 36 hours", hint: "Full sprint" },
  { value: 1, label: "Day 1", hint: "The build begins" },
  { value: 2, label: "Day 2", hint: "Prototype → demo" },
];

function TimelineItem({ item, index }: { item: ScheduleItem; index: number }) {
  const Icon = ITEM_ICONS[item.id] ?? Code2;
  const styles = TYPE_STYLES[item.type];

  return (
    <Reveal as="li" delay={Math.min(index * 0.04, 0.3)} className="relative">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[7px] top-6 z-10 h-3.5 w-3.5 rounded-full border-2",
          styles.dot
        )}
      />
      <div
        className={cn(
          "ml-8 rounded-xl border p-4 transition-colors sm:ml-12 sm:p-5",
          styles.card
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="flex items-start gap-3.5">
            <span
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                styles.badge
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-heading text-base font-bold leading-snug tracking-tight sm:text-lg">
                {item.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5 sm:items-end">
            <span className="font-mono text-xs font-semibold tabular-nums text-foreground/90">
              {item.time}
            </span>
            <span
              className={cn(
                "mono-label rounded-md border px-2 py-1 text-[0.625rem]",
                styles.badge
              )}
            >
              {item.hourMarker}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ScheduleSection() {
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");

  const day1 = schedule.filter((i) => i.day === 1);
  const day2 = schedule.filter((i) => i.day === 2);

  const renderDay = (day: 1 | 2, items: ScheduleItem[], title: string, subtitle: string) => (
    <div key={day} className="relative">
      {/* Day separator */}
      <div className="sticky top-16 z-20 -mx-1 mb-5 mt-10 first:mt-0">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-background/90 py-3 pl-4 pr-3 backdrop-blur-sm">
          <span className="font-heading text-lg font-bold tracking-tight text-acid sm:text-xl">
            DAY {day}
          </span>
          <span className="text-sm text-muted-foreground">{title}</span>
          <span className="mono-label ml-auto hidden text-[0.5625rem] text-muted-foreground/60 sm:block">
            {subtitle}
          </span>
        </div>
      </div>
      <ol className="relative space-y-4 border-l border-border pl-0">
        {items.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </ol>
    </div>
  );

  return (
    <section
      id="schedule"
      aria-label="36-hour event schedule"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="The Schedule"
            title="36 hours, mapped."
            description="Every hour from the opening ceremony to the final award — milestones, build sprints, breaks and judging, all on one timeline."
          />
        </Reveal>

        {/* Day filter */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Filter schedule by day"
            className="mt-10 inline-flex flex-wrap gap-1 rounded-xl border border-border bg-surface p-1"
          >
            {DAY_FILTERS.map((filter) => (
              <button
                key={String(filter.value)}
                role="tab"
                aria-selected={dayFilter === filter.value}
                onClick={() => setDayFilter(filter.value)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-offset-2",
                  dayFilter === filter.value
                    ? "bg-acid text-acid-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter.label}
                <span className="mono-label ml-2 hidden text-[0.5rem] opacity-70 sm:inline">
                  {filter.hint}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Notice */}
        <Reveal delay={0.08}>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-acid/25 bg-acid/[0.05] p-4 text-sm leading-relaxed text-foreground/90">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-acid"
            />
            {scheduleNotice}
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="mt-10">
          {(dayFilter === "all" || dayFilter === 1) &&
            renderDay(1, day1, "The Build Begins", "Hour 0 → 15")}
          {(dayFilter === "all" || dayFilter === 2) &&
            renderDay(2, day2, "From Prototype to Demo", "Hour 15 → 36")}
        </div>

        {/* Legend */}
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5">
            {(Object.keys(TYPE_STYLES) as ScheduleItemType[]).map((type) => (
              <li
                key={type}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border-2",
                    TYPE_STYLES[type].dot
                  )}
                />
                {TYPE_STYLES[type].label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
