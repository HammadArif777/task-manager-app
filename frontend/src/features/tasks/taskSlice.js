import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASK_BY_ID,
  FETCH_TASKS,
  UPDATE_TASK,
} from "./taskConstants";

const BASE_URL = "http://localhost:3001/api/v1/tasks";

// Async thunks
export const fetchTasks = createAsyncThunk(FETCH_TASKS, async () => {
  const res = await axios.get(BASE_URL);
  return res.data.data;
});

export const createTask = createAsyncThunk(CREATE_TASK, async (task) => {
  const res = await axios.post(BASE_URL, task);
  return res.data.data;
});

export const deleteTask = createAsyncThunk(DELETE_TASK, async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const updateTask = createAsyncThunk(
  UPDATE_TASK,
  async ({ id, task }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, task);
    return res.data.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      })
      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});
export default taskSlice.reducer;
