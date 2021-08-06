import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VIPNumber: 0,
  regularNumber: 0,
  totalPrice: 0,
  sessionTimeLeft: 180,
  seats: [],
};
const offerSlice = createSlice({
  name: "offer",
  initialState: initialState,
  reducers: {
    changeMovie: (state, action) => {
      state.date = null;
      state.movie = action.payload.movie;
    },
    changeShowDate: (state, action) => {
      state.date = action.payload.date;
    },
    changeShowtime: (state, action) => {
      state.showtime = action.payload.showtime;
      state.cinemaName = action.payload.cinemaName;
      state.cinemaId = action.payload.cinemaId;
    },
    changeRegularNumber: (state, action) => {
      state.regularNumber = action.payload.regularNumber;
      state.totalPrice = action.payload.totalPrice;
    },
    changeVIPNumber: (state, action) => {
      state.VIPNumber = action.payload.VIPNumber;
      state.totalPrice = action.payload.totalPrice;
    },
    changeSeats: (state, action) => {
      state.seats = action.payload.seats;
    },
    changeSessionTimeLeft: (state, action) => {
      state.sessionTimeLeft = action.payload;
    },
    clearOffer: () => initialState,
  },
});

export const {
  changeRegularNumber,
  changeVIPNumber,
  changeMovie,
  changeSeats,
  changeShowtime,
  changeShowDate,
  changeSessionTimeLeft,
  clearOffer,
} = offerSlice.actions;
export default offerSlice.reducer;
