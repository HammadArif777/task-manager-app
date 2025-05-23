// src/features/general/generalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "generals",
  initialState: {
    filter: {
      title: "",
      description: "",
      status: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      // Merge new filter values into existing ones
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
  },
});

export const { setFilter } = generalSlice.actions;
export default generalSlice.reducer;
