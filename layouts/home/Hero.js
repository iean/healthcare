import Image from "next/image";
import Button from "@components/ui/Button";
import { Container } from "@components/ui/Section";
import site from "@config/site.json";
import { FaPhoneAlt } from "react-icons/fa";

/**
 * Homepage hero.
 *
 * Says what the business does in one sentence and immediately splits the two
 * commercial audiences - families arranging care, and care homes needing
 * staff. The previous hero was a rotating carousel showing one service at a
 * time, so a care home manager could land on a slide about home care and
 * assume the site was not for them.
 *
 * No auto-rotation: moving content is a usability problem for the older
 * visitors this site serves, and it fails WCAG 2.2.2 unless it can be paused.
 */
const Hero = () => (
  <section className="relative overflow-hidden bg-primary-950 text-white">
    {/* Background photo, deliberately low-contrast behind the text */}
    <div className="absolute inset-0">
      <Image
        src="/images/home/banner_02.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/95 to-primary-900/80"
        aria-hidden="true"
      />
    </div>

    <Container className="relative py-16 md:py-24 lg:py-28">
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-primary-100 ring-1 ring-inset ring-white/20">
          Home care &amp; care home staffing
        </p>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          Care at home, and the carers care homes rely on.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          Heart &amp; Haven Care supports people to live well in their own
          homes, and supplies vetted nurses and care staff to care homes that
          need cover they can trust.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/domiciliary-care" variant="onDark" size="lg">
            Arrange care at home
          </Button>
          <Button href="/care-home-staffing" variant="onDarkOutline" size="lg">
            Request staff for my home
          </Button>
        </div>

        <p className="mt-8 text-white/80">
          Prefer to talk?{" "}
          <a
            href={site.business.phone_href}
            className="inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4 hover:no-underline"
          >
            <FaPhoneAlt aria-hidden="true" className="text-xs" />
            {site.business.phone}
          </a>{" "}
          — on-call {site.business.opening_hours.on_call.toLowerCase()}.
        </p>
      </div>
    </Container>
  </section>
);

export default Hero;
