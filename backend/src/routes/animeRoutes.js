const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(animeController.getAnime));
router.get(
  "/seasonTopRated",
  asyncHandler(animeController.getSeasonalTopRatedAnime)
);
// router.get("/tmdb-image", animeController.getAnimeBannerImage);
router.get("/trending", asyncHandler(animeController.getTrendingAnime));
router.get("/upcoming", asyncHandler(animeController.getUpcomingAnime));
router.get("/latest", asyncHandler(animeController.getLatestAnime));
router.get("/search", asyncHandler(animeController.searchAnime));
router.get("/:id", asyncHandler(animeController.getAnimeById));
router.get("/:id/characters", asyncHandler(animeController.getAnimeCharacters));
router.get("/:id/staff", asyncHandler(animeController.getAnimeStaff));
router.get("/:id/moreinfo", asyncHandler(animeController.getMoreInfo));

module.exports = router;
