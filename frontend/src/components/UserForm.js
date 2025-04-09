import React, { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";

const UserForm = ({ editingUser, setEditingUser, fetchUsers }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingUser) {
      setFormData({ name: editingUser.name, email: editingUser.email });
    } else {
      setFormData({ name: "", email: "" });
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        toast.success("✅ User updated successfully");
      } else {
        await api.post("/users", formData);
        toast.success("🎉 User created successfully");
      }
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong 🚫");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {editingUser ? "✏️ Edit User" : "➕ Add New User"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingUser ? "Update" : "Submit"}
          </button>
          {editingUser && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
