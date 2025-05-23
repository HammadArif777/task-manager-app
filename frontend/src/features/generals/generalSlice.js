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
    theme: { fontColor: "#2a2a2a", themeColor: "whitesmoke" },
    renderStyle: "",
  },
  reducers: {
    setRenderStyle: (state, action) => {
      state.renderStyle = action.payload;
    },
    setRenderStyle: (state, action) => {
      state.renderStyle = action.payload;
    },
    setTheme: (state) => {
      state.theme.themeColor =
        state.theme.themeColor === "whitesmoke" ? "#2a2a2a" : "whitesmoke";
      state.theme.fontColor =
        state.theme.fontColor === "#2a2a2a" ? "whitesmoke" : "#2a2a2a";
    },
    setFilter: (state, action) => {
      // Merge new filter values into existing ones
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
  },
});

export const { setFilter, setRenderStyle, setTheme } = generalSlice.actions;
export default generalSlice.reducer;
