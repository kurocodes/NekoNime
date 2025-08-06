import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useListContext } from "../context/listContext";

import CreateListContainer from "../components/UserLayout/CreateListContainer";

export default function UserLayout() {
  const { user, authChecked } = useAuthContext();
  const { showCreateListContainer } = useListContext();

  if (!user || !authChecked) return <Navigate to="/" replace />;

  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = () => {
    const path = location.pathname.split("/")[2];
    switch (path) {
      case "profile":
        return "Profile";
      case "watchlists":
        return "Watchlists";
      case "settings":
        return "Settings";
      default:
        return "Profile";
    }
  };

  const selectedTab = getTabFromPath();

  return (
    <div className="relative">
      {/* User Page Tabs */}
      <div className="sticky top-[62px] z-10 w-full bg-primary flex justify-center max-xs:gap-2 gap-10">
        {[
          { label: "Profile", Icon: MdOutlineAccountCircle },
          { label: "Watchlists", Icon: CiBoxList },
          { label: "Settings", Icon: MdOutlineSettings },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1 p-4 border-b-3 cursor-pointer hover:text-primary-hover-text transition-all duration-200 ${
              selectedTab === tab.label
                ? "bg-secondary text-primary-hover-text border-primary-hover-text"
                : "text-white border-transparent"
            }`}
            onClick={() => {
              navigate(`/user/${tab.label.toLowerCase()}`);
            }}
          >
            <tab.Icon className="text-2xl max-sm:text-xl" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Outlet for nested routes */}
      <Outlet />

      {showCreateListContainer && <CreateListContainer />}
    </div>
  );
}
