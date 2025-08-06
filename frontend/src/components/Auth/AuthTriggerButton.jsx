import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function AuthTriggerButton({
  btnText,
  textStyle = "",
  buttonStyle = "",
  mode = "login",
}) {
  const { setAuthMode } = useAuthContext();
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  // Function to handle button click and set auth mode (login/signup)
  const handleToggleAuth = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    setAuthMode(mode);
    navigate("/auth");
  };

  return (
    <button
      onClick={handleToggleAuth}
      className={`group flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer ${
        isPressed ? "scale-95" : "scale-100"
      } ${buttonStyle}`}
    >
      <span className={`transition-all duration-200 ${textStyle}`}>
        {btnText}
      </span>

      {/* Only for signup */}
      {mode === "signup" && (
        <MdKeyboardArrowRight className="text-2xl opacity-0 ms-[-18px] group-hover:opacity-100 group-hover:ms-0 group-hover:pe-1 transition-all duration-200" />
      )}
    </button>
  );
}
