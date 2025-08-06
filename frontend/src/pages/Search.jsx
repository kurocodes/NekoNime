import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../services/animeService";
import { useGeneralContext } from "../context/GeneralContext";

import AnimeList from "../components/Anime/AnimeList";

export default function Search() {
  const { searchAnimeList } = useGeneralContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [page, setPage] = useState(1);

  const [animeData, setAnimeData] = useState({
    list: [],
    pageInfo: {},
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to load anime based on search query and page
    const loadAnime = async () => {
      if (!searchQuery) {
        return navigate("/");
      }

      if (searchAnimeList?.list?.length > 0 && page === 1) {
        return;
      }

      setLoading(true);
      try {
        let res = await fetchSearchResults(searchQuery, page);
        setAnimeData({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [searchQuery, page]);

  return (
    <div className="mt-4">
      <AnimeList
        title={
          searchQuery && (
            <>
              SEARCH RESULT FOR{" "}
              <span className="text-primary max-xs:block">
                "{searchQuery.toUpperCase()}"
              </span>
            </>
          )
        }
        animeList={
          (animeData?.list?.length > 0 && animeData) ||
          (searchAnimeList?.list?.length > 0 && searchAnimeList)
        }
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
