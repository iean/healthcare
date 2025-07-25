import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const messagesFile = path.join(process.cwd(), 'data', 'messages.json');

async function readMessages() {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeMessages(messages) {
  await fs.mkdir(path.dirname(messagesFile), { recursive: true });
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
}

async function sendEmail(msg) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${msg.name}</p>
    <p><strong>Email:</strong> ${msg.email}</p>
    <p><strong>Phone:</strong> ${msg.phone || ''}</p>
    <p><strong>Subject:</strong> ${msg.subject || ''}</p>
    <p>${msg.message}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'masud.official@gmail.com',
    subject: msg.subject ? `Contact: ${msg.subject}` : 'Contact Form Message',
    html,
  });
}

export async function GET() {
  const messages = await readMessages();
  return NextResponse.json(messages);
}

export async function POST(req) {
  const form = await req.formData();
  const msg = {
    name: form.get('name') || '',
    email: form.get('email') || '',
    phone: form.get('phone') || '',
    subject: form.get('subject') || '',
    message: form.get('message') || '',
    date: new Date().toISOString(),
  };

  const messages = await readMessages();
  messages.push({ id: Date.now(), ...msg });
  await writeMessages(messages);

  try {
    await sendEmail(msg);
  } catch (err) {
    console.error('Email failed', err);
  }

  return NextResponse.redirect('/thank-you');
}
