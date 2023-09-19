// Import necessary libraries and modules
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

// Create a router instance
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
    // Check if the user already exists in the database
    const user = await UserModel.findOne({ username });

    if (user) {
        // If the user already exists, return a message
        return res.json({ message: "User already exists" });
    }

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    // Send a success message upon user registration
    res.json({ message: "User registered successfully" });
});

// Login a user
router.post("/login", async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
    // Find the user in the database based on the provided username
    const user = await UserModel.findOne({ username });

    if (!user) {
        // If the user doesn't exist, return a message
        return res.json({ message: "User Doesn't Exist" });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        // If the password is incorrect, return a message
        return res.json({ message: "Username or password is incorrect" });
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ id: user._id }, "secret");
    // Send the JWT and user ID as a response upon successful login
    res.json({ token, userID: user._id });
});

// Export the router for use in other parts of the application
export { router as userRouter };

// Middleware function to verify the JWT token for protected routes
export const verifyToken = (req, res, next) => {
    // Extract the token from the request's headers
    const token = req.headers.authorization;
    if (token) {
        // Verify the token using the "secret" key
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403); // Forbidden if token is invalid
            next(); // Continue to the next middleware if token is valid
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token is provided
    }
};
