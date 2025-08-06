const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeEntrySchema = new Schema({
  animeId: { type: String, required: true, unique: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("AnimeEntry", animeEntrySchema);