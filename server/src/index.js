// Import necessary libraries and modules
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Import routes for user authentication and recipes
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// Create an Express application instance
const app = express();

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define routes for user authentication and recipes
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Connect to the MongoDB database using Mongoose
mongoose.connect(
    "mongodb+srv://serefk:Mernapp25@recipes.8y0fhco.mongodb.net/recipes?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Start the Express server on port 3001
app.listen(3001, () => console.log("Server started"));
