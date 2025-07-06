"use client";

const jobs = [
  { title: "Live-in Carer", location: "London", type: "Full Time" },
  { title: "Care Assistant", location: "Leeds", type: "Part Time" },
  { title: "Night Support Worker", location: "Bristol", type: "Temporary" },
];

const JobList = () => (
  <section className="py-16 bg-theme-light">
    <div className="container">
      <h2 className="text-center text-3xl font-bold text-primary mb-8">Current Vacancies</h2>
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row justify-between items-center bg-white border rounded-xl p-6 shadow"
          >
            <div>
              <h3 className="font-semibold text-accent">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location} – {job.type}</p>
            </div>
            <a href="#" className="mt-3 md:mt-0 inline-block bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90">Apply</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default JobList;
