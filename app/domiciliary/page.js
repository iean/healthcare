import config from "@config/config.json";

import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import Services from "@layouts/domiciliary-care-home/Services";
import { getListPage, getRegularPage } from "../../lib/contentParser";
import banner from "@/content/home/banner.json";
import DomiciliaryBanner from "@layouts/domiciliary-care-home/Banner";
import DomiciliaryPerks from "@layouts/domiciliary-care-home/Perks";
import StaffingApart from "@layouts/domiciliary-care-home/StaffingApart";
import Contact from "@layouts/Contact";
const Domiciliary = async () => {
  const homePage = await getListPage("content/_index.md");
  const contactPage = await getRegularPage("contact");

  const { frontmatter } = homePage;
  const { feature } = frontmatter;
  const { title } = config.site;

  return (
    <>
      {/* Banner */}
      <HomeBanner banner={banner} />
      {/* services */}
      <Services />
      <DomiciliaryPerks feature={feature} />
      <StaffingApart />
      <Contact data={contactPage} />
    </>
  );
};

export default Domiciliary;
