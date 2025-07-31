"use client";

import Image from "next/image";

const Ethos = () => (
  <section className="py-16">
    <div className="container grid md:grid-cols-2 gap-8 items-center">
      {/* Text Block */}
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">Our Ethos</h2>
        <p className="text-gray-700">
          Putting People First — Care with Compassion, Dignity & Respect. At
          Heart & Haven Care, we know first-hand what it means to care for a
          loved one at home. That’s why we understand how vital it is to find
          care professionals who not only have the right skills — but the
          compassion, patience, and heart to truly make a difference.
          <br />
          <br />
          We are redefining home care across the UK by putting people at the
          centre of everything we do. Our people-first approach ensures families
          feel confident that their loved ones are receiving the highest
          standard of support — with warmth, respect, and dignity.
          <br />
          <br />
          Our carefully selected and highly trained care staff are the backbone
          of our service. We recognise, value, and reward their commitment to
          providing reliable, person-focused care that empowers individuals to
          maintain independence in the comfort of their own home.
          <br />
          <br />
          We are committed to enhancing the quality of life for every individual
          we serve. Whether it’s daily assistance or more specialised support,
          our services are built around your unique needs — offering families
          peace of mind and clients the opportunity to live safely and happily
          in familiar surroundings.
          <br />
          <br />
          At Heart & Haven, our carers are more than staff — they are trusted
          companions, respected members of the community, and part of our
          extended care family. We pride ourselves on delivering care that not
          only meets expectations — but exceeds them — every single day.
          <br />
          <br />
          <strong>
            Your care. Your comfort. Your dignity. Always at the heart of what
            we do.
          </strong>
        </p>
      </div>

      {/* Image Block with full height */}
      <div className="h-full">
        <div className="relative w-full h-[700px] rounded-xl overflow-hidden border">
          <Image
            src="/images/domiciliary/about-ethos.png"
            alt="Our Ethos"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);

export default Ethos;
