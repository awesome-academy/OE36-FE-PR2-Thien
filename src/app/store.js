import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import accountSlice from "app/features/account/accountSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  account: accountSlice,
}


const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export default store;
