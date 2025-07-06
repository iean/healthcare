"use client";

import Link from "next/link";

const ContactBanner = () => (
  <section className="py-12 bg-gradient-to-r from-[#431c52] via-[#6a2c70] to-[#f4b860] text-center text-white">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need Caring Professionals?</h2>
    <p className="mb-6 max-w-xl mx-auto">
      Get in touch with our friendly team today and discover how Heart & Haven Care can support your organisation.
    </p>
    <Link
      href="/contact"
      className="inline-block bg-white text-[#431c52] font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
    >
      Contact Us
    </Link>
  </section>
);

export default ContactBanner;
