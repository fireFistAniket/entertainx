import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice.js";
import detailsQueryReducer from "./slices/detailsTagSlice.js";
import themeReducer from "./slices/themeSlice.js";

export default configureStore({
  reducer: {
    search: searchReducer,
    detailsQuery: detailsQueryReducer,
    theme: themeReducer,
  },
});
