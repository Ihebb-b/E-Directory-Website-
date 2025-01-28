const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const { notFound, errorHandler } = require('./middelware/errorMiddelware'); // Correct spelling
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Connect Database
connectDB();

// Routes
app.use('/api/user', userRoutes);

app.use('/api/restaurant', restaurantRoutes);

app.use('/api/recipe', recipeRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} ✔`);
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});
