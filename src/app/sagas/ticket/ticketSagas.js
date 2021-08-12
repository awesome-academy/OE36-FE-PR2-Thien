import apiShowtime from "apis/tasks/apiShowtime";
import apiTicket from "apis/tasks/apiTicket";
import { changeShowLoading } from "app/features/common";
import { TICKET_STATUS_PENDING, TICKET_STATUS_REJECT } from "constants/common";
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

export function* updateTicket({ payload }) {
  try {
    const response = yield call(apiTicket.put, payload.id, payload);
    const ticketSeat = payload.seats.map((seat) => seat.id);
    if (response.status >= 200 && response.status < 400) {
      const oldShowtime = yield call(apiShowtime.getById, payload.showtimeId);
      if (
        oldShowtime.status >= 200 &&
        oldShowtime.status < 400 &&
        payload.status === TICKET_STATUS_REJECT
      ) {
        const newOccupied = oldShowtime.data.occupied.filter(
          (seat) => !ticketSeat.includes(seat)
        );
        const newShowtime = {
          ...oldShowtime.data,
          occupied: newOccupied,
        };
        yield put({
          type: showtimeActions.UPDATE_SHOWTIME,
          payload: { showtime: newShowtime },
        });
      } else if (payload.status !== TICKET_STATUS_REJECT) {
        const newOccupied = new Set([
          ...oldShowtime.data.occupied,
          ...ticketSeat,
        ]);
        const newShowtime = {
          ...oldShowtime.data,
          occupied: Array.from(newOccupied),
        };
        yield put({
          type: showtimeActions.UPDATE_SHOWTIME,
          payload: { showtime: newShowtime },
        });
      }
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
}

export function* watchUpdateTicket() {
  yield takeLatest(ticketActions.UPDATE_TICKET, updateTicket);
}
