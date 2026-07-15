import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const AppLayout = () => {
  const location = useLocation();

  const hideFooterPages = ["/messages"];

  const hideFooter = hideFooterPages.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Navbar />

      <main
        className={
          hideFooter
            ? "h-[calc(100vh-72px)] overflow-hidden"
            : "flex-1 min-h-[60vh]"
        }
      >
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default AppLayout;