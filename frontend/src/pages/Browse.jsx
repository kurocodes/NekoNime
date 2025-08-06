import { useEffect, useState } from "react";
import { fetchAnime } from "../services/animeService";
import { useNavigate, useSearchParams } from "react-router-dom";

import AnimeList from "../components/Anime/AnimeList";

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre");
  const [page, setPage] = useState(1);

  const [animeData, setAnimeData] = useState({
    list: [],
    pageInfo: {},
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to load anime based on genre and page
    const loadAnime = async () => {
      if (!genre) {
        return navigate("/");
      }

      setLoading(true);
      try {
        let res = await fetchAnime(genre, page);
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
  }, [genre, page]);

  return (
    <div className="mt-4">
    <AnimeList
      title={genre && `${genre.toUpperCase()} ANIME`}
      animeList={animeData}
      loading={loading}
      page={page}
      setPage={setPage}
      isUrlPagination={true}
    />
    </div>
  );
}
