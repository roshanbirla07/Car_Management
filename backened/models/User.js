const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Define the Car schema
const carSchema = new mongoose.Schema({
  carId: {
    type: Number,
    unique: true,
    sparse:true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownerName: {
    type: String,
    required: true,
  },
  imageLinks: {
    type: [String], // Array of Cloudinary image URLs
    validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
  },
});

// Custom validator for the imageLinks array to limit it to 10 images
function arrayLimit(val) {
  return val.length <= 10;
}

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cars: {
    type: [carSchema],
    default: [],  // Set default to an empty array
  },
});

// Apply auto-increment to userId and carId fields
userSchema.plugin(AutoIncrement, { inc_field: "userId" });
carSchema.plugin(AutoIncrement, { inc_field: "carId" });

const User = mongoose.model("User", userSchema);
const Car = mongoose.model("Car", carSchema);

module.exports = { User, Car };
