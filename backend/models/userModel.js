const db = require("../config/db");

const createUserTable = () => {
  db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        isAdmin INTEGER DEFAULT 0  -- Add isAdmin column with a default value of 0 (regular user)
      )
    `);
};

// Create user with optional isAdmin flag
const createUser = (name, email, password, isAdmin = 0) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, password, isAdmin],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

// Get all regular users (non-admin)
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM users WHERE isAdmin = 0", // Exclude admin users
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// Get user by ID (handles both admin and regular users)
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Update user information (handles both admin and regular users)
const updateUser = (id, { name, email, password }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0 ? { id, name, email, password } : null);
      }
    );
  });
};

// Delete user (admins only can delete users)
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
};

// Authenticate user (login) and check for admin status
const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, row) => {
        if (err) reject(err);
        else resolve(row); // row will now include isAdmin
      }
    );
  });
};

module.exports = {
  createUserTable,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
};
