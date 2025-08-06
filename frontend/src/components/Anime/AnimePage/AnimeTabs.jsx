import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Previews from "./AnimeTabs/Previews";
import MusicTab from "./AnimeTabs/MusicTab";
import StaffTab from "./AnimeTabs/StaffTab/StaffTab";
import Characters from "./AnimeTabs/CharacterTab/Characters";
import MoreInfoTab from "./AnimeTabs/MoreInfoTab/MoreInfoTab";

export default function AnimeTabs({ selectedTab, handleTabChange, idMal }) {
  const animeId = parseInt(useParams().id);

  const [visitedTabs, setVisitedTabs] = useState([]);

  // Mark tab as visited whenever it changes
  useEffect(() => {
    if (!visitedTabs.includes(selectedTab)) {
      setVisitedTabs((prev) => [...prev, selectedTab]);
    }
  }, [selectedTab]);

  const [characterData, setCharacterData] = useState([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  const [previewData, setPreviewData] = useState(null);
  const [loadingPreviews, setLoadingPreviews] = useState(false);

  const [openings, setOpenings] = useState([]);
  const [endings, setEndings] = useState([]);

  const [staffData, setStaffData] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const [moreInfoData, setMoreInfoData] = useState([]);
  const [loadingMoreInfo, setLoadingMoreInfo] = useState(false);

  return (
    <div className="flex flex-col gap-4 max-lg:mt-4 max-lg:pt-2">

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-secondary">
        {[
          "Characters",
          "Previews",
          "Music",
          "Staff",
          "More Info",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-2 min-w-[90px] text-center cursor-pointer transition-all duration-200 ${
              selectedTab === tab
                ? "text-white bg-primary rounded-full"
                : "hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs content based on selected tab */}
      <div className=" flex-1 w-full rounded-lg text-black">
        {visitedTabs.includes("Previews") && (
          <div className={selectedTab === "Previews" ? "block" : "hidden"}>
            <Previews
              idMal={idMal}
              previews={previewData}
              setPreviews={setPreviewData}
              loading={loadingPreviews}
              setLoading={setLoadingPreviews}
            />
          </div>
        )}

        {visitedTabs.includes("Characters") && (
          <div className={selectedTab === "Characters" ? "block" : "hidden"}>
            <Characters
              animeId={animeId}
              characters={characterData}
              setCharacters={setCharacterData}
              loading={loadingCharacters}
              setLoading={setLoadingCharacters}
            />
          </div>
        )}

        {visitedTabs.includes("Music") && (
          <div className={selectedTab === "Music" ? "block" : "hidden"}>
            <MusicTab
              idMal={idMal}
              openings={openings}
              setOpenings={setOpenings}
              endings={endings}
              setEndings={setEndings}
            />
          </div>
        )}

        {visitedTabs.includes("Staff") && (
          <div className={selectedTab === "Staff" ? "block" : "hidden"}>
            <StaffTab
              animeId={animeId}
              staff={staffData}
              setStaff={setStaffData}
              loading={loadingStaff}
              setLoading={setLoadingStaff}
            />
          </div>
        )}

        {visitedTabs.includes("More Info") && (
          <div className={selectedTab === "More Info" ? "block" : "hidden"}>
            <MoreInfoTab
              animeId={animeId}
              moreInfo={moreInfoData}
              setMoreInfo={setMoreInfoData}
              loading={loadingMoreInfo}
              setLoading={setLoadingMoreInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
