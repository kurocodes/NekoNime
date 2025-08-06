import { useLocation } from "react-router-dom";
import { useGeneralContext } from "../../context/GeneralContext";
import { useListContext } from "../../context/listContext";

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import AppAlert from "../Common/AppAlert";
import FiltersSection from "./Navbar/FiltersSection";
import AddToListContainer from "../Common/AddToListContainer";

export default function MainLayout({ children }) {
  const location = useLocation();
  const { dropDownOpen, isOffline, alert } = useGeneralContext();
  const { showListContainer } = useListContext();

  return (
    <div className="relative font-primary">
      <Navbar isAnimePage={location.pathname.startsWith("/anime/")} />
      {dropDownOpen && <FiltersSection />}
      <main>{children}</main>
      {(alert.show || isOffline) && (
        <AppAlert
          type={isOffline ? "error" : alert.type}
          message={
            isOffline
              ? "You are offline! Please check your internet connection."
              : alert.message
          }
        />
      )}
      {showListContainer && <AddToListContainer />}

      <Footer />
    </div>
  );
}
