/**
 * Event sharing helpers — native Web Share API when available,
 * with copy-to-clipboard as the reliable fallback.
 */

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Legacy fallback (non-secure contexts)
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Shares the current event link. Prefers the native share sheet,
 * falls back to copying the URL to the clipboard.
 */
export async function shareEventLink(
  title: string,
  text: string
): Promise<ShareOutcome> {
  const url = typeof window !== "undefined" ? window.location.href : "";

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return "cancelled";
      }
      // Other errors fall through to clipboard fallback.
    }
  }

  const copied = await copyToClipboard(url);
  return copied ? "copied" : "failed";
}
