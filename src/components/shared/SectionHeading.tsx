interface SectionHeadingProps {
  /** Zero-padded section index, e.g. "02". */
  index: string;
  /** Short mono eyebrow label, e.g. "THE TRACKS". */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/**
 * Consistent editorial section heading: numbered mono label,
 * expressive Space Grotesk title, optional description.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mono-label flex items-center gap-3 text-acid ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true">[</span>
        {index} — {eyebrow}
        <span aria-hidden="true">]</span>
      </p>
      <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
