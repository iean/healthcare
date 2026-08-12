import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import config from "@config/config.json";
import site from "@config/site.json";
import { Container } from "@components/ui/Section";
import Social from "@components/Social";
import LocationMap from "@components/ui/LocationMap";
import social from "@config/social.json";

/**
 * Site footer.
 *
 * Carries the safeguarding statement and the legally-required policy links
 * (privacy, cookies, complaints), which the previous footer either omitted or
 * pointed at "#".
 *
 * The CQC block is PRESERVED from the previous footer, not authored here. Its
 * claims could not be verified during this work, so the registration ID is a
 * visible placeholder rather than an invented number. See OVERNIGHT_REPORT.md.
 */
const SiteFooter = () => {
  const { logo_text } = config.site;
  const b = site.business;
  const { services, company, legal } = site.nav.footer;
  const year = new Date().getFullYear();

  const Column = ({ heading, items }) => (
    <nav aria-labelledby={`f-${heading.replace(/\s/g, "")}`}>
      <h2
        id={`f-${heading.replace(/\s/g, "")}`}
        className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-100"
      >
        {heading}
      </h2>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.url}>
            <Link
              href={i.url}
              className="text-[15px] text-white/85 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
            >
              {i.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <footer className="bg-primary-950 text-white">
      {/* Safeguarding statement - deliberately above the fold of the footer */}
      <div className="border-b border-white/15 bg-primary-900">
        <Container className="py-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-6">
            <h2 className="shrink-0 text-sm font-bold uppercase tracking-wider text-primary-100">
              Safeguarding
            </h2>
            <p className="max-w-4xl text-[15px] leading-relaxed text-white/90">
              Kare Plus Rugby is committed to protecting the safety, dignity
              and wellbeing of every person we support. All staff are recruited
              safely, receive safeguarding training, and have a duty to report
              any concern about abuse or neglect. If you are worried about
              someone&apos;s safety, please tell us straight away — or contact
              your local authority safeguarding team. If someone is in immediate
              danger, call 999.{" "}
              <Link href="/safeguarding" className="font-semibold text-white underline underline-offset-4">
                Read our safeguarding policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + contact */}
          <div className="lg:col-span-2">
            <Image
              src="/images/kare-plus-rugby-logo-white.svg"
              alt={logo_text}
              width={210}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/80">
              Home care for people who want to stay independent, and trusted
              nurses and carers for the homes that need them.
            </p>

            <ul className="mt-6 space-y-3 text-[15px]">
              <li>
                <a
                  href={b.phone_href}
                  className="flex items-center gap-3 text-white hover:underline"
                >
                  <FaPhoneAlt aria-hidden="true" className="text-primary-300" />
                  <span>
                    <span className="sr-only">Telephone: </span>
                    {b.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={b.email_href}
                  className="flex items-center gap-3 text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
                >
                  <FaEnvelope aria-hidden="true" className="text-primary-300" />
                  <span>
                    <span className="sr-only">Email: </span>
                    {b.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/85">
                <FaMapMarkerAlt
                  aria-hidden="true"
                  className="mt-1 text-primary-300"
                />
                <address className="not-italic">
                  {b.address.street}
                  <br />
                  {b.address.locality}
                  <br />
                  {b.address.postcode}
                </address>
              </li>
            </ul>

            <div className="mt-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-100">
                Follow us
              </h2>
              <Social source={social} className="flex gap-3 text-lg text-white" />
            </div>
          </div>

          <Column heading="Services" items={services} />
          <Column heading="Company" items={company} />
          <Column heading="Legal & Policies" items={legal} />
        </div>
      </Container>

      {/* Where to find us */}
      <div className="border-t border-white/15">
        <Container className="py-10">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-primary-100">
            Where to find us
          </h2>
          <LocationMap height="300" tone="dark" />
        </Container>
      </div>

      {/* CQC block - preserved from the previous footer, claims unverified */}
      <div className="border-t border-white/15">
        <Container className="py-8">
          <div className="flex flex-col gap-5 rounded-card bg-white/5 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src="/images/cqc-logo.png"
                alt="Care Quality Commission"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div className="text-[15px] text-white/90">
                <p className="font-semibold text-white">
                  Regulated by the Care Quality Commission
                </p>
                <p className="mt-1">
                  Provider ID: {b.cqc_provider_id}
                </p>
                <p className="mt-2 rounded bg-amber-300/20 px-2 py-1 text-sm font-semibold text-amber-200">
                  [TODO: VERIFY CQC REGISTRATION STATUS AND WORDING WITH CQC
                  BEFORE PUBLISHING — DO NOT PUBLISH THIS BLOCK IF NOT
                  REGISTERED]
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {b.legal_name}. All rights reserved.
            {" · "}Registered in England &amp; Wales, company no.{" "}
            {b.companies_house_number}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.slice(0, 3).map((i) => (
              <li key={i.url}>
                <Link href={i.url} className="hover:text-white hover:underline">
                  {i.text}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
};

export default SiteFooter;
