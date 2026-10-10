import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/register/email-preview/[token]
 * Serves the exact HTML email that was composed (and sent, when
 * SMTP is configured) for a registration. The token is a random
 * UUID generated per registration — unguessable by design.
 */

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  if (!token || typeof token !== "string") {
    return new NextResponse("Not found", { status: 404 });
  }

  const entry = await db.emailOutbox.findUnique({
    where: { token },
    select: { html: true, subject: true },
  });

  if (!entry) {
    return new NextResponse("Email not found", { status: 404 });
  }

  return new NextResponse(entry.html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });
}
