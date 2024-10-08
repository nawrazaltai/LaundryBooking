import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getData, removeData, storeData } from "../../../../lib/storage";
import { API_URL } from "../../../../lib/constants";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      await storeData("token", token);
      await storeData("userData", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const getUser = createAsyncThunk(
//   "users/userId",
//   async (userId, thunkAPI) => {
//     try {
//       const token = await getData("token");

//       if (!token) {
//         return thunkAPI.rejectWithValue({ error: "Token not found" });
//       }

//       const response = await axios.get(`${API_URL}/user/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       //   const { user } = response.data;
//       //   await storeData("token", token);
//       //   await storeData("userData", user);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: null,
      firstName: null,
      lastName: null,
      username: null,
      apartmentNumber: null,
    },
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
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
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });

    // builder
    //   .addCase(getUser.pending, (state) => {
    //     state.status.loading;
    //   })
    //   .addCase(getUser.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.user = action.payload.user;
    //   })
    //   .addCase(getUser.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload.error;
    //   });
  },
});

export const { logout, setToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
