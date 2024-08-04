import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState, user } from "../../utils/interface/types";

// Define the initial state for the user slice
const initialState: authState = {
  currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : "",
};

// Create the user slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<user | null >) {
      state.currentUser = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  },
});

// Export actions
export const { setCurrentUser, setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
