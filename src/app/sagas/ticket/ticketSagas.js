import apiTicket from "apis/tasks/apiTicket";
import { changeShowLoading } from "app/features/common";
import { TICKET_STATUS_PENDING } from "constants/common";
import {
  BOOKING_SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
} from "constants/notificationMessage";
import { error, warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { showtimeActions } from "../showtime/showtimeActions";
import { ticketActions } from "./ticketActions";

export function* addTicket({ payload }) {
    yield put(changeShowLoading(true));
  try {
    const ticketData = {
      userId: payload.userId,
      userRole: payload.userRole,
      movieId: payload.movie.id,
      movieName: payload.movie.name,
      cinemaId: payload.showtime.cinemaId,
      cinemaName: payload.showtime.cinemaName,
      seats: payload.seats,
      showtimeId: payload.showtime.id,
      totalPrice: payload.totalPrice,
      foods: payload.foods,
      status: TICKET_STATUS_PENDING,
    };
    const response = yield call(apiTicket.post, ticketData);
    if (response.status === 201) {
      yield put(warning(BOOKING_SUCCESS_NOTIFICATION));
      const newShowtime = {
        ...payload.showtime,
        occupied: [
          ...payload.showtime.occupied,
          ...payload.seats.map((seat) => seat.id),
        ],
      };
      yield put({
        type: showtimeActions.UPDATE_SHOWTIME,
        payload: { showtime: newShowtime, userRole: payload.userRole },
      });
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
    yield put(changeShowLoading(false));
}

export function* watchAddTicket() {
  yield takeLatest(ticketActions.ADD_TICKET, addTicket);
}