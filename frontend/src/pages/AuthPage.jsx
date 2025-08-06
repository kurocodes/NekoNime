import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Loader from "../components/Common/Loader";

export default function AuthPage() {
  const { user, authChecked, authMode, setAuthMode } = useAuthContext();

  if (!authChecked) return <Loader />;

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="w-full max-w-lg rounded-md max-xs:px-2 px-12 py-4">
        <h3 className="text-2xl text-primary font-bold w-fit mx-auto pb-2 border-b-4 border-primary">
          {authMode === "login" ? "Login" : "Sign Up"}
        </h3>
        {authMode === "login" ? <Login /> : <SignUp />}
        <div className="mt-4 text-center text-sm">
          {authMode === "login" ? (
            <span>
              Don’t have an account?{" "}
              <button
                className="text-primary font-semibold underline cursor-pointer hover:text-secondary"
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                className="text-primary font-semibold underline cursor-pointer hover:text-secondary"
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
