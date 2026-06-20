import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const AppLayout = () => {

  const location = useLocation();

  const hideFooterPages = [
    "/messages",
  ];

  const hideFooter =
    hideFooterPages.includes(
      location.pathname
    );

  return (

    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">

      <Navbar />

      <main
        className={`flex-1 ${
          hideFooter
            ? "h-[calc(100vh-72px)] overflow-hidden"
            : ""
        }`}
      >

        <Outlet />

      </main>

      {!hideFooter && (

        <Footer />

      )}

    </div>

  );

};

export default AppLayout;