import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ImportantTask from "./pages/ImportantTask";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { BsCardList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setRenderStyle } from "./features/generals/generalSlice";
import { themeSelector } from "./features/generals/generalSelector";

function App() {
  const dispatch = useDispatch();
  const { fontColor, themeColor } = useSelector(themeSelector);
  console.log("🚀 ~ App ~ themeColor:", themeColor);
  console.log("🚀 ~ App ~ fontColor:", fontColor);
  return (
    <div
      className="app-container"
      style={{ backgroundColor: themeColor, color: fontColor }}
    >
      <Navbar /> {/* 👈 Navbar added at the top */}
      <div className="d-flex">
        <Sidebar />
        <div
          className="p-4 right-panel flex-grow-1"
          style={{
            backgroundColor: themeColor,
            color: fontColor,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div className="d-flex gap-2">
            <span>Layout View</span>
            <span
              role="button"
              onClick={() => dispatch(setRenderStyle("column"))}
            >
              <HiOutlineViewColumns size={20} />
            </span>
            <span
              role="button"
              onClick={() => dispatch(setRenderStyle("list"))}
            >
              <BsCardList size={20} />
            </span>
          </div>
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
