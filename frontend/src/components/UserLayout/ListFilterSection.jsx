import { animeGenres } from "../../utils/genres";
import { useListContext } from "../../context/listContext";

import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export function ListFilterSection({
  searchTerm,
  setSearchTerm,
  filteredEntries,
  formatFilter,
  setFormatFilter,
  uniqueFormats,
  episodeFilter,
  setEpisodeFilter,
  sortOrder,
  setSortOrder,
  genreFilter,
  setGenreFilter,
}) {
  const { showCreateListContainer, setShowCreateListContainer } =
    useListContext();

  return (
    <>
      {/* List Filters and Stats */}
      <div className="sticky lg:top-[132px] h-fit flex flex-col gap-2 mt-2 max-lg:mx-4">
        {/* Search Anime by name */}
        <div className="flex items-center justify-between rounded-full border-2 border-secondary/20">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="grow outline-0 ps-4"
          />
          <span className="p-3">
            <FaSearch className="text-secondary" />
          </span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-2">
          {/* Total anime count in list */}
          <div className="px-4 py-2 border-2 border-secondary/20 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-lg text-primary">Total Anime</span>{" "}
              <FaArrowRightLong className="text-primary" />{" "}
              <span className="px-3 py-1 text-white bg-primary rounded-full">
                {filteredEntries.length}
              </span>
            </div>
          </div>

          {/* Create New Custom List Button */}
          <button
            className="group flex items-center justify-center gap-2 text-primary text-md py-2 rounded-md border-2 border-primary cursor-pointer hover:bg-primary hover:text-white transition duration-200"
            onClick={() => setShowCreateListContainer(!showCreateListContainer)}
          >
            <GoPlus className="text-2xl" /> <span>Create List</span>
          </button>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 border-2 border-secondary/20 rounded-md">
          <div className="mt-2 grid grid-cols-2 lg:grid-cols-1 gap-2">
            {/* Format filter */}
            <div>
              <div className="text-secondary font-semibold text-lg">Format</div>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
              >
                <option value="all">All Formats</option>
                {uniqueFormats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Episode count filter */}
            <div>
              <div className="text-secondary font-semibold text-lg">
                Episodes
              </div>
              <select
                value={episodeFilter}
                onChange={(e) => setEpisodeFilter(e.target.value)}
                className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
              >
                <option value="all">All Episodes</option>
                <option value="short">≤ 12</option>
                <option value="medium">13–24</option>
                <option value="long"> 24</option>
              </select>
            </div>

            {/* Genre filter */}
            <div>
              <div className="text-secondary font-semibold text-lg">Genre</div>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
              >
                <option value="all">All Genre</option>
                {animeGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <div className="text-secondary font-semibold text-lg">Sort</div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
              >
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
