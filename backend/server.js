const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const { notFound, errorHandler } = require('./middelware/errorMiddelware'); 
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');
const https=require("https")
const fs=require("fs")

require('dotenv').config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

 // Ensure correct directory reference
//app.use(express.static(path.join(__dirname, '/website-edirectory/build')));

// Routes
app.use('/api/user', userRoutes);

app.use('/api/restaurant', restaurantRoutes);

app.use('/api/recipe', recipeRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// The "catch-all" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'website-edirectory', 'build', 'index.html'));
// });

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Port Configuration
const PORT= process.env.PORT || 5003;

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

connectDB().then(()=>{
if (process.env.NODE_ENV === 'production') {
        const sslOPtions = {
           key: fs.readFileSync(process.env.SSL_KEY),
           cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
        }

        https.createServer(sslOPtions, app).listen(PORT, () => {
         console.log('HTTPS Server is ready 433')
        })
        } else {
        app.listen(PORT, () => {
        console.log('HTTP Server is ready')
})
}
})






