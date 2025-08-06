import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";

import { FaEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

import SidebarBtn from "./SidebarBtn";

export default function Sidebar({ accountBtnRef }) {
  const { showSideBar, setShowSideBar } = useGeneralContext();
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    let timeOutId;
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !accountBtnRef.current.contains(e.target)
      ) {
        setShowSideBar(false);
      }
    };

    if (showSideBar) {
      timeOutId = setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      clearTimeout(timeOutId);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showSideBar]);

  const handleLogout = async (e) => {
    e.stopPropagation();

    try {
      const res = await logout();
      console.log(res.data);
      setUser(null);
    } catch (err) {
      console.log("failed to logout: ", err);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`z-[60] top-18 right-2 fixed pb-2 text-black bg-white/90 backdrop-blur-md rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)] min-w-[300px] ${
        showSideBar ? "block" : "hidden"
      }`}
    >
      {/* User pfp, username and email */}
      {user && (
        <div className="flex flex-col items-center gap-1 p-4 rounded-t-md">
          <div
            className="group relative cursor-pointer"
            onClick={() => navigate("/user/profile")}
          >
            <img
              src={user.profilePicture}
              alt=""
              className="w-15 rounded-full p-[1px] border-3 border-primary"
            />
            <div className="absolute top-0 bg-secondary/60 w-full h-full flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200">
              <FaEdit className="text-white text-xl" />
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <span className="text-lg text-primary">{user.username}</span>
            <span className="text-sm text-secondary">{user.email}</span>
          </div>
        </div>
      )}

      {/* Sidebar buttons */}
      <SidebarBtn
        Icon={MdOutlineAccountCircle}
        label="Profile"
        onClick={() => navigate("/user/profile")}
      />
      <SidebarBtn
        Icon={CiBoxList}
        label="Watchlists"
        onClick={() => navigate("/user/watchlists")}
      />
      <SidebarBtn
        Icon={MdOutlineSettings}
        label="Settings"
        onClick={() => navigate("/user/settings")}
      />
      <SidebarBtn Icon={TbLogout} label="Logout" onClick={handleLogout} />
    </div>
  );
}
