"use client";

import Image from "next/image";

const Intro = () => (
  <section className="py-16 bg-theme-light">
    <div className="container grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">Caring as a Career</h2>
        <p className="text-gray-700 mb-4">
          We provide comprehensive training and ongoing guidance so you can grow as a professional carer.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>Full induction and shadowing shifts</li>
          <li>Flexible working patterns</li>
          <li>Supportive management team</li>
        </ul>
      </div>
      <div className="rounded-xl overflow-hidden order-2 md:order-2">
        <Image
          src="/images/banner-caregiving/hero2.jpg"
          alt="Caring career"
          width={600}
          height={400}
          className="object-cover w-full h-auto border"
        />
      </div>
    </div>
  </section>
);

export default Intro;
