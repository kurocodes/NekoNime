const mongoose = require("mongoose");

const YoutubeCacheSchema = new mongoose.Schema(
  {
    query: { type: String, required: true, unique: true },
    videoId: { type: String, default: null }, // ✅ store youtube video id
    noResult: { type: Boolean, default: false }, // ✅ store if no result found
  },
  { timestamps: true }
);

module.exports = mongoose.model("YoutubeCache", YoutubeCacheSchema);
