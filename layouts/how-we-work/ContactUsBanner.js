import Link from "next/link";

const ContactUsBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[#431c52] via-[#6a2c70] to-[#f4b860] text-center text-white">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Begin?</h2>
      <p className="mb-6 max-w-xl mx-auto">
        Reach out to our friendly team today to discuss how we can support you or your loved ones.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-white text-[#431c52] font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
      >
        Contact Us
      </Link>
    </section>
  );
};

export default ContactUsBanner;
