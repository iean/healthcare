"use client";

const JobsBanner = () => (
  <section className="relative z-10 bg-gradient-to-br from-[#431c52] via-[#6a2c70] to-[#f4b860] text-white">
    <div className="container py-20 text-center">
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9e3ea1, #d46f4d, #f4b860)",
        }}
      >
        Available Jobs
      </h1>
      <p className="max-w-2xl mx-auto text-lg">
        Explore career opportunities in domiciliary care.
      </p>
    </div>
  </section>
);

export default JobsBanner;
