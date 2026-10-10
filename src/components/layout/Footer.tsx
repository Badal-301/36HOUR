"use client";

import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { LogoMark } from "@/components/shared/Logo";
import { eventConfig } from "@/config/event";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "tracks", label: "Tracks" },
  { id: "schedule", label: "Schedule" },
  { id: "prizes", label: "Prizes" },
  { id: "judging", label: "Judging" },
  { id: "rules", label: "Rules" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const socialLinkStyles =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-acid/50 hover:text-acid focus-visible:outline-offset-4";

export function Footer() {
  const year = new Date().getFullYear();
  const { socials, links, contactEmail } = eventConfig;

  const socialEntries = [
    { url: socials.instagram, label: "Instagram", Icon: Instagram },
    { url: socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { url: socials.github, label: "GitHub", Icon: Github },
    { url: socials.discord, label: "Discord community", Icon: MessageCircle },
  ].filter((s): s is { url: string; label: string; Icon: typeof Instagram } => Boolean(s.url));

  return (
    <footer className="mt-auto border-t border-border bg-surface/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <p className="font-heading text-lg font-bold tracking-tight">
                DEVSPRINT<span className="text-acid"> 36</span>
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.footerDescription}
            </p>
            <p className="mono-label mt-6 text-[0.625rem] text-muted-foreground/70">
              {siteConfig.closingLine}
            </p>
          </div>

          {/* Sections */}
          <nav aria-label="Footer">
            <p className="mono-label text-muted-foreground">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {SECTION_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-acid focus-visible:outline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & documents */}
          <div>
            <p className="mono-label text-muted-foreground">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {contactEmail ? (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-acid focus-visible:outline-offset-4"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    {contactEmail}
                  </a>
                </li>
              ) : (
                <li className="text-sm text-muted-foreground">
                  Contact details coming soon
                </li>
              )}
              {links.rulebookUrl && (
                <li>
                  <a
                    href={links.rulebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-acid"
                  >
                    Official rulebook
                  </a>
                </li>
              )}
              {links.privacyUrl && (
                <li>
                  <a
                    href={links.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-acid"
                  >
                    Privacy notice
                  </a>
                </li>
              )}
            </ul>

            {socialEntries.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socialEntries.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className={cn(socialLinkStyles)}
                  >
                    <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name} · Organized by{" "}
            {eventConfig.organizer.name}
          </p>
          <p className="max-w-md sm:text-right">
            An independent student community event. Not directly sponsored by
            or endorsed as an official Google event.
          </p>
        </div>
      </div>
    </footer>
  );
}
