import CareInfoBanner from "@layouts/partials/CareInfoBanner";

const StaffingApart = () => {
  return (
    <CareInfoBanner
      title="What Sets Our Staffing Apart"
      description="Our dedicated professionals deliver compassionate support tailored to each individual's needs."
      imageSrc="/images/banner-caregiving/care-help-2.jpg"
      primaryButton={{ text: "KNOW MORE", href: "/contact" }}
    />
  );
};

export default StaffingApart;
