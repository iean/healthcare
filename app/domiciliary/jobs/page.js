import PageHero from "@layouts/partials/PageHero";
import JobList from "@layouts/partials/JobList";

const JobsPage = () => (
  <>
    <PageHero
      title="Available Jobs"
      subtitle="Join our caring team"
      image="/images/banner-caregiving/hero1.jpg"
    />
    <JobList />
  </>
);

export default JobsPage;
