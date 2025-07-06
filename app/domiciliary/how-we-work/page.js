import PageHero from "@layouts/partials/PageHero";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "@lib/contentParser";

const HowWeWorkPage = async () => {
  const home = await getListPage("content/_index.md");
  const { workflow } = home.frontmatter;
  return (
    <>
      <PageHero
        title="How We Work"
        subtitle="Our process ensures quality care"
        image="/images/banner-caregiving/hero3.jpg"
      />
      <Workflow workflow={workflow} />
    </>
  );
};

export default HowWeWorkPage;
