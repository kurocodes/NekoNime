import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useGeneralContext } from "../../../context/GeneralContext";

import Sidebar from "../Sidebar";
import SearchBar from "./SearchBar";
import AuthTriggerButton from "../../Auth/AuthTriggerButton";

export default function Navbar() {
  const { setViewAllSection, showSideBar, setShowSideBar, setDropDownOpen } =
    useGeneralContext();
  const { user, authChecked } = useAuthContext();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleIsPressed = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
  };

  const navigate = useNavigate();
  const accountBtnRef = useRef(null);

  return (
    <nav
      className={`sticky top-0 w-full bg-white/30 backdrop-blur-md text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between px-4 z-50 ${
        !user && "px-4 py-[10px]"
      }`}
    >
      <div className="w-full md:w-auto flex items-center justify-between gap-5">
        {/* Brand Name */}
        <h1
          className="text-primary text-2xl sm:text-3xl font-bold cursor-pointer leading-none text-shadow-lg"
          onClick={() => {
            setViewAllSection(null);
            setDropDownOpen(false);
            navigate("/");
          }}
        >
          Neko<span className="text-secondary">Nime</span>
        </h1>

        {/* Desktop Search Bar */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button
            onClick={() => {
              setShowMobileSearch(!showMobileSearch);
              setShowSideBar(false);
            }}
            className={`md:hidden border-2 border-primary text-primary text-xl p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition ${
              showMobileSearch ? "bg-primary text-white" : ""
            }`}
          >
            <FaSearch />
          </button>

          {/* Sign up and Login Buttons for mobile */}
          {!user && authChecked && (
            <div className="md:hidden text-black flex gap-2">
              <AuthTriggerButton
                btnText="Sign Up"
                mode="signup"
                buttonStyle="max-md:hidden rounded-s-full text-primary border-3 border-primary hover:bg-primary hover:text-white"
                textStyle="group-hover:scale-110 ps-4"
              />

              <AuthTriggerButton
                btnText="Login"
                mode="login"
                buttonStyle="text-sm px-4 py-2 bg-secondary text-primary-hover-text hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(160,247,255)]"
                textStyle="text-sm font-semibold"
              />
            </div>
          )}

          {/* Account Button for mobile */}
          {user && authChecked && (
            <div className="relative md:hidden ">
              <div ref={accountBtnRef} className="py-3">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className={`w-10 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isPressed ? "scale-110" : "scale-100"
                  } ${showSideBar ? "border-3 border-primary p-[1px]" : ""}`}
                  onClick={() => {
                    setShowSideBar(!showSideBar);
                    setDropDownOpen(false);
                    handleIsPressed();
                  }}
                />
              </div>

              <Sidebar accountBtnRef={accountBtnRef} />
            </div>
          )}
        </div>
      </div>

      {/* Sign up and Login Buttons for desktop */}
      {!user && authChecked && (
        <div className="max-md:hidden text-black flex gap-2">
          <AuthTriggerButton
            btnText="Sign Up"
            mode="signup"
            buttonStyle=" max-lg:hidden rounded-s-full text-primary border-3 border-primary hover:bg-primary hover:text-white"
            textStyle="text-sm ps-4"
          />

          <AuthTriggerButton
            btnText="Login"
            mode="login"
            buttonStyle="text-sm px-4 py-2 bg-secondary text-primary-hover-text hover:bg-primary hover:rounded-sm hover:text-white hover:shadow-[0_0_15px_rgba(160,247,255)]"
            textStyle="text-sm font-semibold"
          />
        </div>
      )}

      {/* Account Button for deesktop */}
      {user && authChecked && (
        <div className="relative max-md:hidden ">
          <div ref={accountBtnRef} className="py-3">
            <img
              src={user?.profilePicture}
              alt=""
              className={`w-10 rounded-full cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out ${
                isPressed ? "scale-110" : "scale-100"
              } ${showSideBar ? "border-3 border-primary p-[1px]" : ""}`}
              onClick={() => {
                setShowSideBar(!showSideBar);
                setDropDownOpen(false);
                handleIsPressed();
              }}
            />
          </div>

          <Sidebar accountBtnRef={accountBtnRef} />
        </div>
      )}

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="w-full block md:hidden">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}
