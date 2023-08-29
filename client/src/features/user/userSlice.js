import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import axios from "axios";

const initialState = {
  success: "",
  user: {
    role: "",
  },
  token: "",
  orders: [],
};

export const createUser = createAsyncThunk(
  "user/PostUserDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/registerUser",
        userDetails
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkLoginDetails = createAsyncThunk(
  "user/checkLoginDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/checkLoginDetails",
        userDetails
      );
      // Store the token in a cookie
      document.cookie = `token=${response.data.token}; path=/;`;

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkForUser_Token = createAsyncThunk(
  "user/checkForUser_Token",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/checkForUser_Token",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error in check for use token");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    });

    persistStore().purge();
    return response.data;
  } catch (error) {
    console.log(error, "error in logout");
  }
});

export const getUserAppointments = createAsyncThunk(
  "user/getUserAppointments",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-user-appointments",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error in fetching user order");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      return;
    },
    [checkLoginDetails.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [checkForUser_Token.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [getUserAppointments.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [logout.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
