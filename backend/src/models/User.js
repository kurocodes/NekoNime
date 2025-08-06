const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    googleId: { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "images/default-avatar.png" },
    lastLogin: { type: Date },
    isDeleted: { type: Boolean, default: false },

    favorites: [
      {
        // like favorite anime, favorite romance anime, favorite horror anime etc.
        title: { type: String, required: true }, // romance anime, horror anime etc.
        anime: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
      },
    ],

    defaultLists: {
      watching: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
      completed: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
      planToWatch: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
      dropped: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
      onHold: [{ type: Schema.Types.ObjectId, ref: "AnimeListEntry" }],
    },

    customLists: [{ type: Schema.Types.ObjectId, ref: "CustomList" }],

    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error("❌ bcrypt.compare failed:", err); // only for debugging, remove in prod
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
