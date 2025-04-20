const express = require('express');
const app= express();


const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const paymentRoute = require('./routes/paymentRoute');
const courseRoute = require('./routes/courseRoute');


const  database = require('./config/database');
const  cookiesparser = require('cookie-parser');    

const core = require('cors');
const {cloudinaryConnnect} = require('./config/cloudinary');
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 4000;

//database connection
database.connectDB();
 //middleware
app.use(express.json());
app.use(cookiesparser());
app.use(core({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));
 //cloudinary connection
cloudinaryConnnect();

//routes
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/course', courseRoute);

//def route
app.get('/', (req, res) => {

    res.send('Server is running');
});
//server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
