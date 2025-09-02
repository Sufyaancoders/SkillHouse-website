const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}
