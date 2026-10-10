"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/config/site";
import { useRegistrationStore } from "@/lib/registration-store";
import { shareEventLink } from "@/lib/share";
import { useToast } from "@/hooks/use-toast";

export function FinalCTA() {
  const openRegistration = useRegistrationStore((s) => s.open);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const outcome = await shareEventLink(
      siteConfig.name,
      siteConfig.tagline
    );
    if (outcome === "shared") return; // Native share sheet handled it.
    if (outcome === "copied") {
      setCopied(true);
      toast({
        title: "Link copied to clipboard",
        description: "Share DEVSPRINT 36 with your future teammates.",
      });
      setTimeout(() => setCopied(false), 2000);
    } else if (outcome === "failed") {
      toast({
        title: "Could not share automatically",
        description: "Copy the page URL from your browser's address bar instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="join"
      aria-label="Join DEVSPRINT 36"
      className="relative scroll-mt-24 overflow-hidden border-t border-border"
    >
      {/* Backdrop */}
      <div aria-hidden="true" className="bg-grid bg-grid-fade absolute inset-0 rotate-180" />
      <span
        aria-hidden="true"
        className="text-outline-soft font-heading pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none text-[16rem] font-bold leading-none sm:text-[22rem]"
      >
        36
      </span>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <Reveal>
          <p className="mono-label text-acid">[ Final call ]</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Your idea deserves to be built.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Find your track. Bring your curiosity. Build beyond limits.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={openRegistration}
              className="h-12 px-8 text-base font-semibold"
              aria-label="Join DEVSPRINT 36 (opens registration form)"
            >
              Join DEVSPRINT 36
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
              className="h-12 px-8 text-base font-medium"
              aria-label="Share the DEVSPRINT 36 event link"
            >
              {copied ? (
                <Check aria-hidden="true" className="h-4.5 w-4.5 text-acid" />
              ) : (
                <Share2 aria-hidden="true" className="h-4.5 w-4.5" />
              )}
              {copied ? "Link copied" : "Share the event"}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
