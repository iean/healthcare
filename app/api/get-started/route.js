import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const getStartedFile = path.join(process.cwd(), "data", "get-started.json");

async function readGetStarted() {
  try {
    const data = await fs.readFile(getStartedFile, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

async function writeGetStarted(entries) {
  await fs.mkdir(path.dirname(getStartedFile), { recursive: true });
  await fs.writeFile(getStartedFile, JSON.stringify(entries, null, 2));
}

async function sendEmail(formData) {
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <h2>New Get Started Form Submission</h2>
    <p><strong>Who needs the care:</strong> ${formData.whoNeedsCare}</p>
    <p><strong>Type of care required:</strong> ${formData.careType}</p>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone}</p>
    <p><strong>Needs:</strong> ${formData.needs || "Not specified"}</p>
    <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "info@haven&heartcare.com",
    subject: `New Get Started Request - ${formData.name}`,
    html,
  });
}

export async function GET() {
  const entries = await readGetStarted();
  return NextResponse.json(entries);
}

export async function POST(req) {
  try {
    const formData = await req.json();

    const entry = {
      id: Date.now(),
      whoNeedsCare: formData.whoNeedsCare || "",
      careType: formData.careType || "",
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      needs: formData.needs || "",
      date: new Date().toISOString(),
    };

    // Save to file
    const entries = await readGetStarted();
    entries.push(entry);
    await writeGetStarted(entries);

    // Send email
    try {
      await sendEmail(formData);
    } catch (err) {
      console.error("Email failed", err);
      return NextResponse.json(
        { error: "Form saved but email failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error", error);
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 },
    );
  }
}
