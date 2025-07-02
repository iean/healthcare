import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import Services from "@layouts/partials/Services";
import Contact from "@layouts/Contact";
import { getListPage, getRegularPage } from "../lib/contentParser";
import DomiciliaryBanner from "@layouts/domiciliary-care-home/Banner";
import DomiciliaryPerks from "@layouts/domiciliary-care-home/Perks";
import StaffingApart from "@layouts/domiciliary-care-home/StaffingApart";

const DomiciliaryCareHome = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { feature, services } = frontmatter;
  const contactPage = await getRegularPage("contact");
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={`Domiciliary Care Home | ${title}`} />
      <DomiciliaryBanner />
      <Services services={services} />
      <DomiciliaryPerks feature={feature} />
      <StaffingApart />
      <Contact data={contactPage} />
    </>
  );
};

export default DomiciliaryCareHome;
