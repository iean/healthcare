"use client";

import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <section className="py-16 bg-theme-light">
      <div className="container">
        <h2
          className="text-center text-3xl font-bold mb-8 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, #9e3ea1, #d46f4d, #f4b860)",
          }}
        >
          Current Vacancies
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white border rounded-xl p-6 shadow"
            >
              <div>
                <h3 className="font-semibold text-accent">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.location} – {job.type}
                </p>
              </div>
              <a
                href="#"
                className="mt-3 md:mt-0 inline-block bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobList;
