const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
} = require("../models/userModel");

// Get all regular users (non-admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID (admins can get any user, regular users can only get their own)
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = req.user; // Get authenticated user from middleware

  // if (user.id !== parseInt(id)) {
  //   return res.status(403).json({ error: "Access denied" });
  // }

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new user (admin only)
const addUser = async (req, res) => {
  const { name, email, password, isAdmin = 0 } = req.body;

  const user = req.user;
  // if (user.isAdmin !== 0) {
  //   return res.status(403).json({ error: "Admin access required" });
  // }

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (name, email, password) are required." });
  }

  try {
    const userId = await createUser(name, email, password, isAdmin);
    res.status(201).json({ id: userId, message: "User added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user details (admin or user can update their own details)
const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = req.user;

  // if (user.id !== parseInt(id) && user.isAdmin !== 1) {
  //   return res.status(403).json({ error: "Access denied" });
  // }

  try {
    const updatedUser = await updateUser(id, { name, email, password });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user (admin only)
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  // if (user.isAdmin !== 1) {
  //   return res.status(403).json({ error: "Admin access required" });
  // }

  try {
    const result = await deleteUser(id);
    if (!result) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    res.json({
      message: "Login successful",
      user: { ...user, isAdmin: user.isAdmin },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUserDetails,
  deleteUserById,
  loginUser,
};
