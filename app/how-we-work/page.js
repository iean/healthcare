import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import { getRegularPage } from "@lib/contentParser";
import HowWeWorkBanner from "@layouts/how-we-work/Banner";
import WorkSteps from "@layouts/how-we-work/WorkSteps";
import HelpCards from "@layouts/how-we-work/HelpCards";
import ContactFormSection from "@layouts/how-we-work/ContactFormSection";
import ContactUsBanner from "@layouts/how-we-work/ContactUsBanner";

const HowWeWorkPage = async () => {
  const contactPage = await getRegularPage("contact");
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={`How We Work | ${title}`} />
      <HowWeWorkBanner />
      <WorkSteps />
      <HelpCards />
      <ContactFormSection data={contactPage} />
      <ContactUsBanner />
    </>
  );
};

export default HowWeWorkPage;
