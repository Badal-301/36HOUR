"use client";

import {
  Building2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig } from "@/config/event";

export function ContactSection() {
  const { organizer, location, contactEmail, socials } = eventConfig;

  const contactCards = [
    {
      Icon: Building2,
      label: "Organizing club",
      value: organizer.name,
    },
    contactEmail
      ? {
          Icon: Mail,
          label: "Official email",
          value: contactEmail,
          href: `mailto:${contactEmail}`,
        }
      : null,
    location.city || location.college
      ? {
          Icon: MapPin,
          label: "Location",
          value: [location.college, location.city]
            .filter(Boolean)
            .join(", "),
        }
      : null,
  ].filter(Boolean) as {
    Icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  /* Cast widens the `null` literals from eventConfig socials before the
     filter predicate narrows them (TS cannot infer this transition). */
  const socialEntries = (
    [
      { url: socials.instagram, label: "Instagram", handle: "Instagram", Icon: Instagram },
      { url: socials.linkedin, label: "LinkedIn", handle: "LinkedIn", Icon: Linkedin },
      { url: socials.github, label: "GitHub", handle: "GitHub", Icon: Github },
      { url: socials.discord, label: "Discord community", handle: "Discord", Icon: MessageCircle },
    ] as { url: string | null; label: string; handle: string; Icon: typeof Instagram }[]
  ).filter((s): s is { url: string; label: string; handle: string; Icon: typeof Instagram } =>
    Boolean(s.url)
  );

  return (
    <section
      id="contact"
      aria-label="Contact and social media"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            index="09"
            eyebrow="Contact"
            title="Have a Question? Let's Build Together."
            description="Reach the organizing team through official channels — links here are added only once they are confirmed."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Contact cards */}
          <Reveal delay={0.06}>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map(({ Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-acid">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="mono-label text-[0.5625rem] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-foreground">
                        {value}
                      </p>
                    </div>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-acid/40"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
                  >
                    {content}
                  </div>
                );
              })}

              {/* Honest empty state when no contact channels configured */}
              {!contactEmail && socialEntries.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-surface/40 p-5 sm:col-span-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Official contact channels will be announced soon. Until
                    then, find the organizing team on campus — and never trust
                    unverified numbers claiming to represent the event.
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <p className="mono-label text-acid">[ Follow the build ]</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Updates, track reveals and announcements land on our community
                channels first.
              </p>
              {socialEntries.length > 0 ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {socialEntries.map(({ url, label, handle, Icon }) => (
                    <li key={label}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${handle} (opens in a new tab)`}
                        className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3.5 text-sm font-medium transition-colors hover:border-acid/40 hover:text-acid"
                      >
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                        {handle}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                  Social channels coming soon — links appear here once
                  confirmed.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
