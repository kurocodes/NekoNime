const Review = require("../models/Review");
const ReviewStats = require("../models/ReviewStats");

const reviewTiers = [
  "Trash",
  "Mid",
  "Decent",
  "Good",
  "Great",
  "Must Watch",
  "Peak",
  "Masterpiece",
  "GOAT",
];

// get the review of a user for an anime
exports.getAnimeReviewData = async (req, res) => {
  const { animeId } = req.body;
  const userId = req.user.id;

  if (!animeId || !userId)
    return res.status(400).json({ message: "Missing animeId or userId" });

  const review = await Review.findOne({ animeId, userId });
  const tier = review ? review.tier : null;

  const reviewStats = await ReviewStats.findOne({ animeId });
  const totalReviews = reviewStats ? reviewStats.totalVotes : 0;

  // In case stats don't exists yet
  const stats = reviewStats?.stats || {};
  const reviewData = reviewTiers.map((tier) => ({
    tier,
    count: stats[tier] || 0,
  }));

  return res.status(200).json({ tier, totalReviews, reviewData });
};

// Add if not exist, Update if already exist
exports.addOrUpdateReview = async (req, res, next) => {
  const { animeId, tier } = req.body;
  //   console.log(tier);
  const userId = req.user.id;

  if (!reviewTiers.includes(tier)) {
    return res.status(400).json({ message: "Invalid Review tier" });
  }

  // Fetch existing review
  const existingReview = await Review.findOne({ animeId, userId });

  // Fetch or create review stats
  let reviewStats = await ReviewStats.findOne({ animeId });
  if (!reviewStats) {
    reviewStats = new ReviewStats({ animeId });
  }

  //   If the user has reviewed before, update
  if (existingReview) {
    const oldTier = existingReview.tier;

    // Only update stats if user changed thier tier
    if (oldTier !== tier) {
      reviewStats.stats[oldTier] = Math.max(
        0,
        (reviewStats.stats[oldTier] || 0) - 1
      );
      reviewStats.stats[tier] = (reviewStats.stats[tier] || 0) + 1;
      reviewStats.lastUpdated = new Date();
      await reviewStats.save();

      existingReview.tier = tier;
      await existingReview.save();
    }

    return res
      .status(200)
      .json({ message: "Rating updated", review: existingReview });
  }

  // Otherwise, create a new review
  const newReview = await Review.create({ animeId, userId, tier });
  reviewStats.stats[tier] = (reviewStats.stats[tier] || 0) + 1;
  reviewStats.totalVotes += 1;
  reviewStats.lastUpdated = new Date();
  await reviewStats.save();

  return res.status(201).json({ message: "Review added", review: newReview });
};
