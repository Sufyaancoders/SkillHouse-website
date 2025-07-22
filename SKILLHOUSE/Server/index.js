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
const cors = require('cors');
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookiesparser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://skill-house-website.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For debugging - log rejected origins
    console.log('Rejected origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-HTTP-Method-Override'
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
  preflightContinue: false
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Cloudinary connection
const {cloudinaryConnnect} = require('./config/cloudinary');
cloudinaryConnnect();

// Handle preflight requests explicitly - MUST be before routes
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Manual CORS headers middleware (fallback)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://skill-house-website.vercel.app'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cache-Control,X-HTTP-Method-Override');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  next();
});

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
