"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  GraduationCap,
  Leaf,
  Lightbulb,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { tracks } from "@/data/tracks";
import type { Track } from "@/types/event";
import { useRegistrationStore } from "@/lib/registration-store";

const ICONS = {
  BrainCircuit,
  GraduationCap,
  Leaf,
  Terminal,
  Lightbulb,
} as const;

export function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const openRegistration = useRegistrationStore((s) => s.open);

  const registerForTrack = (trackId: string) => {
    setSelectedTrack(null);
    openRegistration(trackId);
  };

  /* 6-col editorial grid: 2 featured + 3 compact */
  const spans = [
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
  ];

  return (
    <section
      id="tracks"
      aria-label="Tracks and problem statements"
      className="scroll-mt-24 border-t border-border bg-surface/30"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="The Tracks"
            title="Five arenas. One sprint."
            description="Pick the problem space that excites you — each track comes with an example challenge and starter ideas to launch your thinking."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {tracks.map((track, i) => {
            const Icon = ICONS[track.icon];
            return (
              <Reveal
                as="article"
                key={track.id}
                delay={i * 0.06}
                className={`h-full ${spans[i] ?? ""}`}
              >
                <div
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--track)]/50 motion-reduce:transition-none"
                  style={{ "--track": track.color } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2"
                      style={{ color: track.color }}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="mono-label text-[0.625rem] text-muted-foreground">
                      T{track.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold leading-tight tracking-tight sm:text-xl">
                    {track.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {track.tagline}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span
                      className="h-1.5 w-10 rounded-full"
                      style={{ background: track.color }}
                      aria-hidden="true"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
                      onClick={() => setSelectedTrack(track)}
                      aria-label={`Explore the ${track.name} track (opens details dialog)`}
                    >
                      Explore Track
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Example-statement disclaimer */}
        <Reveal delay={0.1}>
          <p className="mt-8 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:max-w-2xl">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]"
            />
            Track challenges shown here are example problem statements to spark
            ideas. Official problem statements will be published by the
            organizers if confirmed.
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-acid/25 bg-acid/[0.05] px-6 py-8 text-center sm:px-10">
            <p className="mono-label text-acid">[ Found your track? ]</p>
            <h3 className="max-w-xl font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Found Your Track? Start Building.
            </h3>
            <Button
              size="lg"
              onClick={() => openRegistration()}
              className="mt-2 h-12 px-8 text-base font-semibold"
            >
              Register Your Team
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Track detail dialog */}
      <Dialog
        open={selectedTrack !== null}
        onOpenChange={(open) => !open && setSelectedTrack(null)}
      >
        <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto border-border bg-background scroll-slim sm:rounded-2xl">
          {selectedTrack && (
            <>
              <DialogHeader>
                <div
                  className="flex items-center gap-4"
                  style={{ color: selectedTrack.color }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2">
                    {(() => {
                      const Icon = ICONS[selectedTrack.icon];
                      return <Icon aria-hidden="true" className="h-6 w-6" />;
                    })()}
                  </span>
                  <div>
                    <p className="mono-label text-[0.625rem] text-muted-foreground">
                      Track {selectedTrack.number} of {tracks.length}
                    </p>
                    <DialogTitle className="font-heading text-xl font-bold tracking-tight text-foreground">
                      {selectedTrack.name}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="pt-3 text-sm leading-relaxed sm:text-base">
                  {selectedTrack.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="mono-label text-[0.625rem] text-acid">
                    Example challenge
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/90">
                    {selectedTrack.challenge}
                  </p>
                </div>

                <div>
                  <p className="mono-label text-[0.625rem] text-muted-foreground">
                    Starter ideas
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {selectedTrack.ideas.map((idea) => (
                      <li
                        key={idea}
                        className="flex items-center gap-3 text-sm text-foreground/90"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: selectedTrack.color }}
                        />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  Example problem statement — official challenges may be
                  published by the organizers before the event.
                </p>

                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
                  <Button
                    onClick={() => registerForTrack(selectedTrack.id)}
                    className="font-semibold"
                  >
                    Register for this track
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedTrack(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
