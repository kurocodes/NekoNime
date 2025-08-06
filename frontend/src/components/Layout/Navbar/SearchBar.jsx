import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGeneralContext } from "../../../context/GeneralContext";
import { fetchSearchResults } from "../../../services/animeService";

import { FaSearch } from "react-icons/fa";

import DropDown from "./DropDown";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar() {
  const {
    search,
    setSearch,
    setSearchAnimeList,
    setDropDownOpen,
    setShowSideBar,
  } = useGeneralContext();

  const [searchResults, setSearchResults] = useState({
    list: [],
    pageInfo: {},
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Debounce: Wait for 300ms after typing stops
    const delayDebounce = setTimeout(async () => {
      if (search.trim().length > 0) {
        setLoading(true);
        try {
          const res = await fetchSearchResults(search);
          setSearchResults({
            list: res.data.animeList,
            pageInfo: res.data.pageInfo,
          });
        } catch (error) {
          console.log("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center rounded-full max-md:mb-2"
      ref={searchRef}
    >
      <div className="flex w-full md:w-auto">
        <DropDown setIsSearchOpen={setIsSearchOpen} />

        {/* Search Input Box */}
        <input
          type="search"
          placeholder="Search anime..."
          value={search}
          className="flex-1 min-w-0 text-secondary font-medium px-3 py-2 focus:outline-none border-y-2 border-[#429EA6] w-full sm:w-64 md:w-80"
          onChange={(e) => {
            setSearch(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => {
            setIsSearchOpen(true);
            setDropDownOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim().length > 0) {
              setIsSearchOpen(false);
              setSearchAnimeList(searchResults);
              navigate(`/search?q=${search}`);
            }
          }}
        />

        {/* Search Button */}
        <button
          onClick={() => {
            if (search.trim().length > 0) {
              setIsSearchOpen(false);
              setSearchAnimeList(searchResults);
              navigate(`/search?q=${search}`);
            }
            setShowSideBar(false);
          }}
          className="px-4 border-2 border-l-0 border-[#429EA6] rounded-e-full cursor-pointer hover:bg-primary text-primary hover:text-white transition"
        >
          <FaSearch />
        </button>
      </div>

      {/* Search Suggestions */}
      {isSearchOpen && (searchResults?.list?.length > 0 || loading) && (
        <SearchSuggestions
          search={search}
          searchResults={searchResults}
          loading={loading}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </div>
  );
}
