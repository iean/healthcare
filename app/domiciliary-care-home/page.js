import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import Services from "@layouts/partials/Services";
import Contact from "@layouts/Contact";
import { getListPage, getRegularPage } from "../lib/contentParser";

const DomiciliaryCareHome = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { feature, services } = frontmatter;
  const contactPage = await getRegularPage("contact");
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={`Domiciliary Care Home | ${title}`} />
    </>
  );
};

export default DomiciliaryCareHome;
