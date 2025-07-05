import StaffingBanner from "@layouts/staffing/Banner";
import StaffingOptions from "@layouts/staffing/Options";
import ServiceScopes from "@layouts/staffing/Scopes";
import ServiceDescription from "@layouts/staffing/Description";

const StaffingPage = () => {
  return (
    <>
      <StaffingBanner />
      <StaffingOptions />
      <ServiceScopes />
      <ServiceDescription />
    </>
  );
};

export default StaffingPage;
