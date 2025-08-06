const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const verifyToken = require("../middlewares/verifyToken");
const reviewController = require("../controllers/reviewController");

router.post(
  "/add-update",
  verifyToken,
  asyncHandler(reviewController.addOrUpdateReview)
);
router.post(
  "/data",
  verifyToken,
  asyncHandler(reviewController.getAnimeReviewData)
);

module.exports = router;
