// db.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports.init = () => {
  // Replace 'your_mongodb_uri' with your actual MongoDB connection string
  const MONGODB_URI = process.env.MONGODB_URI;

  // Connect to MongoDB
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  // Handle MongoDB connection events
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  db.once("open", () => {
    console.log("Connected to MongoDB!");
  });
};
