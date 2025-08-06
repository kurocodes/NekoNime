const express = require("express");
const router = express.Router();
const { searchYoutube } = require("../controllers/youtubeController");

router.get("/youtube-search", searchYoutube);

module.exports = router;