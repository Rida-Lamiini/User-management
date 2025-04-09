const db = require("../config/db");

// Create Users Table
const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin TINYINT DEFAULT 0
    )
  `;
  db.query(sql, (err) => {
    if (err) console.error("Error creating users table:", err.message);
    else console.log("Users table ensured.");
  });
};

// Create User
const createUser = (name, email, password, isAdmin = 0) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, password, isAdmin],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// Get All Non-Admin Users
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE isAdmin = 0", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Get User by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// Update User
const updateUser = (id, { name, email, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
      (err, result) => {
        if (err) reject(err);
        else
          resolve(
            result.affectedRows > 0 ? { id, name, email, password } : null
          );
      }
    );
  });
};

// Delete User
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows > 0);
    });
  });
};

// Authenticate User
const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
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
