import nodemailer from "nodemailer";

/**
 * ─────────────────────────────────────────────────────────────
 *  MAILER
 * ─────────────────────────────────────────────────────────────
 *  Sends the confirmation email through SMTP when credentials
 *  are configured (SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS,
 *  optional SMTP_SECURE and MAIL_FROM). Without credentials the
 *  caller stores the composed email in the EmailOutbox table so
 *  it can be previewed and delivered once SMTP is set up.
 * ─────────────────────────────────────────────────────────────
 */

export interface MailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export type MailStatus = "sent" | "outbox" | "failed";

export interface MailResult {
  status: MailStatus;
  error?: string;
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export async function sendMail(payload: MailPayload): Promise<MailResult> {
  if (!isSmtpConfigured()) {
    return { status: "outbox" };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure:
        process.env.SMTP_SECURE === "true" ||
        (!process.env.SMTP_SECURE && port === 465),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from:
        process.env.MAIL_FROM ??
        `"DEVSPRINT 36" <${process.env.SMTP_USER}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown SMTP error",
    };
  }
}
