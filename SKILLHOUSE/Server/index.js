const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
// Load environment variables first
dotenv.config();

const app = express();

// Database connection
const database = require('./config/database');
database.connectDB();

// Middleware
const cookiesparser = require('cookie-parser');
const core = require('cors');
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookiesparser());
app.use(core({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Cloudinary connection
const {cloudinaryConnnect} = require('./config/cloudinary');
cloudinaryConnnect();

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes - Use ONLY ONE router per path
app.use('/api/v1/auth', require('./routes/user'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/payment', require('./routes/payment'));
app.use('/api/v1/course', require('./routes/Course'));

// Start server
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
