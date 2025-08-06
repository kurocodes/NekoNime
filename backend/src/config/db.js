const mongoose = require("mongoose");

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error: ", error);
    setTimeout(connectToMongoDB, 5000); // Retry after 5s
  }
};

module.exports = connectToMongoDB;
