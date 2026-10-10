/**
 * Site identity + SEO configuration.
 * Edit this file to update branding, meta tags and share appearance.
 */

export const siteConfig = {
  /** Event name used across the site. */
  name: "DEVSPRINT 36",
  tagline: "36 Hours. One Big Idea. Infinite Possibilities.",
  theme: "Build Beyond Limits.",
  concept:
    "A high-energy, student-focused innovation hackathon where participants collaborate for 36 hours to solve real-world problems using software development, artificial intelligence, web technologies, and creative problem-solving.",
  closingLine: "Designed for builders. Built for impact.",
  footerDescription:
    "A 36-hour collaborative innovation sprint for student builders — prototypes over slides, learning over winning, and ideas worth shipping.",
  seo: {
    title: "DEVSPRINT 36 — 36-Hour Hackathon | Build Beyond Limits",
    description:
      "DEVSPRINT 36 is a 36-hour student hackathon. Bring your idea, find your team, and turn bold concepts into working prototypes across AI, campus innovation, sustainability, developer tools and open innovation tracks.",
    keywords: [
      "DEVSPRINT 36",
      "hackathon",
      "36 hour hackathon",
      "student hackathon",
      "GDG on Campus",
      "build beyond limits",
      "innovation sprint",
    ],
    /** Absolute URL of a 1200×630 share image. null = Open Graph falls back to text card. */
    shareImageUrl: null as string | null,
    /** Set only when the production domain is confirmed. null = no canonical tag. */
    canonicalUrl: null as string | null,
  },
} as const;
