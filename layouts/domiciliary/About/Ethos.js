"use client";

import Image from "next/image";

const Ethos = () => (
  <section className="py-16">
    <div className="container grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">Our Ethos</h2>
        <p className="text-gray-700">
          We are committed to delivering care with genuine compassion and professional integrity. Every visit is focused on promoting independence and dignity within the comfort of home.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden">
        <Image
          src="/images/services/domiciliary-care.jpg"
          alt="Our Ethos"
          width={600}
          height={400}
          className="object-cover w-full h-auto border"
        />
      </div>
    </div>
  </section>
);

export default Ethos;
