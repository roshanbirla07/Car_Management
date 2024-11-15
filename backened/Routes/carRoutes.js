const express = require("express");
const router = express.Router();
const { getCars, deleteCar, updateCar, addCar } = require("../controllers/carController");
const { auth } = require("../Middlewares/auth");  // Import auth middleware

// Get all cars for an authenticated user
router.get('/user', auth, getCars);
//router.get('/user',auth,getById);

// Add a new car for an authenticated user
router.post('/user/car', auth, addCar);

// Delete a car by carId for an authenticated user
router.delete('/user/:carId', auth, deleteCar);

// Update car details by carId for an authenticated user
router.put('/user/:carId', auth, updateCar);

module.exports = router;
