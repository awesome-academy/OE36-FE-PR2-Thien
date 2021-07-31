import { all, fork } from "redux-saga/effects";
import * as authSaga from "./auth/authSagas";

export default function* rootSaga() {
  yield all([
    fork(authSaga.watchSignup),
    fork(authSaga.watchSuccess),
    fork(authSaga.watchFail),
  ]);
}
