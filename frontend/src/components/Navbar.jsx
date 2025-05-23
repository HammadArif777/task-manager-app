import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import Select from "react-select";
import { TASK_STATUS } from "../constants/general.constant";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/generals/generalSlice";
import { filterSelector } from "../features/generals/generalSelector";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const dispatch = useDispatch();
  const { title, description, status } = useSelector(filterSelector);
  const handleStatusChange = (e) => {
    dispatch(
      setFilter({
        status: e.value,
      })
    );
  };
  return (
    <nav
      style={{ backgroundColor: "#b95cf4" }}
      className="navbar navbar-dark px-3 py-2 shadow-sm"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold">
          just Do It
        </Link>
        <div className="d-flex">
          <input
            type="text"
            className="me-2 form-control"
            placeholder="Search title"
            onChange={(e) => {
              dispatch(setFilter({ title: e.target.value }));
            }}
          />
          <input
            type="text"
            className="me-2 form-control"
            placeholder="Search description"
            onChange={(e) => {
              dispatch(setFilter({ description: e.target.value }));
            }}
          />
          <Select
            options={TASK_STATUS}
            value={TASK_STATUS.find((option) => option.value === status)}
            onChange={handleStatusChange}
            className="form-control"
          />
        </div>

        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
