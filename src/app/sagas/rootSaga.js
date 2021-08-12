import { all, fork } from "redux-saga/effects";
import * as authSaga from "./auth/authSagas";
import * as userSaga from "./users/userSagas";
import * as movieSaga from "./movies/movieSagas";
import * as ticketSaga from "./ticket/ticketSagas";
import * as showtimeSaga from "./showtime/showtimeSagas";

export default function* rootSaga() {
  yield all([
    fork(authSaga.watchSignup),
    fork(authSaga.watchLogin),
    fork(authSaga.watchSuccess),
    fork(authSaga.watchFail),

    fork(userSaga.watchAddUser),
    fork(userSaga.watchUpdateUser),
    fork(userSaga.watchRemoveUser),

    fork(movieSaga.watchAddMovie),
    fork(movieSaga.watchUpdateMovie),
    fork(movieSaga.watchRemoveMovie),
    
    fork(ticketSaga.watchAddTicket),
    fork(ticketSaga.watchUpdateTicket),

    fork(showtimeSaga.watchAddShowtime),
    fork(showtimeSaga.watchUpdateShowtime),
    fork(showtimeSaga.watchRemoveShowtime),
  ]);
}
