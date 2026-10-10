"use client";

import {
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Code2,
  Compass,
  Goal,
  Handshake,
  Layers,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PILLARS = [
  {
    index: "01",
    Icon: Goal,
    accent: "#c6ff4d",
    title: "Build With Purpose",
    body: "Build useful prototypes that address genuine user needs instead of developing features without a clear problem.",
  },
  {
    index: "02",
    Icon: BookOpen,
    accent: "#8b82ff",
    title: "Learn By Doing",
    body: "Experiment with new tools, APIs, frameworks, and development workflows while learning from other builders.",
  },
  {
    index: "03",
    Icon: Handshake,
    accent: "#48d8e8",
    title: "Collaborate & Grow",
    body: "Work with teammates, exchange feedback, meet mentors, and learn how to present a technical solution.",
  },
];

const INTERESTS = [
  { Icon: Code2, label: "Software Development" },
  { Icon: BrainCircuit, label: "AI / ML" },
  { Icon: Compass, label: "Product Design" },
  { Icon: ShieldCheck, label: "Cybersecurity" },
  { Icon: Layers, label: "Data" },
  { Icon: Lightbulb, label: "Innovation" },
];

export function AboutSection() {
  return (
    <section
      id="overview"
      aria-label="About the hackathon"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left rail — sticky editorial intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index="01"
                eyebrow="Overview"
                title="More Than a Hackathon."
              />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                DEVSPRINT 36 is a collaborative innovation sprint that
                challenges students to identify meaningful problems, experiment
                with technology, and create working prototypes. Whether you
                are exploring AI, building your first website, or developing
                your next ambitious product, this is a place to learn by
                building.
              </p>
              <p
                aria-hidden="true"
                className="text-outline-soft font-heading mt-10 hidden select-none text-[10rem] font-bold leading-none lg:block"
              >
                36
              </p>
            </div>
          </div>

          {/* Right — staggered pillars */}
          <div className="lg:col-span-7">
            <ul className="space-y-6">
              {PILLARS.map((pillar, i) => (
                <Reveal as="li" key={pillar.index} delay={i * 0.08}>
                  <article
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-line sm:p-8 ${
                      i === 1
                        ? "lg:ml-14"
                        : i === 2
                          ? "lg:ml-7"
                          : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading pointer-events-none absolute -right-3 -top-7 select-none text-[6.5rem] font-bold leading-none text-foreground/[0.045] transition-colors duration-300 group-hover:text-foreground/[0.08]"
                    >
                      {pillar.index}
                    </span>
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px]"
                      style={{ background: pillar.accent }}
                    />
                    <div className="flex items-start gap-5">
                      <span
                        className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2"
                        style={{ color: pillar.accent }}
                      >
                        <pillar.Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {pillar.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Who should participate? */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-8 rounded-2xl border border-border bg-surface/50 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <div>
              <p className="mono-label text-acid">[ Who should participate? ]</p>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Curious builders from every corner of campus.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                If any of these describe you, DEVSPRINT 36 was designed with
                you in mind — pick a track and start shaping your idea.
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2.5">
                {INTERESTS.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-acid/40"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 text-acid" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-acid/25 bg-acid/[0.06] p-4">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-acid"
                />
                <p className="text-sm leading-relaxed text-foreground/90">
                  <span className="font-semibold">
                    Total beginners are welcome.
                  </span>{" "}
                  Prior hackathon experience is not mandatory — the opening
                  hours include team formation, ideation support and mentors on
                  the floor.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
