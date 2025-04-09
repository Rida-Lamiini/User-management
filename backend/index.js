// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const {
  createUserTable,
  createUser,
  authenticateUser,
} = require("./models/userModel");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create users table
createUserTable();

// Insert admin if not exists
const insertInitialAdmin = async () => {
  try {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
    const user = await authenticateUser(adminEmail, adminPassword);
    if (!user) {
      await createUser("Admin", adminEmail, adminPassword, 1);
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Error inserting admin:", err.message);
  }
};

insertInitialAdmin();

// Routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
