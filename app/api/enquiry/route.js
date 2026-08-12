import { NextResponse } from "next/server";

/**
 * ============================================================================
 * STUB ROUTE — NOT CONNECTED TO ANYTHING YET
 * ============================================================================
 *
 * [TODO: CONNECT THIS TO A REAL EMAIL/CRM DESTINATION BEFORE GOING LIVE]
 *
 * Right now this validates the payload and returns success. It does NOT email
 * anyone and does NOT persist anything, so **enquiries submitted through the
 * site will be lost**. That is deliberate and visible rather than silently
 * pretending to work.
 *
 * To finish it you need, from the client:
 *   1. A destination email address for enquiries
 *   2. A sending service (the existing routes use Gmail via nodemailer with
 *      EMAIL_USER / EMAIL_PASS; a transactional provider such as SendGrid,
 *      Postmark or Resend would be more reliable for a business)
 *   3. A decision on storage. Do NOT write to data/*.json - the existing
 *      routes do that, and the server's copy diverges from git, which
 *      eventually breaks deploys. Use a real datastore or rely on email.
 *
 * Server-side validation below is intentionally independent of the client:
 * client-side checks are a convenience and can be bypassed entirely.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_TYPES = ["care", "referral", "staffing", "general"];

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors = {};
  const str = (v) => (typeof v === "string" ? v.trim() : "");

  if (!str(body.name)) errors.name = "Name is required.";
  if (!EMAIL_RE.test(str(body.email))) errors.email = "A valid email address is required.";
  if (!str(body.phone)) errors.phone = "Phone number is required.";
  if (str(body.message).length < 10) errors.message = "Please give us a little more detail.";
  if (body.consent !== true) errors.consent = "Consent is required.";
  if (!VALID_TYPES.includes(body.enquiryType)) errors.enquiryType = "Unknown enquiry type.";

  // Length ceilings so a malicious client cannot post megabytes of text.
  for (const [field, max] of [["name", 200], ["email", 320], ["phone", 40], ["organisation", 200], ["message", 5000]]) {
    if (str(body[field]).length > max) errors[field] = `${field} is too long.`;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fields: errors },
      { status: 400 }
    );
  }

  // Never log the message body or contact details in production - this is a
  // healthcare site and those are personal data. Metadata only.
  console.info(
    `[enquiry:STUB] type=${body.enquiryType} received=${new Date().toISOString()} ` +
      `— NOT DELIVERED, no email service configured`
  );

  return NextResponse.json({
    ok: true,
    delivered: false,
    notice:
      "STUB: enquiry validated but not delivered. Connect an email service before going live.",
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
