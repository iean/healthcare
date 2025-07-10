import Header from "@layouts/partials/Header";
import menu from "@config/menu-staffing.json";

export default function StaffingLayout({ children }) {
  return (
    <>
      <Header menuItems={menu.main} />
      {children}
    </>
  );
}
