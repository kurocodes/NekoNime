const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  list: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
  visibility: { type: String, enum: ["public", "private"], default: "private" },
});

module.exports = mongoose.model("CustomList", customListSchema);