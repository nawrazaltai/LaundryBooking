import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
