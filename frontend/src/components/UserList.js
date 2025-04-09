import React, { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("❌ Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("🗑️ User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("❌ Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      <UserForm
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        fetchUsers={fetchUsers}
      />
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
