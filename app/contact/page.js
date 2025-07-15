import Contact from "@layouts/Contact";
import { getRegularPage } from "@lib/contentParser";

const ContactPage = async () => {
  const contactPage = await getRegularPage("contact");
  return <Contact data={contactPage} />;
};

export default ContactPage;
