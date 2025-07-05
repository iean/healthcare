"use client";

import Image from "next/image";

const ServiceDescription = ({
  title = "Why Choose Our Staffing Services", // default text
  description = "Our dedicated team connects healthcare providers with experienced professionals who deliver compassionate care.",
  points = [
    "Thorough vetting and compliance checks",
    "Flexible contracts to suit your needs",
    "Friendly support team available 24/7",
  ],
  imageSrc = "/images/banner-caregiving/care-help-2.jpg",
}) => (
  <section className="py-16 bg-theme-light">
    <div className="container grid md:grid-cols-2 gap-8 items-center">
      <div className="order-2 md:order-1">
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={400}
          className="rounded-xl w-full h-auto object-cover border"
        />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          {points.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ServiceDescription;
