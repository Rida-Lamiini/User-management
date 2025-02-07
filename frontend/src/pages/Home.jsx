import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserManagement from "../components/UserManagement";
import Login from "../components/Login";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginSuccessful) => {
    if (loginSuccessful) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Router>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          User Management Dashboard
        </h1>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/user-management"
            element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </Router>
  );
}
