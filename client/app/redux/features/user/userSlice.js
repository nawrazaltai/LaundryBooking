import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { removeData, storeData } from "../../../../lib/storage";

const API_URL = "http://192.168.0.29:3000";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      await storeData("token", response.data.token);
      await storeData("userData", response.data.user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    username: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.username = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      removeData("token");
      removeData("userData");
    },
    setToken: (state, action) => {
      state.status = "loading";
      state.token = action.payload;
      state.status = "idle";
    },
    setUserData: (state, action) => {
      //   state.firstName = action.payload.firstName;
      //   state.lastName = action.payload.lastName;
      state.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.user.username;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export const { logout, setToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
