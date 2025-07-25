'use client'
import { useEffect, useState } from 'react'

export default function JobsAdmin() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ title: '', location: '', type: '' })

  const loadJobs = () => {
    fetch('/api/jobs').then(res => res.json()).then(setJobs)
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ title: '', location: '', type: '' })
    loadJobs()
  }

  return (
    <section className="section">
      <div className="container space-y-8">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job title"
              className="form-input w-full rounded"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="form-input w-full rounded"
              required
            />
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Type"
              className="form-input w-full rounded"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Job</button>
        </form>
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job.id} className="border p-4 rounded">
              <strong>{job.title}</strong> – {job.location} ({job.type})
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
