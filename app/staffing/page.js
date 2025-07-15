import StaffingBanner from "@layouts/staffing/Banner";
import StaffingOptions from "@layouts/staffing/Options";
import ServiceScopes from "@layouts/staffing/Scopes";
import ServiceDescription from "@layouts/staffing/Description";
import WhatWeProvide from "@layouts/staffing/WhatWeProvide";

const StaffingPage = () => {
  return (
    <>
      <StaffingBanner />
      <StaffingOptions />
      {/* <ServiceScopes /> */}
      <WhatWeProvide />
      <ServiceDescription />
    </>
  );
};

export default StaffingPage;
