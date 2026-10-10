import type { RegistrationData, RegistrationRecord } from "@/types/event";
import { generateReference } from "@/lib/reference";

/**
 * ─────────────────────────────────────────────────────────────
 *  REGISTRATION SERVICE (adapter pattern)
 * ─────────────────────────────────────────────────────────────
 *  PRIMARY: POSTs the registration to /api/register, which
 *  persists it to SQLite and sends the confirmation email with
 *  the complete registration info to the student.
 *
 *  FALLBACK: if the backend is unreachable (network error), the
 *  registration is stored in this browser's localStorage so the
 *  site keeps working — the success screen then says so clearly.
 * ─────────────────────────────────────────────────────────────
 */

export const DEMO_MODE_NOTICE =
  "On submit, your registration is recorded by the DEVSPRINT 36 backend and a confirmation email with your complete registration details is sent to your registered email address.";

export type EmailStatus = "sent" | "outbox" | "failed" | "demo";

export interface SubmitSuccess {
  ok: true;
  reference: string;
  /** How the confirmation email was handled. */
  emailStatus: EmailStatus;
  /** Path to preview the exact composed email (not available in demo mode). */
  emailPreviewUrl?: string;
}

export interface SubmitFailure {
  ok: false;
  error: "duplicate" | "storage" | "network" | "validation" | "server";
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

/** localStorage fallback — used only when the backend is unreachable. */
class DemoRegistrationService implements RegistrationService {
  readonly isDemo = true;

  async submit(data: RegistrationData): Promise<SubmitResult> {
    // Simulated latency so loading states are exercised honestly.
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    if (!isBrowserStorageAvailable()) {
      return {
        ok: false,
        error: "storage",
        message:
          "The registration backend is unreachable and browser storage is unavailable, so the registration could not be saved.",
      };
    }

    const existing = this.list();
    const duplicate = existing.some(
      (record) =>
        record.email.trim().toLowerCase() === data.email.trim().toLowerCase(),
    );
    if (duplicate) {
      return {
        ok: false,
        error: "duplicate",
        message:
          "This email address is already registered. Each participant should register once.",
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
        JSON.stringify([...existing, record]),
      );
    } catch {
      return {
        ok: false,
        error: "storage",
        message: "Could not save the registration. Local storage may be full.",
      };
    }

    return { ok: true, reference: record.reference, emailStatus: "demo" };
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

/** Primary adapter — talks to the Next.js API route. */
class ApiRegistrationService implements RegistrationService {
  readonly isDemo = false;
  private readonly fallback = new DemoRegistrationService();

  async submit(data: RegistrationData): Promise<SubmitResult> {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json: unknown = await response.json().catch(() => null);

      if (response.ok && json && typeof json === "object" && "reference" in json) {
        const result = json as {
          reference: string;
          emailStatus?: EmailStatus;
          emailPreviewUrl?: string;
        };
        return {
          ok: true,
          reference: result.reference,
          emailStatus: result.emailStatus ?? "outbox",
          emailPreviewUrl: result.emailPreviewUrl,
        };
      }

      if (json && typeof json === "object" && "message" in json) {
        const failure = json as { error?: SubmitFailure["error"]; message?: string };
        return {
          ok: false,
          error:
            failure.error === "duplicate" ||
            failure.error === "validation" ||
            failure.error === "server"
              ? failure.error
              : "server",
          message:
            failure.message ?? "The registration could not be submitted.",
        };
      }

      return {
        ok: false,
        error: "server",
        message: `The registration backend returned an unexpected response (${response.status}).`,
      };
    } catch {
      // Network-level failure — the API route is unreachable.
      return this.fallback.submit(data);
    }
  }

  list(): RegistrationRecord[] {
    /* The authoritative record list lives in the server database;
       expose any locally saved fallback entries for inspection. */
    return this.fallback.list();
  }
}

export const registrationService: RegistrationService =
  new ApiRegistrationService();
