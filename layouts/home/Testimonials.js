import Section from "@components/ui/Section";
import SectionHeading from "@components/ui/SectionHeading";
import Reveal from "@components/ui/Reveal";

/**
 * Testimonials.
 *
 * IMPORTANT: these are NOT real testimonials and must not be published as-is.
 * Inventing quotes from care clients would be dishonest, and on a healthcare
 * site it also risks breaching CQC guidance on truthful marketing and the
 * CAP Code. The layout is built and ready; the words are visibly marked as
 * placeholders so nobody can mistake them for genuine feedback.
 *
 * To go live, replace each entry with a real quote plus written consent from
 * the person who gave it. See OVERNIGHT_REPORT.md.
 */
const PLACEHOLDERS = [
  {
    id: 1,
    context: "Family member of a domiciliary care client",
  },
  {
    id: 2,
    context: "Care home manager who books staff with us",
  },
  {
    id: 3,
    context: "Carer working through Kare Plus Rugby",
  },
];

const Testimonials = () => (
  <Section tone="white" size="lg">
    <SectionHeading
      eyebrow="In their words"
      title="What people say about us"
      subtitle="Feedback from the families we support, the homes we staff, and the carers who work with us."
      className="mb-12"
    />

    <ul className="grid gap-6 md:grid-cols-3">
      {PLACEHOLDERS.map((t, i) => (
        <li key={t.id}>
          <Reveal delay={i * 90} className="h-full">
            <figure className="flex h-full flex-col rounded-card border-2 border-dashed border-amber-500 bg-amber-50 p-6">
              <p className="mb-3 inline-flex w-fit rounded bg-amber-200 px-2 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
                Placeholder — not a real quote
              </p>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-amber-950">
                [TODO: INSERT REAL TESTIMONIAL {t.id} — must be a genuine quote
                with written consent from the person who gave it. Do not publish
                this section until all three are replaced.]
              </blockquote>
              <figcaption className="mt-5 border-t border-amber-300 pt-4 text-sm text-amber-900">
                <span className="block font-semibold">
                  [TODO: NAME OR INITIALS]
                </span>
                <span className="block">{t.context}</span>
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>

    <p className="mx-auto mt-8 max-w-2xl rounded-card border border-amber-400 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-900">
      ⚠ Developer note: this entire section is placeholder content. Either
      replace all three quotes with real, consented testimonials or remove the
      section before the site goes live.
    </p>
  </Section>
);

export default Testimonials;
