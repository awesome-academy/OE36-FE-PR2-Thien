import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.token = action.payload.toke;
    },
    logout: () => initialState,
  },
});

export const { login } = accountSlice.actions;

export default accountSlice.reducer;
