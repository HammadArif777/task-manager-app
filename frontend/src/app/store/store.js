import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../features/tasks/taskSlice";
import generalReducer from "../../features/generals/generalSlice";
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    generals: generalReducer,
  },
});
