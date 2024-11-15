const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.authToken;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Verify the token using the secret from the environment variables
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information from the payload to req.user
    req.user = { _id: payload.userId };

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "JsonWebTokenError"
          ? "Invalid Token"
          : "Token Verification Error",
    });
  }
};
