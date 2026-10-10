import { siteConfig } from "@/config/site";

/**
 * Custom DEVSPRINT 36 mark — abstract "36" tile built with SVG,
 * plus the wordmark lockup used in the navbar and footer.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`${siteConfig.name} mark`}
    >
      <rect width="64" height="64" rx="14" fill="#0B0D12" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="13.25"
        fill="none"
        stroke="#232A38"
        strokeWidth="1.5"
      />
      <text
        x="30"
        y="43"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), Arial, sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-1"
        fill="#C6FF4D"
      >
        36
      </text>
      <rect x="47" y="14" width="4" height="4" fill="#8B82FF" />
      <rect x="47" y="21" width="4" height="4" fill="#48D8E8" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-bold tracking-tight text-foreground">
          DEVSPRINT<span className="text-acid"> 36</span>
        </span>
        {!compact && (
          <span className="mono-label mt-1 text-[0.5625rem] text-muted-foreground">
            Build Beyond Limits
          </span>
        )}
      </span>
    </span>
  );
}
