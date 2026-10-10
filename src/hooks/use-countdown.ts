"use client";

import { useEffect, useState } from "react";
import { getEventEnd, getEventStart } from "@/config/event";

export type CountdownState =
  | { status: "unconfigured" }
  | { status: "loading" }
  | {
      status: "upcoming";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | {
      status: "live";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | { status: "ended" };

/**
 * Live countdown derived from config/event.ts.
 * - No valid start date  → "unconfigured" (rendered honestly as Coming Soon)
 * - now < start          → ticking countdown (updates every second)
 * - start ≤ now < end    → "live" with elapsed time since the sprint began
 * - now ≥ end            → "ended"
 *
 * The timer is cleaned up on unmount. `now` starts as null so the
 * server and first client render match (no hydration mismatch).
 */
export function useCountdown(): CountdownState {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    /* First paint matches the server (now === null), then the clock
        starts via callbacks — never a synchronous setState in the effect. */
    const update = () => setNow(Date.now());
    const first = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const start = getEventStart();
  const end = getEventEnd();

  if (!start || !end) return { status: "unconfigured" };
  if (now === null) return { status: "loading" };

  if (now < start.getTime()) {
    const remaining = Math.max(0, start.getTime() - now);
    const totalSeconds = Math.floor(remaining / 1000);
    return {
      status: "upcoming",
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  if (now < end.getTime()) {
    const elapsed = now - start.getTime();
    const totalSeconds = Math.floor(elapsed / 1000);
    return {
      status: "live",
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  return { status: "ended" };
}
