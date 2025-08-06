import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUserTab, setSelectedUserTab] = useState("Profile");

  return (
    <UserContext.Provider value={{ selectedUserTab, setSelectedUserTab }}>
      {children}
    </UserContext.Provider>
  );
};

export const userUserContext = () => useContext(UserContext);
