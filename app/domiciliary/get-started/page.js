import PageHero from "@layouts/partials/PageHero";
import Contact from "@layouts/Contact";
import { getRegularPage } from "@lib/contentParser";

const GetStartedPage = async () => {
  const data = await getRegularPage("contact");
  return (
    <>
      <PageHero
        title="Get Started"
        subtitle="Let us know how we can help"
        image="/images/banner-caregiving/hero3.jpg"
        small
      />
      <Contact data={data} requestType="domiciliary-get-started" />
    </>
  );
};

export default GetStartedPage;
