const jwt = require("jsonwebtoken");  // Import jwt package
const bcrypt = require("bcrypt");  // Import bcrypt for password hashing
require("dotenv").config();  // Access JWT_SECRET from environment variables
const { User, Car } = require("../models/User");

// Login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        console.log(username + " " + password);
        const user = await User.findOne({ username });

        if (user) {
            console.log('User found:', user);

            // Compare entered password with stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid);

            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign(
                    { userId: user._id, username: user.username },  // Payload: user ID and username
                    process.env.JWT_SECRET,  // Secret key from environment variables
                    { expiresIn: '1h' }  // Token expiration time
                );

                // Set the token as an HTTP-only cookie (secure flag can be added in production)
                res.cookie('authToken', token, {
                    httpOnly: true,  // Makes the cookie inaccessible to JavaScript
                    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
                    maxAge: 3600 * 1000  // 1 hour expiration (in milliseconds)
                });

                // Send response with user data (no token in response body since it's in cookie)
                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                console.log('Password mismatch');
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            console.log('User not found');
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};



// Signup user
const signupUser = async (req, res) => {
    const { username, password, email, cars } = req.body;

    // Basic validation
    const new_car1= new Car();
    new_car1.title="honda";
    new_car1.ownerName="shssk";
    new_car1.imageLinks.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM5CypWgKD9b-7rg0bGdPxhVIEfAoCcZ2tXA&s")
    
    cars.push(new_car1)
    // Basic validation
    const new_car2= new Car();
    new_car2.title="honda";
    new_car2.ownerName="shssk";
    new_car2.imageLinks.push("https://cars.usnews.com/pics/size/390x290/images/Auto/custom/14570/2021_Genesis_G90_1.jpg")

    cars.push(new_car2);

    // Basic validation
    const new_car3= new Car();
    new_car3.title="honda";
    new_car3.ownerName="shssk";
    new_car3.imageLinks.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrMD1wSoGCZwhCdbTyoXXMLWVGg-wHbt9GfQ&s")
    
    cars.push(new_car3)
    // Basic validation
    const new_car4= new Car();
    new_car4.title="honda";
    new_car4.ownerName="shssk";
    new_car4.imageLinks.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQY9RaGIGtMbJE1VePWT9v5h1pDGySLvAnA&s")


    cars.push(new_car4);

    // Basic validation
    const new_car5= new Car();
    new_car5.title="honda";
    new_car5.ownerName="shssk";
    new_car5.imageLinks.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v2QRFMj1rstjsDfpEZH2sYtwZ_sy_BTdbQ&s")
    
    cars.push(new_car5)


    if (!username || !password || !email) {
        return res.status(400).json({ message: "Please provide username, password, and email" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Only assign cars if the array is not empty
        const processedCars = cars && cars.length > 0 ? cars : [];

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            cars: processedCars,
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Error signing up", error });
    }
};


module.exports = { loginUser, signupUser };
