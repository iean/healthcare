import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const jobsFile = path.join(process.cwd(), 'data', 'jobs.json');

async function readJobs() {
  try {
    const data = await fs.readFile(jobsFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeJobs(jobs) {
  await fs.mkdir(path.dirname(jobsFile), { recursive: true });
  await fs.writeFile(jobsFile, JSON.stringify(jobs, null, 2));
}

export async function GET() {
  const jobs = await readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req) {
  const body = await req.json();
  const { title, location, type } = body || {};
  if (!title || !location || !type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const jobs = await readJobs();
  const newJob = { id: Date.now(), title, location, type };
  jobs.push(newJob);
  await writeJobs(jobs);
  return NextResponse.json(newJob, { status: 201 });
}
