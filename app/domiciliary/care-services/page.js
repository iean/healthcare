import PageHero from "@layouts/partials/PageHero";
import Services from "@layouts/partials/Services";

const CareServicesPage = () => (
  <>
    <PageHero
      title="Care Services"
      subtitle="Compassionate support tailored to you"
      image="/images/banner-caregiving/hero1.jpg"
    />
    <Services />
  </>
);

export default CareServicesPage;
