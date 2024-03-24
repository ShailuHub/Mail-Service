import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import mailSlice from "../features/mailSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export const authAction = authSlice.actions;
export const mailAction = mailSlice.actions;

export default store;
