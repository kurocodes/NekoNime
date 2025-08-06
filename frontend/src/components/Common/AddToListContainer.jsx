import { FaCheck } from "react-icons/fa";
import { listOptions } from "../../utils/sections";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useListContext } from "../../context/listContext";
import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";
import { removeFromDefaultList } from "../../services/listService";
import {
  addToDefaultList,
  getAnimeListStatus,
} from "../../services/listService";

import Loader from "./Loader";

export default function AddToListContainer() {
  const { showListContainer, setShowListContainer, animeDetails } =
    useListContext();
  const { authChecked, user } = useAuthContext();
  const { showAlert } = useGeneralContext();

  const [currentList, setCurrentList] = useState(null);
  const [animeListEntryId, setAnimeListEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(animeDetails);

  const containerRef = useRef(null);

  // Fetch current list status when component mounts or animeDetails changes
  useEffect(() => {
    const checkCurrentList = async () => {
      if (!authChecked || !user) return;
      setIsLoading(true);
      try {
        const res = await getAnimeListStatus(animeDetails.id.toString());
        setCurrentList(res.data.currentList);
        setAnimeListEntryId(res.data.entryId);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch current list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentList();
  }, [animeDetails?.id, authChecked, user]);

  const handleAddToList = async (status) => {
    if (!authChecked || !user) return;

    if (status === "Custom") {
      // Future implementation
      return;
    }

    const listKey = status
      .toLowerCase()
      .replace("plan to watch", "planToWatch");

    setIsLoading(true);
    try {
      if (currentList && currentList === listKey) {
        await removeFromDefaultList(animeListEntryId);
        setCurrentList(null);
        showAlert(`Removed from ${status} list.`, "success");
      } else {
        let res = await addToDefaultList({ animeDetails, listTitle: listKey });
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

  // Handle click outside to close the container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowListContainer(false);
      }
    };

    if (showListContainer) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showListContainer]);

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-1/2 -translate-[50%] z-100 bg-white rounded-md px-4 py-3 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
    >
      <h4 className="text-xl text-primary font-semibold">Add To List</h4>
      <div className="flex flex-col gap-2 mt-2">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {listOptions.map(({ status, Icon }) => {
              const listKey = status
                .toLowerCase()
                .replace("plan to watch", "planToWatch");

              return (
                <button
                  key={status}
                  className={` group w-full flex justify-between items-center px-4 py-2 cursor-pointer transition-colors text-sm rounded-md ${
                    status === "Custom"
                      ? "hover:bg-secondary hover:text-white"
                      : "hover:bg-secondary/20"
                  } ${currentList === listKey && "bg-secondary/20"}`}
                  onClick={() => handleAddToList(status)}
                >
                  <span className="flex justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Icon className="text-lg" />
                      {status}
                    </span>
                    <span>
                      {status === "Custom" && (
                        <IoIosArrowDroprightCircle className="text-lg text-white opacity-0 group-hover:opacity-100" />
                      )}
                    </span>
                  </span>
                  {currentList === listKey && (
                    <FaCheck className="text-green-500" />
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
