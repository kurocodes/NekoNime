const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewStatsSchema = new Schema({
  animeId: { type: String, required: true, unique: true },
  stats: {
    Trash: { type: Number, default: 0 },
    Mid: { type: Number, default: 0 },
    Decent: { type: Number, default: 0 },
    Good: { type: Number, default: 0 },
    Great: { type: Number, default: 0 },
    "Must Watch": { type: Number, default: 0 },
    Peak: { type: Number, default: 0 },
    Masterpiece: { type: Number, default: 0 },
    GOAT: { type: Number, default: 0 },
  },
  totalVotes: { type: Number, default: 0 },
  // averageTierValue: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReviewStats", reviewStatsSchema);
