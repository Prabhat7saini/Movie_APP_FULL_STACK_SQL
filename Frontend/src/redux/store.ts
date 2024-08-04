import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Correctly import default export
import movieReducer from "./slices/movieSlice"; // Assuming similar setup for movieSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;



