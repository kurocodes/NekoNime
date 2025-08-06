require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToMongoDB = require("./src/config/db");
const animeRoutes = require("./src/routes/animeRoutes");
const youtubeRoutes = require("./src/routes/youtubeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const listRoutes = require("./src/routes/listRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/", youtubeRoutes);
app.use("/anime", animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/comment", commentRoutes)

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectToMongoDB();
});
