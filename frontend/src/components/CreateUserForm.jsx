import { useState } from "react";
import { createUser } from "../api/userApi";
import React from "react";

export function CreateUserForm({ showToast }) {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const data = await createUser(newUser);
    if ("error" in data) {
      showToast("Failed to create user: " + data.error, "error");
    } else {
      showToast("User created successfully!", "success");
      setNewUser({ name: "", email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleCreateUser} className="space-y-4">
      <div>
        <label
          htmlFor="create-name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="create-name"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label
          htmlFor="create-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="create-email"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label
          htmlFor="create-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="create-password"
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create User
      </button>
    </form>
  );
}
