"use client";
import Image from "next/image";

const PageHero = ({ title, subtitle, image, small = false }) => (
  <section
    className={`h-[70vh] bg-gradient-to-br from-[#431c52] via-[#6a2c70] to-[#f4b860] flex items-center`}
  >
    <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, #9e3ea1, #d46f4d, #f4b860)",
          }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-lg text-white">{subtitle}</p>}
      </div>
      {image && (
        <div className="rounded-xl overflow-hidden shadow-lg h-full">
          <Image
            src={image}
            alt={title}
            width={700}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
