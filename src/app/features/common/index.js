const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  showLoading: false,
};

const commonSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    changeShowLoading: (state, action) => {
      state.showLoading = action.payload;
    },
  },
});

export const { changeShowLoading } = commonSlice.actions;
export default commonSlice.reducer;
