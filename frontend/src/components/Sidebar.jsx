// src/components/Sidebar.js
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscListSelection } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiHeart } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { items } from "../features/tasks/taskSelectors";
const Sidebar = () => {
  const allTasks = useSelector(items) ?? 0;
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 vh-100 sidebar">
      <ul className="nav flex-column mb-auto gap-1">
        <li className="nav-item">
          <NavLink
            to="/tasks/add-task"
            className="nav-link"
            activeclassname="active"
          >
            <div className="d-flex align-items-center gap-1">
              <IoIosAddCircleOutline />
              <span>Add Task</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className="nav-link ">
            <div className="d-flex align-items-center gap-1">
              <VscListSelection />
              <div>
                Tasks{" "}
                <span
                  className="badge"
                  style={{ backgroundColor: "#B95CF4", color: "white" }}
                >
                  {allTasks.length}
                </span>
              </div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks/important-task" className="nav-link ">
            <div className="d-flex align-items-center gap-1">
              <TfiHeart />
              <span>Important Tasks</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
