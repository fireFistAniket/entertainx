import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: {
      fstParam: "",
      sndParam: "",
    },
  },
  reducers: {
    getParams: (state, action) => {
      state.value.fstParam = action.payload.fstParam;
      state.value.sndParam = action.payload.sndParam;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getParams } = searchSlice.actions;

export default searchSlice.reducer;
