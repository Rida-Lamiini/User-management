const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { createUserTable } = require("./models/userModel");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Créer la table des utilisateurs
createUserTable();

// Routes
app.use("/api", userRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${port}`);
});
