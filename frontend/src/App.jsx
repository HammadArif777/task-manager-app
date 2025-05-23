import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ImportantTask from "./pages/ImportantTask";

function App() {
  return (
    <div className="app-container">
      <Navbar /> {/* 👈 Navbar added at the top */}
      <div className="d-flex">
        <Sidebar />
        <div
          className="p-4 right-panel flex-grow-1"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/add-task" element={<AddTask />} />
            <Route path="/tasks/update-task/:id" element={<AddTask />} />
            <Route path="/tasks/important-task" element={<ImportantTask />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
