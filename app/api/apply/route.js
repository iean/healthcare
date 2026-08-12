import { NextResponse } from "next/server";

/**
 * ============================================================================
 * STUB ROUTE — NOT CONNECTED TO ANYTHING YET
 * ============================================================================
 *
 * [TODO: CONNECT JOB APPLICATIONS TO REAL STORAGE + EMAIL BEFORE GOING LIVE]
 *
 * Validates the submission, including the uploaded CV, then discards it.
 * **Job applications submitted through the site are currently lost.**
 *
 * To finish it you need, from the client:
 *   1. A recruitment email address to notify
 *   2. Somewhere to put the CV file. The app runs on a single VPS behind pm2,
 *      so options are a local uploads directory outside the git working tree,
 *      or object storage (S3/R2). Do NOT write into the repo directory - the
 *      deploy does `git pull` and untracked writes there cause conflicts.
 *   3. A retention policy. CVs are personal data under UK GDPR: decide how
 *      long they are kept and who can see them, and reflect that in the
 *      privacy policy.
 *
 * SECURITY NOTE: this route deliberately does NOT trust the client. It
 * re-checks file type and size, and it does not use the client-supplied
 * filename for anything. When storage is added, generate a fresh filename
 * server-side - never write a user-supplied path.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx", "rtf", "odt"];
const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
  "application/vnd.oasis.opendocument.text",
];

export async function POST(req) {
  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const get = (k) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const errors = {};
  if (!get("firstName")) errors.firstName = "First name is required.";
  if (!get("lastName")) errors.lastName = "Last name is required.";
  if (!EMAIL_RE.test(get("email"))) errors.email = "A valid email address is required.";
  if (!get("phone")) errors.phone = "Phone number is required.";
  if (!get("postcode")) errors.postcode = "Postcode is required.";
  if (get("experience").length < 10) errors.experience = "Please tell us a little more.";
  if (get("consent") !== "true") errors.consent = "Consent is required.";

  for (const [field, max] of [
    ["firstName", 100], ["lastName", 100], ["email", 320],
    ["phone", 40], ["postcode", 20], ["experience", 5000],
  ]) {
    if (get(field).length > max) errors[field] = `${field} is too long.`;
  }

  // CV is optional, but if present it must pass the same checks as the client.
  const cv = form.get("cv");
  const hasCv = cv && typeof cv === "object" && typeof cv.size === "number";
  if (hasCv) {
    const ext = (cv.name || "").split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      errors.cv = `Unsupported file type. Allowed: ${ALLOWED_EXT.join(", ")}.`;
    } else if (cv.type && !ALLOWED_MIME.includes(cv.type)) {
      // Extension and MIME disagreeing is a classic upload bypass attempt.
      errors.cv = "File type does not match its extension.";
    } else if (cv.size > MAX_CV_BYTES) {
      errors.cv = "File is larger than the 5 MB limit.";
    } else if (cv.size === 0) {
      errors.cv = "The uploaded file is empty.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fields: errors },
      { status: 400 }
    );
  }

  // Metadata only - never log applicant contact details or CV contents.
  console.info(
    `[apply:STUB] role="${get("role")}" cv=${hasCv ? `${cv.size}b` : "none"} ` +
      `received=${new Date().toISOString()} — NOT STORED, no storage configured`
  );

  return NextResponse.json({
    ok: true,
    delivered: false,
    notice:
      "STUB: application validated but not stored or emailed. Connect storage and email before going live.",
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
