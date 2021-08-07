import { all, fork } from "redux-saga/effects";
import * as authSaga from "./auth/authSagas";
import * as userSaga from "./users/userSagas";

export default function* rootSaga() {
  yield all([
    fork(authSaga.watchSignup),
    fork(authSaga.watchLogin),
    fork(authSaga.watchSuccess),
    fork(authSaga.watchFail),

    fork(userSaga.watchAddUser),
    fork(userSaga.watchUpdateUser),
    fork(userSaga.watchRemoveUser),
  ]);
}
