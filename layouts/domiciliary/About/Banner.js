"use client";

const AboutBanner = () => (
  <section className="relative z-10 bg-gradient-to-br from-[#431c52] via-[#6a2c70] to-[#f4b860] text-white">
    <div className="container py-20 text-center">
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9e3ea1, #d46f4d, #f4b860)",
        }}
      >
        Your Privacy is Central — Your Care is Personal
      </h1>
      <p className="max-w-2xl mx-auto text-lg">
        At Heart & Haven Care, we believe that true care starts with trust.
        That’s why your privacy is not just respected — it's at the heart of
        everything we do. We deliver dignified, compassionate, and professional
        support that empowers you or your loved ones to live independently with
        confidence. From everyday assistance to complex care needs, our
        dedicated team is here to provide comfort, companionship, and a helping
        hand — all with the utmost discretion and warmth. Because at Heart &
        Haven, you’re not just receiving care — you’re gaining a partner who
        genuinely understands and respects your journey.
      </p>
    </div>
  </section>
);

export default AboutBanner;
