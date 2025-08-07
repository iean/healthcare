import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import SeoMeta from "@layouts/SeoMeta";

import SimpleHeader from "@layouts/partials/SimpleHeader";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import HomeBannerMain from "@layouts/partials/HomeBannerMain";
import { getListPage } from "../lib/contentParser";
import banner from "@/content/home/banner.json";
/**
 *
 *
 * @return {*}
 */
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
    </>
  );
};

export default Home;
