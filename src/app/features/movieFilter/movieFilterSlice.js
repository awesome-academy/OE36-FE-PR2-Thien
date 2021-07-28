const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  _limit: 4,
  _page: 1,
};

const movieFilterSlice = createSlice({
  name: "movieSlice",
  initialState: initialState,
  reducers: {
    changeLimit: (state, action) => {
      state._page = action.payload.page;
      state._limit = action.payload.limit;
    },
    changePage: (state, action) => {
      state._page = action.payload.page;
    },
  },
});

export const { changeLimit, changePage } = movieFilterSlice.actions;
export default movieFilterSlice.reducer;
