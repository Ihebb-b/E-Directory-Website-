const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
      }catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
    }    
module.exports = connectDB;
