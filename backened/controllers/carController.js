const { User, Car } = require("../models/User");

// Get all cars for a specific user
const getCars = async (req, res) => {
  console.log('Authenticated user:', req.user);  // Check if user data is attached
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user.cars);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
  }
};

// const getCarById = async (req, res) => {
//   console.log('Authenticated user:', req.user);  // Check if user data is attached
//   const carId = req.params;
//   try {
//     const user = await User.findById(carId);
//     if (user) {
//       res.status(200).json(user.cars);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching cars", error });
//   }
// };


// Delete a car by carId (using _id of the car)
const deleteCar = async (req, res) => {
  const { userId, carId } = req.params; // carId is the _id of the car
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cars: { _id: carId } } }, // Remove the car using _id (car's internal MongoDB _id)
      { new: true }
    );
    if (user) {
      res
        .status(200)
        .json({ message: "Car deleted successfully", cars: user.cars });
    } else {
      res.status(404).json({ message: "User or car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error });
  }
};

// Update car details by carId (using _id of the car)
const updateCar = async (req, res) => {
  const { userId, carId } = req.params; // carId is the _id of the car
  const carDetails = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "cars._id": carId }, // Query by car's _id
      { $set: { "cars.$": carDetails } }, // Update the specific car
      { new: true }
    );
    if (user) {
      res
        .status(200)
        .json({ message: "Car updated successfully", cars: user.cars });
    } else {
      res.status(404).json({ message: "User or car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
};

const addCar = async (req, res) => {
  const userId = req.user._id; // Get userId from the authenticated user
  const carDetails = req.body; // Car details from request body
  try {
    // Find the user by ID and push the new car to the cars array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { cars: carDetails } }, // Add new car to the user's cars array
      { new: true } // Return the updated user document
    );
    if (user) {
      res.status(201).json({ message: "Car added successfully", cars: user.cars });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error });
  }
};

module.exports = { getCars, deleteCar, updateCar , addCar};
