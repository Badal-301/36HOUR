"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Gentle scroll-into-view reveal. Disabled entirely when the user
 * prefers reduced motion — content is simply rendered visible.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = motion[as];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Tag>
  );
}
