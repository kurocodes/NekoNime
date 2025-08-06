import { createContext, useContext, useState } from "react";

const AnimeDetailsContext = createContext();

export const AnimeDetailsProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Japanese");

  return (
    <AnimeDetailsContext.Provider
      value={{ selectedLanguage, setSelectedLanguage }}
    >
      {children}
    </AnimeDetailsContext.Provider>
  );
};

export const useAnimeDetailsContext = () => useContext(AnimeDetailsContext);
