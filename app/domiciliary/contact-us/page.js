import PageHero from "@layouts/partials/PageHero";
import Contact from "@layouts/Contact";
import { getRegularPage } from "@lib/contentParser";

const ContactUsPage = async () => {
  const data = await getRegularPage("contact");
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We are here to help"
        image="/images/banner-caregiving/hero2.jpg"
        small
      />
      <Contact data={data} />
    </>
  );
};

export default ContactUsPage;
