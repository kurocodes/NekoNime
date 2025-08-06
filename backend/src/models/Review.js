const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    animeId: { type: String, required: true, index: true },
    tier: {
      type: String,
      enum: [
        "Trash",
        "Mid",
        "Decent",
        "Good",
        "Great",
        "Must Watch",
        "Peak",
        "Masterpiece",
        "GOAT",
      ],
      required: true,
    },
    votedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate ratings from the same user for same anime
reviewSchema.index({ userId: 1, animeId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
