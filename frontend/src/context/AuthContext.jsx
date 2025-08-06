import { useEffect } from "react";
import { createContext, useState, useContext, useRef } from "react";
import { verifyToken } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyToken();
        setUser(res.data.user);
        if (import.meta.env.MODE === "development") {
          console.log("Verified user:", res.data.user);
        }
      } catch (error) {
        if (
          error?.response?.status !== 401 ||
          error?.response?.data?.message !== "No token provided"
        ) {
          console.error("Token verification failed:", error);
        }

        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authMode,
        setAuthMode,
        buttonRef,
        user,
        setUser,
        authChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
