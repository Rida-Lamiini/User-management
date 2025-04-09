require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const db = require("./config/db").promise();

app.use(cors());
app.use(bodyParser.json());

// Auto-create users table if it doesn't exist
const initializeDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `);
    console.log("✅ Users table is ready.");
  } catch (error) {
    console.error("❌ Failed to initialize DB:", error.message);
    process.exit(1);
  }
};

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initializeDB();
});
