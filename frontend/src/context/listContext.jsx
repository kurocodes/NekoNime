import { createContext, useContext, useState } from "react";

const listContext = createContext();

export const ListProvider = ({ children }) => {
  const [showListContainer, setShowListContainer] = useState(false);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [showCreateListContainer, setShowCreateListContainer] = useState(false);

  return (
    <listContext.Provider
      value={{
        showListContainer,
        setShowListContainer,
        animeDetails,
        setAnimeDetails,
        showCreateListContainer,
        setShowCreateListContainer,
      }}
    >
      {children}
    </listContext.Provider>
  );
};

export const useListContext = () => useContext(listContext);
