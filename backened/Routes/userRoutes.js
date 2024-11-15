const express = require("express");
const router = express.Router();
const { loginUser , signupUser} = require("../controllers/userController");
const {auth} = require("../Middlewares/auth");  // Import auth middleware

// Login route
router.post('/login', loginUser);

router.post('/signup' , signupUser);

module.exports = router;
