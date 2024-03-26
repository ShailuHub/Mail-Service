import { createSlice } from "@reduxjs/toolkit";

const { token } = JSON.parse(localStorage.getItem("user")) || "";

const initialState = {
  isLoggedIn: !!token,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    signIn(state, action) {
      const { token, username, email } = action.payload;
      const user = { token, username, email };
      localStorage.setItem("user", JSON.stringify(user));
      state.isLoggedIn = true;
      setTimeout(() => {
        localStorage.removeItem("user");
      }, 60000);
    },
    signOut(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
