import { useEffect, useRef, useState } from "react";
import { infiniteRetry } from "../../../../utils/retry";
import { useAuthContext } from "../../../../context/AuthContext";
import { useGeneralContext } from "../../../../context/GeneralContext";
import {
  addToDefaultList,
  getAnimeListStatus,
  removeFromDefaultList,
} from "../../../../services/listService";

import { LuPlus } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";

import Loader from "../../../Common/Loader";
import CircleButton from "../../../Common/CircleButton";

export default function ActionButtons({ animeDetails }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState("bottom");
  const [currentList, setCurrentList] = useState(null);
  const [animeListEntryId, setAnimeListEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, authChecked } = useAuthContext();
  const { showAlert } = useGeneralContext();

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch current list status
  useEffect(() => {
    const checkCurrentList = async () => {
      if (!authChecked || !user) return;
      setIsLoading(true);
      try {
        const res = await infiniteRetry(() =>
          getAnimeListStatus(animeDetails.id.toString())
        );
        setCurrentList(res.data.currentList);
        setAnimeListEntryId(res.data.entryId);
        // console.log(res.data)
      } catch (error) {
        console.error("Failed to fetch current list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentList();
  }, [animeDetails.id, authChecked, user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Calculate dropdown position
  const calculateDropdownPosition = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 160; // estimated height
    setDropDownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
  };

  // Add to List
  const handleAddToList = async (status) => {
    setShowDropdown(false);

    if (!authChecked || !user) {
      showAlert("Please login to add anime to your list!", "warning");
      return;
    }

    if (status === "custom") {
      // Future implementation
      return;
    }

    const listKey = status
      .toLowerCase()
      .replace("plan to watch", "planToWatch");

    setIsLoading(true);
    setShowDropdown(false);

    try {
      if (currentList && currentList === listKey) {
        await removeFromDefaultList(animeListEntryId);
        setCurrentList(null);
        showAlert(`Removed from ${status} list.`, "success");
      } else {
        let res = await addToDefaultList({ animeDetails, listTitle: listKey });
        // console.log(res.data);
        setCurrentList(listKey);
        showAlert(`Added to ${status} list!`, "success");
      }
    } catch (err) {
      console.error("List operation failed:", err);
      showAlert("Something went wrong!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-xs:justify-center items-center gap-4 mt-2">
      {/* Add to List Button */}
      <div ref={buttonRef} className="relative w-40 md:w-60">
        <button
          disabled={isLoading}
          onClick={() => {
            setShowDropdown((prev) => {
              if (!prev) calculateDropdownPosition();
              return !prev;
            });
          }}
          className={`group w-full flex text-white rounded-md overflow-hidden cursor-pointer ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex-1 flex justify-center items-center gap-2 bg-primary group-hover:bg-secondary/80 transition-colors duration-300">
            {isLoading ? (
              <Loader isBig={false} color="white" />
            ) : (
              <>
                <LuPlus className="text-xl" />
                <span className="max-md:text-xs">Add to List</span>
              </>
            )}
          </div>
          <div className="p-3 bg-primary-hover-bg group-hover:bg-secondary rounded-e-md transition-colors duration-300">
            <IoIosArrowDown />
          </div>
        </button>

        {/* Show Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className={`absolute ${
              dropDownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            } left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10`}
          >
            {[
              "Completed",
              "Watching",
              "Plan To Watch",
              "Dropped",
              "Custom",
            ].map((status) => {
              const listKey = status
                .toLowerCase()
                .replace("plan to watch", "planToWatch");

              return (
                <button
                  key={status}
                  className="w-full flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-secondary/20 transition-colors text-sm"
                  onClick={() => handleAddToList(status)}
                >
                  <span>{status}</span>
                  {currentList === listKey && (
                    <FaCheck className="text-green-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Share Button */}
      <CircleButton
        icon={IoShareSocial}
        onclick={() => console.log("Share")}
        title="Share"
        btnText="Share"
      />
    </div>
  );
}
