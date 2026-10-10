"use client";

import { useMemo, useState } from "react";
import { CircleHelp, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { faqs } from "@/data/faqs";

export function FAQSection() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="scroll-mt-24 border-t border-border bg-surface/30"
    >
      <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="08"
            eyebrow="FAQ"
            title="Questions, answered."
            description="Everything participants usually ask before a 36-hour sprint. Still curious? The contact section is one scroll away."
          />
        </Reveal>

        {/* Search */}
        <Reveal delay={0.05}>
          <div className="relative mt-10">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions — try “team”, “AI tools”, “submit”…"
              aria-label="Search frequently asked questions"
              className="h-12 rounded-xl border-border bg-surface pl-11 text-base placeholder:text-muted-foreground/60 focus-visible:ring-acid"
            />
            {query && (
              <p className="mono-label mt-2.5 text-[0.5625rem] text-muted-foreground" role="status">
                {filtered.length} of {faqs.length} questions
              </p>
            )}
          </div>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={0.08}>
          {filtered.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="mt-6 space-y-3"
              defaultValue="faq-what"
            >
              {filtered.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-border bg-surface px-5 transition-colors data-[state=open]:border-acid/35"
                >
                  <AccordionTrigger className="py-4.5 text-left text-[0.9375rem] font-semibold hover:no-underline focus-visible:outline-offset-2 [&>svg]:text-acid sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div
              className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface/40 px-6 py-12 text-center"
              role="status"
            >
              <CircleHelp aria-hidden="true" className="h-8 w-8 text-muted-foreground/50" />
              <p className="font-heading text-base font-bold">
                No matching questions
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different keyword, or ask us directly through the contact
                section below.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
