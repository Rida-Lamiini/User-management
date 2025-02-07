import { useState } from "react";
import { updateUser } from "./../api/userApi";

export function UpdateUserForm({ showToast }) {
  const [userToUpdate, setUserToUpdate] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = await updateUser(userToUpdate.id, userToUpdate);
    if ("error" in data) {
      showToast("Failed to update user: " + data.error, "error");
    } else {
      showToast("User updated successfully!", "success");
      setUserToUpdate({ id: "", name: "", email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleUpdateUser} className="space-y-4">
      <div>
        <label
          htmlFor="update-id"
          className="block text-sm font-medium text-gray-700"
        >
          User ID
        </label>
        <input
          id="update-id"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={userToUpdate.id}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, id: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label
          htmlFor="update-name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="update-name"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={userToUpdate.name}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, name: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="update-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="update-email"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={userToUpdate.email}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, email: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="update-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="update-password"
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={userToUpdate.password}
          onChange={(e) =>
            setUserToUpdate({ ...userToUpdate, password: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      >
        Update User
      </button>
    </form>
  );
}
