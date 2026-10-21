import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const allowedTopics = new Set(["General enquiry", "Membership enquiry", "Safety question", "Media enquiry"]);
const attempts = new Map<string, { count: number; resetAt: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max + 1) : ""; }
function error(message: string, status: number) { return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: NextRequest) {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  try { if (!host || !origin || new URL(origin).host !== host) return error("Invalid request origin.", 403); }
  catch { return error("Invalid request origin.", 403); }
  if (!request.headers.get("content-type")?.startsWith("application/json")) return error("Invalid request format.", 415);
  if (Number(request.headers.get("content-length") || 0) > 8_000) return error("Message is too large.", 413);
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 8_000) return error("Message is too large.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return error("Invalid request format.", 400);
    data = parsed as Record<string, unknown>;
  } catch { return error("Invalid request format.", 400); }
  const name = text(data.name, 100);
  const email = text(data.email, 254);
  const phone = text(data.phone, 30);
  const topic = text(data.topic, 50);
  const message = text(data.message, 3000);
  if (data.website) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  if (typeof data.startedAt !== "number" || Date.now() - data.startedAt < 3000 || Date.now() - data.startedAt > 86_400_000) return error("Please try again after a moment.", 400);
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || phone.length > 30 || !allowedTopics.has(topic) || message.length < 10 || message.length > 3000) return error("Please check the fields and try again.", 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  if (attempts.size > 10000) attempts.clear();
  const state = attempts.get(ip);
  if (state && state.resetAt > now && state.count >= 5) return error("Too many enquiries. Please try again later or contact us by phone.", 429);
  attempts.set(ip, state && state.resetAt > now ? { count: state.count + 1, resetAt: state.resetAt } : { count: 1, resetAt: now + 3_600_000 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_FROM || !CONTACT_TO_EMAIL || !Number.isInteger(Number(SMTP_PORT)) || ((SMTP_USER && !SMTP_PASSWORD) || (!SMTP_USER && SMTP_PASSWORD))) {
    console.error("Contact form unavailable: SMTP configuration is incomplete");
    return error("The message service is temporarily unavailable. Please call, email or use WhatsApp.", 503);
  }
  try {
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: process.env.SMTP_SECURE === "true", auth: SMTP_USER && SMTP_PASSWORD ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 10_000, disableFileAccess: true, disableUrlAccess: true });
    await transporter.sendMail({ from: SMTP_FROM, to: CONTACT_TO_EMAIL, replyTo: email, subject: `LSTA website: ${topic}`, text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not supplied"}\nTopic: ${topic}\n\nMessage:\n${message}` });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (cause) {
    console.error("Contact form delivery failed", cause instanceof Error ? cause.name : "unknown error");
    return error("The message could not be sent. Please call, email or use WhatsApp.", 502);
  }
}
