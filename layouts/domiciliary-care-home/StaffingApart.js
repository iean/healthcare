import CareInfoBanner from "@layouts/partials/CareInfoBanner";

const StaffingApart = () => {
  return (
    <CareInfoBanner
      title="What Makes Heart & Haven Care Unique?"
      description="At Heart & Haven Care, we believe quality care starts with the right people. That’s why our care staff receive expert, specialised training before they’re carefully matched to meet your individual needs. Whether it’s daily support or specialised care, we provide personalised care plans designed to offer comfort, independence, and peace of mind for you and your loved ones.Discover trusted, compassionate home care that truly puts your family first."
      imageSrc="/images/banner-caregiving/care-help-2.jpg"
      primaryButton={{ text: "KNOW MORE", href: "/contact" }}
    />
  );
};

export default StaffingApart;
