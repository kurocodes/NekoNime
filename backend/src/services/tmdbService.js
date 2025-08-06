const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function searchTMDBAnime(title) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
        include_adult: false,
      },
    });

    const results = response.data.results;
    if (!results || results.length === 0) return null;

    // console.log(
    //   "TMDB Results:",
    //   results.map((r) => ({ title: r.name, lang: r.original_language }))
    // );

    // 🍙 Filter results to prioritize Japanese original language (anime)
    const anime =
      results.find(
        (item) =>
          item.name.toLowerCase() === "one piece" &&
          item.original_language === "ja"
      ) || results[0]; // fallback

    return anime.backdrop_path
      ? `https://image.tmdb.org/t/p/original${anime.backdrop_path}`
      : null;
  } catch (err) {
    console.error("TMDB fetch error:", err.message);
    return null;
  }
}

module.exports = { searchTMDBAnime };
