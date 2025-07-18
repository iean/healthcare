import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import SeoMeta from "@layouts/SeoMeta";

import SimpleHeader from "@layouts/partials/SimpleHeader";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import HomeBannerMain from "@layouts/partials/HomeBannerMain";
import Services from "@layouts/partials/Services";
import CareInfoBanner from "@layouts/partials/CareInfoBanner";
import { getListPage } from "../lib/contentParser";
import banner from "@/content/home/banner.json";

const Home = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={title} />
      <SimpleHeader />
      {/* Banner */}
      <HomeBannerMain banner={banner} />
      {/* services */}
      <HomeFeatures feature={feature} />
      <Services services={services} />
      <CareInfoBanner
        title="Financing your care options available to you"
        description="Most people are under the assumption that quality care in their own home is beyond their financial means; however, there are various financing options available..."
        extraText="Benefit from the peace of mind that accompanies the service our excellent and empathetic staff provide."
        imageSrc="/images/banner-caregiving/care-help-2.jpg"
        primaryButton={{ text: "FIND OUT MORE", href: "/financing" }}
        secondaryButton={{ text: "OUR CARERS", href: "/carers" }}
      />
    </>
  );
};

export default Home;
