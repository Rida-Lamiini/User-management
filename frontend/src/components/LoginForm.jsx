import { useState } from "react";
import { loginUser } from "../api/userApi";

export function LoginForm({ showToast }) {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const data = await loginUser(loginCredentials);
    if ("error" in data) {
      showToast("Login failed: " + data.error, "error");
    } else {
      showToast("Login successful!", "success");
      // You can store the user data or token in local storage, etc.
    }
  };

  return (
    <form onSubmit={handleLoginUser} className="space-y-4">
      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials({ ...loginCredentials, email: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Login
      </button>
    </form>
  );
}
