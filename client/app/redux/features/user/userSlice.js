import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const API_URL = "http://192.168.0.29:3000";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const token = SecureStore.getItemAsync("token")
  ? SecureStore.getItem("token")
  : null;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    username: null,
    token,
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
      SecureStore.deleteItemAsync("token");
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
        SecureStore.setItemAsync("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export const { logout, setToken } = userSlice.actions;

export default userSlice.reducer;
