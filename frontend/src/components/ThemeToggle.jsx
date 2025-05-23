// ThemeToggle.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../features/generals/generalSelector";
import { setTheme } from "../features/generals/generalSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const themeColor = useSelector(themeSelector);

  const handleToggle = () => {
    console.log("Hello");

    dispatch(setTheme());
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={themeColor === "dark"}
        onChange={handleToggle}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggle;
