import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userID: "", username: "", isLoggedIn: false, error: null },
  reducers: {
    login(state, action) {
      state.userID = action.payload.userID;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.username = "";
      state.isLoggedIn = false;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
