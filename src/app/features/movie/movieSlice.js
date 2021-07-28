import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    getNowShowingMovie: (state, action) => {
      state.nowShowingMovie = action.payload.listMovie;
    },
    getComingSoonMovie: (state, action) => {
      state.comingSoonMovie = action.payload.listMovie;
    },
  },
});

export const { getNowShowingMovie, getComingSoonMovie } = movieSlice.actions;
export default movieSlice.reducer;
