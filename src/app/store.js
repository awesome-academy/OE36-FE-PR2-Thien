import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas/rootSaga";
import accountReducer from "app/features/account/accountSlice";
import createSagaMiddleware from "@redux-saga/core";
import commonReducer from "./features/common";
import { toastsReducer } from "react-toastify-redux";
import offerReducer from "./features/offer/offerSlice";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  account: accountReducer,
  offer: offerReducer,
  common: commonReducer,
  toasts: toastsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
