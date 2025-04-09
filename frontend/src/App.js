import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <UserList />
    </div>
  );
}

export default App;
