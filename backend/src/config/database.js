const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error('MongoDB connection error: Missing MONGO_URI or MONGODB_URI environment variable');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
