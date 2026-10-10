"use client";

import {
  Award,
  Crown,
  Gift,
  Handshake,
  Megaphone,
  Rocket,
  Trophy,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig } from "@/config/event";
import { prizes, prizeBenefits, specialPrizes } from "@/data/prizes";

const BENEFIT_ICONS = [Award, Handshake, Megaphone, Rocket];

const inr = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export function PrizesSection() {
  const grand = prizes.find((p) => p.emphasis === "grand");
  const standard = prizes.filter((p) => p.emphasis === "standard");
  const runnerUp = standard[0];
  const socialImpact = standard[1];
  const bestFirstHack = standard[2];

  return (
    <section
      id="prizes"
      aria-label="Prizes and rewards"
      className="scroll-mt-24 border-t border-border bg-surface/30"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Prizes & Rewards"
            title="Worth building for."
            description="Recognition across the board — from the strongest overall build to the most promising first-time team."
            align="center"
          />
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Gift aria-hidden="true" className="h-3.5 w-3.5 text-[#fbbf24]" />
            Prize pool is illustrative until officially confirmed by the
            organizers.
          </p>
        </Reveal>

        {/* Podium */}
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:items-end">
          {/* Runner-up — left */}
          {runnerUp && (
            <Reveal className="order-2 md:order-1" delay={0.1}>
              <article className="rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-electric/40">
                <span className="mono-label text-[0.625rem] text-electric">
                  2nd place
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold tracking-tight">
                  {runnerUp.name}
                </h3>
                <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground">
                  {inr(runnerUp.amount)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {runnerUp.description}
                </p>
              </article>
            </Reveal>
          )}

          {/* Grand champion — center, elevated */}
          {grand && (
            <Reveal className="order-1 md:order-2" delay={0}>
              <article className="relative overflow-hidden rounded-2xl border border-acid/50 bg-gradient-to-b from-acid/[0.09] to-transparent p-8 text-center shadow-[0_0_60px_-20px_rgba(198,255,77,0.25)] transition-colors hover:border-acid/70">
                <div
                  aria-hidden="true"
                  className="bg-grid absolute inset-0 opacity-60"
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-acid/40 bg-acid/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-acid">
                    <Crown aria-hidden="true" className="h-4 w-4" />
                    Grand Champion
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    {grand.name}
                  </h3>
                  <p className="mt-4 font-heading text-5xl font-bold tracking-tight text-acid sm:text-6xl">
                    {inr(grand.amount)}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {grand.description}
                  </p>
                </div>
              </article>
            </Reveal>
          )}

          {/* Social impact — right */}
          {socialImpact && (
            <Reveal className="order-3" delay={0.15}>
              <article className="rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-aqua/40">
                <span className="mono-label text-[0.625rem] text-aqua">
                  Special award
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold tracking-tight">
                  {socialImpact.name}
                </h3>
                <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground">
                  {inr(socialImpact.amount)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {socialImpact.description}
                </p>
              </article>
            </Reveal>
          )}
        </div>

        {/* Best first hack — wide */}
        {bestFirstHack && (
          <Reveal delay={0.1}>
            <article className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-6 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#fbbf24]/40 bg-[#fbbf24]/10 text-[#fbbf24]">
                  <Trophy aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold tracking-tight">
                    {bestFirstHack.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {bestFirstHack.description}
                  </p>
                </div>
              </div>
              <p className="font-heading text-3xl font-bold tracking-tight text-[#fbbf24]">
                {inr(bestFirstHack.amount)}
              </p>
            </article>
          </Reveal>
        )}

        {/* Total pool */}
        <Reveal delay={0.12}>
          <p className="mt-8 text-center">
            <span className="mono-label text-[0.625rem] text-muted-foreground">
              Total illustrative prize pool
            </span>
            <span className="mt-1 block font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {inr(eventConfig.prizePool)}
              <span className="mono-label ml-3 align-middle text-[0.625rem] text-muted-foreground">
                {eventConfig.prizePoolConfirmed
                  ? "Confirmed"
                  : "Illustrative — subject to organizer confirmation"}
              </span>
            </span>
          </p>
        </Reveal>

        {/* Special prizes (hidden while empty) */}
        {specialPrizes.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specialPrizes.map((prize) => (
              <div
                key={prize.id}
                className="rounded-xl border border-dashed border-border bg-surface/60 p-4"
              >
                <p className="mono-label text-[0.5625rem] text-muted-foreground">
                  Sponsor award
                </p>
                <h4 className="mt-2 font-heading text-base font-bold">
                  {prize.name}
                </h4>
                <p className="mt-1 font-heading text-xl font-bold text-acid">
                  {inr(prize.amount)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Non-monetary benefits */}
        <Reveal delay={0.15}>
          <div className="mt-14">
            <p className="mono-label text-center text-muted-foreground">
              [ Beyond the cash ]
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {prizeBenefits.map((benefit, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                return (
                  <li
                    key={benefit.id}
                    className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-acid/35"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 text-acid" />
                    <h4 className="mt-3 text-sm font-semibold text-foreground">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {benefit.note}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
