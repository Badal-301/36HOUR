"use client";

import { FileText, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig } from "@/config/event";
import { ruleCategories } from "@/data/rules";

export function RulesSection() {
  const { rulebookUrl, privacyUrl } = eventConfig.links;

  return (
    <section
      id="rules"
      aria-label="Participation rules and guidelines"
      className="scroll-mt-24 border-t border-border bg-surface/30"
    >
      <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Rules & Guidelines"
            title="Play fair. Build fast."
            description="Straightforward rules that keep the sprint fair, safe and fun for everyone. Expand each category for the details."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion
            type="single"
            collapsible
            className="mt-10 space-y-3"
            defaultValue="eligibility"
          >
            {ruleCategories.map((category, i) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="rounded-xl border border-border bg-surface px-5 transition-colors data-[state=open]:border-acid/35"
              >
                <AccordionTrigger
                  className="py-5 hover:no-underline focus-visible:outline-offset-2 [&>svg]:text-acid"
                  aria-label={`Expand ${category.title} rules`}
                >
                  <span className="flex items-center gap-4 text-left">
                    <span className="mono-label text-[0.625rem] text-acid">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-heading text-base font-bold tracking-tight sm:text-lg">
                        {category.title}
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {category.summary}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul className="space-y-2.5 border-t border-border pt-4">
                    {category.rules.map((rule) => (
                      <li
                        key={rule}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-acid"
                        />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* Official documents — only when configured */}
        {(rulebookUrl || privacyUrl) && (
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              {rulebookUrl && (
                <a
                  href={rulebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-acid/40 hover:text-acid"
                >
                  <FileText aria-hidden="true" className="h-4 w-4" />
                  Complete official rulebook
                </a>
              )}
              {privacyUrl && (
                <a
                  href={privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-acid/40 hover:text-acid"
                >
                  <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                  Privacy notice
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
