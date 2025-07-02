import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import HomeBanner from "@layouts/partials/HomeBanner";
import Services from "@layouts/partials/Services";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import CareInfoBanner from "@layouts/partials/CareInfoBanner";
import Contact from "@layouts/Contact";
import { getListPage, getRegularPage } from "../lib/contentParser";
import banner from "@/content/home/banner.json";

const DomiciliaryCareHome = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { feature, services } = frontmatter;
  const contactPage = await getRegularPage("contact");
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={`Domiciliary Care Home | ${title}`} />
      <HomeBanner banner={banner} />
      <Services services={services} />
      <HomeFeatures feature={feature} />
      <CareInfoBanner
        title="What Sets Our Staffing Apart"
        description="Our dedicated professionals deliver compassionate support tailored to each individual's needs."
        imageSrc="/images/banner-caregiving/care-help-2.jpg"
        primaryButton={{ text: "KNOW MORE", href: "/contact" }}
      />
      <Contact data={contactPage} />
    </>
  );
};

export default DomiciliaryCareHome;
