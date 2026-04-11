const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");


dotenv.config();

const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const snippetRoutes = require('./src/routes/snippets');

const app = express();
app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/ai", require("./src/routes/ai"));

app.get('/', (req, res) => {
  res.send('Demo server is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/snippets', snippetRoutes);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      error: { message: messages.join(', '), code: 'VALIDATION_ERROR' }
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      error: { message: 'Duplicate entry', code: 'DUPLICATE_ERROR' }
    });
  }
  
  // Custom error with status
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      error: { message: error.message, code: error.code || 'CUSTOM_ERROR' }
    });
  }
  
  // Default server error
  res.status(500).json({
    success: false,
    error: { message: 'Internal server error', code: 'SERVER_ERROR' }
  });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MONGO_URI:", process.env.MONGO_URI);
});