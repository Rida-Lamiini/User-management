import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../api/userApi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [userToUpdate, setUserToUpdate] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    isAdmin: 0, // Add isAdmin field
  });
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("create");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      if (data.error) {
        alert("Error fetching users: " + data.error);
      } else {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const data = await createUser(newUser);
    if (data.error) {
      alert("Error creating user: " + data.error);
    } else {
      alert("User created successfully!");
      setNewUser({ name: "", email: "", password: "" });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = await updateUser(userToUpdate.id, userToUpdate);
    console.log("Update Response:", data); // Debug response
    if (data.error) {
      alert("Error updating user: " + data.error);
    } else {
      alert("User updated successfully!");
      setIsUpdateModalOpen(false);
      setUserToUpdate({
        id: "",
        name: "",
        email: "",
        password: "",
        isAdmin: 0,
      });
    }
  };

  const handleDeleteUser = async (id) => {
    const data = await deleteUser(id);
    if (data.error) {
      alert("Error deleting user: " + data.error);
    } else {
      alert("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const openUpdateModal = (user) => {
    setUserToUpdate({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      isAdmin: user.isAdmin !== undefined ? user.isAdmin : false,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      <div className="flex mb-6">
        {["create", "list"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {activeTab === "create" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Create a New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create User
              </button>
            </form>
          </div>
        )}

        {activeTab === "list" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {user.name} - {user.email} {user.isAdmin ? "(Admin)" : ""}
                  </span>
                  <div>
                    <button
                      onClick={() => openUpdateModal(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal for updating user */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
                value={userToUpdate.name}
                onChange={(e) =>
                  setUserToUpdate({ ...userToUpdate, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
                value={userToUpdate.email}
                onChange={(e) =>
                  setUserToUpdate({ ...userToUpdate, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password (leave blank if unchanged)"
                className="w-full px-4 py-2 border rounded"
                value={userToUpdate.password}
                onChange={(e) =>
                  setUserToUpdate({ ...userToUpdate, password: e.target.value })
                }
              />
              {/* Admin Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={userToUpdate.isAdmin}
                  onChange={(e) =>
                    setUserToUpdate({
                      ...userToUpdate,
                      isAdmin: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700">Make Admin</label>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
