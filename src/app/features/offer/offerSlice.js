import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VIPNumber: 0,
  regularNumber: 0,
  totalPrice: 0,
  ticketPrice: 0,
  sessionTimeLeft: 180000000,
  seats: [],
  foods: [],
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
    },
    changeRegularNumber: (state, action) => {
      state.regularNumber = action.payload.regularNumber;
      state.totalPrice = action.payload.ticketPrice;
      state.ticketPrice = action.payload.ticketPrice
    },
    changeVIPNumber: (state, action) => {
      state.VIPNumber = action.payload.VIPNumber;
      state.totalPrice = action.payload.ticketPrice;
      state.ticketPrice = action.payload.ticketPrice
    },
    changeSeats: (state, action) => {
      state.seats = action.payload.seats;
    },
    changeSessionTimeLeft: (state, action) => {
      state.sessionTimeLeft = action.payload;
    },
    changeMethod: (state, action) => {
      state.method = action.payload;
    },
    changeStep: (state, action) => {
      state.currentStep = action.payload.currentStep;
      state.nextStep = action.payload.nextStep;
    },
    changeFood: (state, action) => {
      state.foods = action.payload.foods,
      state.totalPrice = action.payload.totalPrice;
    },
    changeTotalPrice: (state, action) => {
      state.totalPrice = action.payload
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
  changeMethod,
  clearOffer,
  changeStep,
  changeFood,
  changeTotalPrice
} = offerSlice.actions;
export default offerSlice.reducer;
