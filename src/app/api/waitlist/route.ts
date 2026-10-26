import { NextResponse } from "next/server";
import { isValidStage, validateWaitlist } from "@/lib/waitlist";

// Receives waitlist signups from the form, validates them, and forwards them
// to the Google Apps Script attached to the team's Google Sheet.

const clip = (value: unknown, max = 200) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success so bots move on.
  if (clip(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const input = {
    name: clip(body.name, 100),
    email: clip(body.email).toLowerCase(),
    stage: clip(body.stage, 50),
    consent: body.consent === true,
  };

  const errors = validateWaitlist(input);
  if (Object.keys(errors).length > 0 || !isValidStage(input.stage)) {
    return NextResponse.json({ error: "Please check the form and try again.", errors }, { status: 422 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.WAITLIST_SECRET;
  if (!webhookUrl || !secret) {
    console.error("Waitlist: GOOGLE_SHEETS_WEBHOOK_URL or WAITLIST_SECRET is not set.");
    return NextResponse.json({ error: "Signups are temporarily unavailable." }, { status: 503 });
  }

  const row = {
    secret,
    submittedAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    stage: input.stage,
    utmSource: clip(body.utmSource, 100),
    utmMedium: clip(body.utmMedium, 100),
    utmCampaign: clip(body.utmCampaign, 100),
    referrer: clip(body.referrer, 300),
    landingPage: clip(body.landingPage, 300),
    userAgent: clip(request.headers.get("user-agent"), 300),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; duplicate?: boolean } | null;
    if (!res.ok || !data?.ok) throw new Error(`Apps Script responded ${res.status}: ${JSON.stringify(data)}`);

    return NextResponse.json({ ok: true, duplicate: Boolean(data.duplicate) });
  } catch (err) {
    console.error("Waitlist: failed to save signup", err);
    return NextResponse.json({ error: "Something went wrong. Please try again in a moment." }, { status: 502 });
  }
}
