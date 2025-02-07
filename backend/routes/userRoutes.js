const express = require("express");
const authenticateToken = require("../midleware/authenticateToken");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUserDetails,
  deleteUserById,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers); // Admin only
router.get("/users/:id", getUser); // Can be accessed by admin or user themselves
router.post("/users", addUser); // Admin only
router.put("/users/:id", updateUserDetails); // Admin or user themselves
router.delete("/users/:id", deleteUserById); // Admin only
router.post("/users/login", loginUser); // Login

module.exports = router;
