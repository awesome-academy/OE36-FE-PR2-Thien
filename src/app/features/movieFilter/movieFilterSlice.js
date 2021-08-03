import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _limit: 8,
  _page: 1,
};

const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState: initialState,
  reducers: {
    changeLimit: (state, action) => {
      state._page = 1;
      state._limit = action.payload;
    },
    changePage: (state, action) => {
      state._page = action.payload;
    },
    changeCinema: (state, action) => {
      state._page = 1;
      state.cinema_like = action.payload;
    },
    changeLanguage: (state, action) => {
      state._page = 1;
      state.language = action.payload;
    },
    changeGenre: (state, action) => {
      state._page = 1;
      state.genre_like = action.payload;
    },
    changeMovieName: (state, action) => {
      state._page = 1;
      state.name_like = action.payload;
    },
  },
});

export const {
  changeLimit,
  changePage,
  changeCinema,
  changeLanguage,
  changeMovieName,
  changeGenre,
} = movieFilterSlice.actions;
export default movieFilterSlice.reducer;
