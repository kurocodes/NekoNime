import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";

import Loader from "../Common/Loader";

export default function AuthFormWrapper({ children, onSubmit, isSubmitting }) {
  const { authMode } = useAuthContext();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={onSubmit}>
        {children}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 group px-4 py-2 w-full font-semibold rounded-md bg-gradient-to-tr from-primary-hover-bg via-primary to-primary-hover-text text-white cursor-pointer transition-all duration-200 ${
            isSubmitting && "opacity-70 cursor-not-allowed"
          } ${isPressed ? "scale-105" : "scale-100"}`}
          onClick={() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 200);
          }}
        >
          {isSubmitting ? (
            <Loader isBig={false} color="white" />
          ) : (
            <>
              <span className="group-hover:scale-110 transition-all duration-200 ease-in-out">
                {authMode === "login" ? "Login" : "Sign Up"}
              </span>
              <FaArrowRight className="-ml-4 mt-[2px] text-md opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
