import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => initialState,
  },
});

export const {
  login,
  logout,
} = accountSlice.actions;

export default accountSlice.reducer;
