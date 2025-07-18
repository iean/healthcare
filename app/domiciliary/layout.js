import Header from "@layouts/partials/Header";
import menu from "@config/menu-domiciliary.json";

export default function DomiciliaryLayout({ children }) {
  return (
    <>
      <Header menuItems={menu.main} />
      {children}
    </>
  );
}
