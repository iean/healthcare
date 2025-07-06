import PageHero from "@layouts/partials/PageHero";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import { getListPage } from "@lib/contentParser";

const AboutPage = async () => {
  const home = await getListPage("content/_index.md");
  const { feature } = home.frontmatter;

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Learn more about Heart and Haven Care"
        image="/images/banner-caregiving/hero2.jpg"
      />
      <section className="py-12">
        <div className="container prose text-gray-700">
          <p>
            Heart and Haven Care was founded with a commitment to deliver
            compassionate domiciliary services that respect the dignity and
            independence of every individual. Our dedicated team works closely
            with families to craft personalised care plans that truly make a
            difference.
          </p>
        </div>
      </section>
      <HomeFeatures feature={feature} />
    </>
  );
};

export default AboutPage;
