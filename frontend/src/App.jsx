// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <div
      className="app-container"
      style={{ display: "flex", height: "100vh", gap: "1rem" }}
    >
      <Sidebar />
      <div
        className="p-4 right-panel"
        style={{ height: "100%", overflowY: "auto" }}
      >
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/add-task" element={<AddTask />} />
          <Route path="/tasks/update-task/:id" element={<AddTask />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
