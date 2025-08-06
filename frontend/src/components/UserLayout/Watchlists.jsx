import "../../styles/scrollbar.css"
import { useMemo, useEffect, useState } from "react";
import { ListFilterSection } from "./ListFilterSection";
import { defaultListSections } from "../../utils/sections";
import { getDefaultListEntries } from "../../services/listService";

import ListEntryCard from "./ListEntryCard";
import ListEntryCardSkeleton from "../Loaders/ListEntryCardSkeleton";

export default function Watchlists() {
  const [selectedDefaulList, setSelectedDefaultList] = useState("completed");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [episodeFilter, setEpisodeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");
  const [genreFilter, setGenreFilter] = useState("all");

  const [removingIds, setRemovingIds] = useState([]);

  useEffect(() => {
    const fetchListEntries = async () => {
      setIsLoading(true);
      try {
        const res = await getDefaultListEntries(selectedDefaulList);
        setEntries(res.data.listEntries || []);
      } catch (err) {
        console.error("Failed to fetch list entries:", err);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListEntries();
  }, [selectedDefaulList]);

  // Handle removal of entries
  const handleRemove = (removeId, success) => {
    setRemovingIds((prev) => prev.filter((id) => id !== removeId));
    if (success) {
      setEntries((prev) => prev.filter((entry) => entry._id !== removeId));
    }
  };

  // Filter and sort entries based on user input
  const filteredEntries = useMemo(() => {
    return entries
      .filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((anime) =>
        formatFilter === "all" ? true : anime.format === formatFilter
      )
      .filter((anime) => {
        if (episodeFilter === "short") return anime.episodes <= 12;
        if (episodeFilter === "medium")
          return anime.episodes > 12 && anime.episodes <= 24;
        if (episodeFilter === "long") return anime.episodes > 24;
        return true;
      })
      .filter((anime) =>
        genreFilter === "all"
          ? true
          : anime.genres?.some((g) => g === genreFilter)
      )
      .sort((a, b) => {
        if (sortOrder === "az") return a.title.localeCompare(b.title);
        if (sortOrder === "za") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [
    entries,
    searchTerm,
    formatFilter,
    episodeFilter,
    sortOrder,
    genreFilter,
  ]);

  const uniqueFormats = [
    ...new Set(entries.map((e) => e.format).filter(Boolean)),
  ];

  return (
    <div className="relative flex flex-col lg:flex-row max-lg:w-full justify-center gap-2 lg:gap-4">
      {/* List Filter Section */}
      <ListFilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredEntries={filteredEntries}
        formatFilter={formatFilter}
        setFormatFilter={setFormatFilter}
        episodeFilter={episodeFilter}
        setEpisodeFilter={setEpisodeFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        uniqueFormats={uniqueFormats}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
      />

      {/* List Section */}
      <div className="relative flex flex-col items-center max-lg:w-full">
        {/* Default List Navigation */}
        <div className="fixed max-lg:sticky max-lg:top-[120px] max-lg:bg-white flex max-sm:justify-start max-sm:w-full max-lg:px-2 max-sm:overflow-x-auto scrollbar-hide gap-4 py-2">
          {defaultListSections.map(({ status, Icon }) => {
            const listKey = status
              .toLowerCase()
              .replace("plan to watch", "planToWatch");

            return (
              <button
                key={status}
                onClick={() => setSelectedDefaultList(listKey)}
                className={`group flex justify-between items-center text-white rounded-md border-b-3 border-transparent  px-4 py-2 cursor-pointer text-sm transition-all duration-200 ease-in-out ${
                  selectedDefaulList === listKey
                    ? "bg-primary"
                    : "bg-secondary hover:bg-transparent hover:text-secondary hover:border-secondary hover:rounded-none"
                }`}
              >
                <span className="flex items-center gap-2 max-sm:whitespace-nowrap">
                  <Icon className="text-lg" />
                  {status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Default Lists Entries */}
        <div className="mt-2 lg:mt-15 mb-5 max-sm:w-full w-xl">
          {isLoading ? (
            <div className="flex flex-col gap-2 px-2 w-full">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <ListEntryCardSkeleton key={idx} />
                ))}
            </div>
          ) : filteredEntries?.length === 0 ? (
            <p className="text-gray-500 px-2 w-full text-center">
              No anime found in {selectedDefaulList} list.
            </p>
          ) : (
            <div className="flex flex-col gap-2 px-2 w-full">
              {filteredEntries.map((anime) =>
                removingIds.includes(anime._id) ? (
                  <ListEntryCardSkeleton key={anime.animeId} />
                ) : (
                  <ListEntryCard
                    key={anime.animeId}
                    anime={anime}
                    onRemove={handleRemove}
                    setRemoving={() =>
                      setRemovingIds((prev) => [...prev, anime._id])
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
