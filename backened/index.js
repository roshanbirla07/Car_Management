const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./config/dataBase.js");
const {cloudinaryConnect} = require("./config/cloudinary.js");


cloudinaryConnect();  // Connect to Cloudinary
db.connect();  // Connect to MongoDB


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

// File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/',
}));

// Import Routes
const userRoutes = require("./Routes/userRoutes");
const carRoutes = require("./Routes/carRoutes");

// Routes for users and cars
app.use('/user', userRoutes);
app.use('/car', carRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
