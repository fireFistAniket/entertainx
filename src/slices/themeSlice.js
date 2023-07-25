import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  reducers: {
    getTheme: (state, action) => {
      console.log(state);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTheme } = themeSlice.actions;

export default themeSlice.reducer;
