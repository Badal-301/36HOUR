import type { RegistrationData, RegistrationRecord } from "@/types/event";

/**
 * ─────────────────────────────────────────────────────────────
 *  REGISTRATION SERVICE (adapter pattern)
 * ─────────────────────────────────────────────────────────────
 *  Currently runs in DEMO MODE: registrations are stored in the
 *  browser's localStorage ONLY. Nothing is sent to a server and
 *  organizers do not receive any data.
 *
 *  To connect a real backend later, implement the
 *  `RegistrationService` interface with fetch() calls to your
 *  API and swap the exported instance at the bottom of this file.
 *  The UI does not change.
 * ─────────────────────────────────────────────────────────────
 */

export const DEMO_MODE_NOTICE =
  "Demo mode: registrations are stored only in this browser and are not automatically submitted to the organizers.";

export interface SubmitSuccess {
  ok: true;
  reference: string;
}

export interface SubmitFailure {
  ok: false;
  error: "duplicate" | "storage" | "network";
  message: string;
}

export type SubmitResult = SubmitSuccess | SubmitFailure;

export interface RegistrationService {
  /** True when running against localStorage instead of a real backend. */
  readonly isDemo: boolean;
  submit(data: RegistrationData): Promise<SubmitResult>;
  list(): RegistrationRecord[];
}

const STORAGE_KEY = "devsprint36.demo.registrations";
const SIMULATED_DELAY_MS = 900;

const REFERENCE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // unambiguous chars

/** Generates a demo registration reference like "DS36-K7QM4T". */
export function generateReference(): string {
  let code = "";
  const cryptoObj = typeof crypto !== "undefined" ? crypto : undefined;
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(6);
    cryptoObj.getRandomValues(bytes);
    bytes.forEach((b) => {
      code += REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length];
    });
  } else {
    for (let i = 0; i < 6; i++) {
      code += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)];
    }
  }
  return `DS36-${code}`;
}

function isBrowserStorageAvailable(): boolean {
  try {
    const probe = "__ds36_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

class DemoRegistrationService implements RegistrationService {
  readonly isDemo = true;

  async submit(data: RegistrationData): Promise<SubmitResult> {
    // Simulated network latency so loading states are exercised honestly.
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    if (!isBrowserStorageAvailable()) {
      return {
        ok: false,
        error: "storage",
        message:
          "Browser storage is unavailable (private mode?), so the demo registration cannot be saved in this browser.",
      };
    }

    const existing = this.list();
    const duplicate = existing.some(
      (record) =>
        record.email.trim().toLowerCase() === data.email.trim().toLowerCase()
    );
    if (duplicate) {
      return {
        ok: false,
        error: "duplicate",
        message:
          "This email address is already registered in this browser. Each participant should register once.",
      };
    }

    const record: RegistrationRecord = {
      ...data,
      reference: generateReference(),
      submittedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...existing, record])
      );
    } catch {
      return {
        ok: false,
        error: "storage",
        message: "Could not save the demo registration. Local storage may be full.",
      };
    }

    return { ok: true, reference: record.reference };
  }

  list(): RegistrationRecord[] {
    if (!isBrowserStorageAvailable()) return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as RegistrationRecord[];
    } catch {
      return [];
    }
  }
}

/* Swap this instance to integrate a real backend (same interface). */
export const registrationService: RegistrationService =
  new DemoRegistrationService();
