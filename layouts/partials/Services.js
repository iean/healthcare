"use client";

import Image from "next/image";
import Link from "next/link";

const Services = ({ services }) => {
  return (
    <section className="py-20 bg-theme-light">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2f2f85] mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Quality care for every stage of life — from checkups to chronic
            care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={`service-${index}`}
              className="bg-white border border-[#2f2f85] rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300 p-8 text-center"
            >
              {service.images?.[0] && (
                <div className="flex justify-center mb-5">
                  <Image
                    src={service.images[0]}
                    alt={service.title}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold text-[#2f2f85] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {service.content}
              </p>

              {service.button?.enable && (
                <Link
                  href={service.button.link}
                  className="inline-block text-[#2f2f85] text-sm font-medium hover:underline"
                >
                  {service.button.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
