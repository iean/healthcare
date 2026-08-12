"use client";

import { useState, useId } from "react";
import Section from "@components/ui/Section";
import SectionHeading from "@components/ui/SectionHeading";
import Button from "@components/ui/Button";

/**
 * How it works, split by audience.
 *
 * The two journeys are genuinely different - a family arranging care needs an
 * assessment and a care plan, a care home manager needs a shift filled today.
 * Showing both in one list made neither clear, so they are tabbed.
 *
 * Implemented as a proper ARIA tablist with arrow-key navigation, since the
 * default div-with-onClick pattern is unusable by keyboard.
 */
const JOURNEYS = {
  care: {
    label: "Arranging care at home",
    steps: [
      {
        title: "Talk to us",
        body: "Call or send an enquiry. We will ask about the person needing support, what a typical day looks like, and what would help most.",
      },
      {
        title: "Free home assessment",
        body: "A coordinator visits at a time that suits you to understand needs, routines, risks and preferences — with family involved if you want them there.",
      },
      {
        title: "Agree a care plan",
        body: "We write a plan setting out exactly what will happen at each visit, who will provide it, and what it costs. Nothing starts until you are happy with it.",
      },
      {
        title: "Care begins, and keeps adapting",
        body: "Your named coordinator stays in touch, and the plan is reviewed as things change. You can adjust or stop support at any point.",
      },
    ],
    cta: { label: "Arrange a home assessment", href: "/domiciliary-care#enquiry" },
  },
  staffing: {
    label: "Booking staff for a care home",
    steps: [
      {
        title: "Tell us what you need",
        body: "Send us the roles, dates and shift pattern — whether that is a planned block booking or cover for tonight.",
      },
      {
        title: "We match from our team",
        body: "We fill the shift with staff whose checks, training and experience suit your home, and confirm who is coming.",
      },
      {
        title: "Staff arrive ready to work",
        body: "Workers arrive with ID and are briefed on your home's expectations. We ask for your feedback so we can send people who fit.",
      },
      {
        title: "Simple, transparent billing",
        body: "Timesheets are confirmed against the shifts worked and invoiced on agreed terms, with no hidden charges.",
      },
    ],
    cta: { label: "Request staff", href: "/care-home-staffing#request" },
  },
};

const HowItWorks = () => {
  const [active, setActive] = useState("care");
  const base = useId();
  const keys = Object.keys(JOURNEYS);

  const onKeyDown = (e) => {
    const i = keys.indexOf(active);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = e.key === "ArrowRight" ? (i + 1) % keys.length : (i - 1 + keys.length) % keys.length;
      setActive(keys[next]);
      document.getElementById(`${base}-tab-${keys[next]}`)?.focus();
    }
  };

  const journey = JOURNEYS[active];

  return (
    <Section tone="tint" size="lg">
      <SectionHeading
        eyebrow="How it works"
        title="Simple steps, no jargon"
        subtitle="Two different journeys, depending on why you are here."
        className="mb-10"
      />

      <div
        role="tablist"
        aria-label="How it works"
        onKeyDown={onKeyDown}
        className="mx-auto mb-10 flex max-w-xl flex-col gap-2 rounded-btn bg-white p-1.5 shadow-card sm:flex-row"
      >
        {keys.map((k) => (
          <button
            key={k}
            id={`${base}-tab-${k}`}
            role="tab"
            type="button"
            aria-selected={active === k}
            aria-controls={`${base}-panel-${k}`}
            tabIndex={active === k ? 0 : -1}
            onClick={() => setActive(k)}
            className={`flex-1 rounded-btn px-5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
              active === k
                ? "bg-primary-700 text-white"
                : "text-primary-900 hover:bg-primary-50"
            }`}
          >
            {JOURNEYS[k].label}
          </button>
        ))}
      </div>

      {keys.map((k) => (
        <div
          key={k}
          id={`${base}-panel-${k}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${k}`}
          hidden={active !== k}
        >
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEYS[k].steps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-card border border-border bg-white p-6 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-base font-bold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-primary-950">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-textMuted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}

      <div className="mt-10 text-center">
        <Button href={journey.cta.href} size="lg">
          {journey.cta.label}
        </Button>
      </div>
    </Section>
  );
};

export default HowItWorks;
