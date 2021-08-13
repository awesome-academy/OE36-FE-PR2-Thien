import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => initialState,
    update: (state, action) => {
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password =action.payload.password;
      state.address =action.payload.address;
    },
  },
});

export const {
  login,
  logout,
  update,
} = accountSlice.actions;

export default accountSlice.reducer;
