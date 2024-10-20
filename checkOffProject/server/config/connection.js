require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
  

module.exports = connectDB;
