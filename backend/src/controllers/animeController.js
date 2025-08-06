const axios = require("axios");
const {
  animeGenreQuery,
  animeQuery,
  trendingAnimeQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
  animeDetailsQuery,
  animeCharacterQuery,
  animeStaffQuery,
  animeMoreInfoQuery,
  seasonalTopRatedAnimeQuery,
} = require("../utils/query");
const { getNextSeasonAndYear, retryUntilSuccess } = require("../utils/helper");
const { getCache, setCache } = require("../services/cacheService");
const { searchTMDBAnime } = require("../services/tmdbService");
const { createError } = require("../utils/createError");

const API_URL = process.env.API_URL;
const { season, seasonNext, year } = getNextSeasonAndYear();

const postRequest = async (query) => {
  try {
    const response = await axios.post(API_URL, query, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    // Log full Axios error info
    if (process.env.NODE_ENV !== "production") {
      console.error("❌ Axios POST Request Failed:");
      console.error("➡️ URL:", API_URL);
      console.error("📦 Query Variables:", query?.variables);
      console.error("⚠️ Error Code:", error.code);
      console.error("🧾 Status:", error?.response?.status);
      console.error("📨 Response Data:", error?.response?.data);
      console.error("🌐 Axios Config URL:", error?.config?.url);
      console.error("⏱ Timeout:", error?.config?.timeout);
      // console.error("💀 Raw Error:", error);
    }

    // Forward minimal error to middleware
    const message =
      error?.response?.data?.message || error.message || "External API failure";
    const status = error?.response?.status || 503;
    const err = new Error(message);
    err.status = status;
    throw err;
  }
};

// Get anime from all genre or a single genre
exports.getAnime = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const genre = req.query.genre;
  const query = genre
    ? { ...animeGenreQuery, variables: { genre, page } }
    : animeQuery;

  const response = await postRequest(query);
  const pageData = response.data.data.Page;
  const animeList = pageData.media;
  const pageInfo = pageData.pageInfo;

  res.json({
    animeList,
    pageInfo,
  });
};

// Get spotlight anime
exports.getSeasonalTopRatedAnime = async (req, res) => {
  const cacheKey = `season-top-rated`;

  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  const response = await postRequest(seasonalTopRatedAnimeQuery);
  const animeList = response.data.data.Page.media;

  // Enrich each anime with banner from TMDB
  const enrichedAnimeList = await Promise.all(
    animeList.map(async (anime) => {
      const title = anime.title.english || anime.title.romaji; // Prefer English title if available

      const bannerImage = await retryUntilSuccess(() => searchTMDBAnime(title));

      return {
        ...anime,
        bannerImage: bannerImage, // add TMDB banner
      };
    })
  );

  // Cache the enriched list
  setCache(cacheKey, enrichedAnimeList, 3 * 60 * 60 * 1000);

  res.json(enrichedAnimeList);
};

// Get trending anime
exports.getTrendingAnime = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `trending-${page}`;

  if (page === 1) {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);
  }

  process.env.NODE_ENV !== "production" &&
    console.log("[getTrendingAnime] Requesting trending anime page:", page);

  trendingAnimeQuery.variables.page = page;
  const response = await postRequest(trendingAnimeQuery);
  const pageData = response.data.data.Page;
  const animeList = pageData.media;
  const pageInfo = pageData.pageInfo;

  if (page === 1)
    setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

  res.json({
    animeList,
    pageInfo,
  });
};

// Get upcoming anime
exports.getUpcomingAnime = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `upcoming-${page}`;

  if (page === 1) {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);
  }

  process.env.NODE_ENV !== "production" &&
    console.log("[getUpcomingAnime] Requesting upcoming anime page:", page);

  upcomingAnimeQuery.variables = { season, seasonYear: year, page };
  const response = await postRequest(upcomingAnimeQuery);
  const pageData = response.data.data.Page;
  const animeList = pageData.media;
  const pageInfo = pageData.pageInfo;

  if (page === 1)
    setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

  res.json({
    animeList,
    pageInfo,
  });
};

// Get latest anime
exports.getLatestAnime = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `latest-${page}`;

  if (page === 1) {
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);
  }

  process.env.NODE_ENV !== "production" &&
    console.log("[getLatestAnime] Requesting latest anime page:", page);

  latestAnimeQuery.variables.page = page;
  const response = await postRequest(latestAnimeQuery);
  const pageData = response.data.data.Page;
  const animeList = pageData.media.filter(
    (a) => a.startDate?.year && a.startDate?.month && a.startDate.day
  );
  const pageInfo = pageData.pageInfo;

  if (page === 1)
    setCache(cacheKey, { animeList, pageInfo }, 3 * 60 * 60 * 1000);

  res.json({
    animeList,
    pageInfo,
  });
};

// Search anime
exports.searchAnime = async (req, res, next) => {
  const search = req.query.q;
  const page = parseInt(req.query.page) || 1;

  if (!search) return next(createError("Missing search query"));

  animeSearchQuery.variables.search = search;
  animeSearchQuery.variables.page = page;
  const response = await postRequest(animeSearchQuery);
  const pageData = response.data.data.Page;
  const animeList = pageData.media;
  const pageInfo = pageData.pageInfo;

  res.json({
    animeList,
    pageInfo,
  });
};

// Get anime details
exports.getAnimeById = async (req, res) => {
  animeDetailsQuery.variables.id = parseInt(req.params.id);
  const response = await postRequest(animeDetailsQuery);
  const media = response.data.data.Media;

  // Filter relations: keep only related anime
  if (media.relations?.edges) {
    media.relations.edges = media.relations.edges.filter(
      (edge) => edge.node.type === "ANIME"
    );
  }

  if (media.recommendations?.edges) {
    media.recommendations.edges = media.recommendations.edges.filter(
      (rec) => rec.node.mediaRecommendation
    );
  }

  media.bannerImageTMDB =
    !media.bannerImage &&
    (await searchTMDBAnime(media.title.english || media.title.romaji));

  res.json(media);
};

// Get anime characters
exports.getAnimeCharacters = async (req, res) => {
  animeCharacterQuery.variables.id = parseInt(req.params.id);
  animeCharacterQuery.variables.page = parseInt(req.query.page) || 1;

  const response = await postRequest(animeCharacterQuery);

  const pageInfo = response.data.data.Media.characters.pageInfo;
  const characters = response.data.data.Media.characters.edges.map((edge) => ({
    role: edge.role,
    character: edge.node,
    voiceActors: {
      japanese: edge?.voiceActors?.filter((va) => va.language === "JAPANESE"),
      english: edge.voiceActors?.filter((va) => va.language === "ENGLISH"),
    },
  }));

  res.json({ characters, pageInfo });
};

// Get anime staff
exports.getAnimeStaff = async (req, res) => {
  animeStaffQuery.variables.page = parseInt(req.query.page) || 1;

  animeStaffQuery.variables.id = parseInt(req.params.id);
  const response = await postRequest(animeStaffQuery);

  const pageInfo = response.data.data.Media.staff.pageInfo;
  const staff = response.data.data.Media.staff.edges.map((edge) => ({
    role: edge.role,
    staff: edge.node,
  }));
  res.json({ staff, pageInfo });
};

// Get anime more info
exports.getMoreInfo = async (req, res) => {
  animeMoreInfoQuery.variables.id = parseInt(req.params.id);
  const response = await postRequest(animeMoreInfoQuery);
  res.json(response.data.data.Media);
};
