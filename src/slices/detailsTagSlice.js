import { createSlice } from "@reduxjs/toolkit";

export const detailsQuerySlice = createSlice({
  name: "detailsQuery",
  initialState: {
    value: "",
  },
  reducers: {
    getQuery: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getQuery } = detailsQuerySlice.actions;

export default detailsQuerySlice.reducer;
