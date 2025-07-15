"use client";
import Image from "next/image";

const PageHero = ({ title, subtitle, image }) => (
  <section className="py-20 bg-soft-care-gradient">
    <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-gray-700">{subtitle}</p>}
      </div>
      {image && (
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
