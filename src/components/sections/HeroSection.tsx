"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  MonitorSmartphone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventConfig } from "@/config/event";
import { useRegistrationStore } from "@/lib/registration-store";

const TERMINAL_LINES = [
  { prompt: true, text: "devsprint init --hours 36" },
  { prompt: false, text: "→ loading tracks .......... 5 registered" },
  { prompt: false, text: "→ team slots .............. 1–4 builders" },
  { prompt: false, text: "→ mentor relay ............ on standby" },
  { prompt: true, text: "devsprint status" },
  { prompt: false, text: "→ sprint window ........... 36h · 9AM → 9PM" },
  { prompt: false, text: "→ final submissions ....... Day 2 · 5:00 PM" },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const openRegistration = useRegistrationStore((s) => s.open);

  const scrollToTracks = () =>
    document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });

  const infoChips = [
    { Icon: CalendarDays, label: "Date", value: "Coming Soon" },
    { Icon: MapPin, label: "Venue", value: "To Be Announced" },
    { Icon: Users, label: "Team size", value: `${eventConfig.teamSize.min}–${eventConfig.teamSize.max}` },
    { Icon: MonitorSmartphone, label: "Format", value: eventConfig.format },
  ];

  const entrance = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section
      id="top"
      aria-label="DEVSPRINT 36 introduction"
      className="relative overflow-hidden"
    >
      {/* Technical grid backdrop */}
      <div aria-hidden="true" className="bg-grid bg-grid-fade absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: copy ────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.p
              {...entrance(0)}
              className="mono-label flex flex-wrap items-center gap-2.5 text-acid"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              The Ultimate 36-Hour Build Sprint
            </motion.p>

            <motion.h1
              {...entrance(0.08)}
              className="mt-6 font-heading text-[2.9rem] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              <span className="text-acid">36</span> Hours.
              <br />
              One Big Idea.
              <br />
              <span className="text-outline">Infinite</span>{" "}
              Possibilities.
            </motion.h1>

            <motion.p
              {...entrance(0.16)}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Bring your ideas, find your people, and turn bold concepts into
              working solutions. Build something meaningful, learn from
              mentors, and push your limits in 36 hours.
            </motion.p>

            <motion.div
              {...entrance(0.24)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                onClick={() => openRegistration()}
                className="h-12 px-7 text-base font-semibold"
                aria-label="Register your team for DEVSPRINT 36 (opens registration form)"
              >
                Register Your Team
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToTracks}
                className="h-12 px-7 text-base font-medium"
              >
                Explore the Challenges
                <ArrowDown aria-hidden="true" className="h-4.5 w-4.5" />
              </Button>
            </motion.div>

            {/* Event info chips */}
            <motion.dl
              {...entrance(0.32)}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {infoChips.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-surface/70 p-3 backdrop-blur-sm"
                >
                  <dt className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 truncate text-sm font-semibold text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Right: terminal visual ────────────────────── */}
          <motion.div
            {...entrance(0.2)}
            className="relative hidden lg:col-span-5 lg:block"
          >
            {/* Giant watermark */}
            <span
              aria-hidden="true"
              className="text-outline-soft font-heading pointer-events-none absolute -right-6 -top-24 z-0 select-none text-[19rem] font-bold leading-none"
            >
              36
            </span>

            {/* Geometric accents */}
            <div
              aria-hidden="true"
              className="absolute -left-10 top-10 h-20 w-20 rounded-xl border border-electric/40"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 right-16 h-3 w-3 rounded-full bg-aqua"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 right-24 h-8 w-8 border-b-2 border-r-2 border-acid/50"
            />

            {/* Terminal panel */}
            <div
              role="img"
              aria-label="Terminal panel showing the DEVSPRINT 36 sprint setup: five tracks, teams of one to four, a 36-hour window from 9 AM to 9 PM, and final submissions at 5 PM on Day 2."
              className="relative z-10 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="mono-label ml-3 text-[0.625rem] text-muted-foreground">
                  devsprint36 — bash
                </span>
              </div>
              <div className="space-y-2 p-5 font-mono text-[0.8125rem] leading-relaxed">
                {TERMINAL_LINES.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.prompt ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {line.prompt && (
                      <span className="mr-2 text-acid" aria-hidden="true">
                        $
                      </span>
                    )}
                    {line.text}
                  </p>
                ))}
                <p>
                  <span className="mr-2 text-acid" aria-hidden="true">
                    $
                  </span>
                  <span className="text-foreground">build --beyond-limits</span>
                  <span
                    aria-hidden="true"
                    className="cursor-blink ml-0.5 inline-block h-4 w-[0.55em] translate-y-[3px] bg-acid motion-reduce:animate-none"
                  />
                </p>
              </div>
            </div>

            {/* Simulated blueprint bar */}
            <div
              aria-hidden="true"
              className="relative z-10 mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3"
            >
              <span className="mono-label text-[0.625rem] text-muted-foreground">
                blueprint_v36
              </span>
              <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full w-[62%] rounded-l-full bg-acid" />
                <div className="h-full w-[18%] bg-electric" />
                <div className="h-full w-[12%] bg-aqua" />
                <div className="h-full w-[8%] rounded-r-full bg-muted-foreground/40" />
              </div>
              <span className="mono-label text-[0.625rem] text-acid">100%</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            document
              .getElementById("countdown")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll to countdown and event statistics"
          className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-acid sm:flex"
        >
          <span className="mono-label text-[0.5625rem]">scroll</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 animate-bounce motion-reduce:animate-none"
          />
        </button>
      </div>
    </section>
  );
}
