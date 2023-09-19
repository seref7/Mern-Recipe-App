# Mern-Recipe-App

This is a simple MERN (MongoDB, Express, React, Node.js) recipe app. It allows users to browse, save, and create recipes.


## Features

- Browse and view a list of recipes.
- Save your favorite recipes.
- Create and share your own recipes.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.


### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) set up and running.



### Installation

To run this project locally, you'll need to install the required dependencies for both the client and server sides. Run the following commands in the project root directory:


```bash
# Clone the repository
git clone https://github.com/yourusername/Mern-Recipe-App.git

# Navigate to the project directory
cd Mern-Recipe-App

```bash
# Install client-side dependencies
cd client
npm install react axios react-router-dom react-cookie

# Install server-side dependencies
cd ../server
npm install express mongoose bcrypt jsonwebtoken cors dotenv



# Create a .env file in the server directory and set your environment variables, including your MongoDB connection string.
# Example .env file:
# PORT=5000
# MONGODB_URI=your-mongodb-connection-string

# Start the server
cd ../server
npm start

# Start the client
cd ../client
npm start





   

