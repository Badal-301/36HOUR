import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrationSchema, normalizePhoneInput } from "@/lib/validation";
import { composeRegistrationEmail } from "@/lib/email-template";
import { sendMail } from "@/lib/mailer";
import { generateReference } from "@/lib/reference";
import type {
  RegistrationData,
  RegistrationRecord,
} from "@/types/event";
import type { Prisma } from "@prisma/client";

/**
 * POST /api/register
 * ─────────────────────────────────────────────────────────────
 * 1. Validates the payload with the SAME zod schema the client
 *    uses (defense in depth — never trust the browser).
 * 2. Rejects duplicate registrations (case-insensitive email).
 * 3. Persists the registration to SQLite via Prisma.
 * 4. Composes the "complete registration info" confirmation
 *    email and delivers it via SMTP when configured; otherwise
 *    stores it in the EmailOutbox so it can be previewed and
 *    delivered later.
 *
 * Response (success):
 *   { ok: true, reference, emailStatus, emailPreviewUrl }
 * Response (failure):
 *   { ok: false, error: "duplicate" | "validation" | "server", message }
 */

export const runtime = "nodejs";

interface ApiError {
  ok: false;
  error: "duplicate" | "validation" | "server";
  message: string;
  field?: string;
}

function jsonError(status: number, body: ApiError) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError(400, {
      ok: false,
      error: "validation",
      message: "Request body must be valid JSON.",
    });
  }

  /* Normalize the phone number (strip formatting / +91 prefix)
     before validation so both client and server agree. */
  if (payload && typeof payload === "object" && "phone" in payload) {
    const raw = (payload as { phone?: unknown }).phone;
    if (typeof raw === "string") {
      (payload as { phone: string }).phone = normalizePhoneInput(raw);
    }
  }

  const parsed = registrationSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return jsonError(400, {
      ok: false,
      error: "validation",
      message: first?.message ?? "Invalid registration data.",
      field: first?.path?.join("."),
    });
  }

  const data: RegistrationData = parsed.data;
  const emailLower = data.email.trim().toLowerCase();

  /* Duplicate check — one registration per email address. */
  try {
    const existing = await db.registration.findUnique({
      where: { emailLower },
      select: { reference: true },
    });
    if (existing) {
      return jsonError(409, {
        ok: false,
        error: "duplicate",
        message:
          "This email address is already registered. Each participant should register once.",
      });
    }
  } catch {
    return jsonError(500, {
      ok: false,
      error: "server",
      message: "Could not verify existing registrations. Please try again.",
    });
  }

  /* Persist (retry a few times on the astronomically unlikely
     reference-code collision). */
  let record: { id: string; reference: string; submittedAt: Date };
  for (let attempt = 0; ; attempt++) {
    const reference = generateReference();
    try {
      record = await db.registration.create({
        data: {
          reference,
          fullName: data.fullName,
          email: data.email,
          emailLower,
          phone: data.phone,
          college: data.college,
          academicYear: data.academicYear,
          portfolioUrl: data.portfolioUrl,
          mode: data.mode,
          teamName: data.teamName,
          teamSize: data.teamSize,
          trackId: data.trackId,
          idea: data.idea,
          /* TeamMemberInput[] → Prisma JSON value (structurally compatible,
             cast needed because TS does not infer index signatures here). */
          teammates: data.teammates as unknown as Prisma.InputJsonValue,
          agreedToRules: data.agreedToRules,
          emailStatus: "outbox",
        },
        select: { id: true, reference: true, submittedAt: true },
      });
      break;
    } catch (error) {
      const isUniqueViolation =
        error instanceof Error &&
        "code" in error &&
        (error as { code?: string }).code === "P2002";
      const duplicateEmail =
        error instanceof Error && error.message.includes("emailLower");
      if (duplicateEmail) {
        return jsonError(409, {
          ok: false,
          error: "duplicate",
          message:
            "This email address is already registered. Each participant should register once.",
        });
      }
      if (isUniqueViolation && attempt < 3) continue; // reference collision — retry
      return jsonError(500, {
        ok: false,
        error: "server",
        message: "Could not save the registration. Please try again.",
      });
    }
  }

  /* Compose + send the confirmation email, always keeping a copy
     in the outbox (audit trail + preview link for the participant). */
  const composed = composeRegistrationEmail({
    ...data,
    reference: record.reference,
    submittedAt: record.submittedAt.toISOString(),
  } satisfies RegistrationRecord);

  const mail = await sendMail(composed);
  const token = crypto.randomUUID();

  try {
    await db.emailOutbox.create({
      data: {
        token,
        toEmail: composed.to,
        subject: composed.subject,
        html: composed.html,
        text: composed.text,
        reference: record.reference,
        status: mail.status === "sent" ? "sent" : mail.status,
      },
    });
    if (mail.status !== "outbox") {
      await db.registration.update({
        where: { id: record.id },
        data: { emailStatus: mail.status },
      });
    }
  } catch {
    /* Registration itself succeeded — never fail the request over
       bookkeeping. The email can be recomposed from the record. */
  }

  return NextResponse.json({
    ok: true,
    reference: record.reference,
    emailStatus: mail.status,
    emailPreviewUrl: `/api/register/email-preview/${token}`,
    ...(mail.status === "failed" ? { emailError: mail.error } : {}),
  });
}
