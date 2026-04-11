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

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MONGO_URI:", process.env.MONGO_URI);
});