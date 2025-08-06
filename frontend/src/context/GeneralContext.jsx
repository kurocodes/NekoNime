import { createContext, useState, useContext, useEffect } from "react";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [viewAllSection, setViewAllSection] = useState(null);
  const [searchAnimeList, setSearchAnimeList] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });

    // Auto close after 3s
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        search,
        setSearch,
        dropDownOpen,
        setDropDownOpen,
        viewAllSection,
        setViewAllSection,
        searchAnimeList,
        setSearchAnimeList,
        showSideBar,
        setShowSideBar,
        isOffline,
        alert,
        showAlert,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => useContext(GeneralContext);
