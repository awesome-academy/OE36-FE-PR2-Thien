import apiShowtime from "apis/tasks/apiShowtime";
import { changeShowLoading } from "app/features/common";
import { ADMIN_ROLE } from "constants/common";
import {
  ADD_SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  REMOVE_SUCCESS_NOTIFICATION,
  UPDATE_SUCCESS_NOTIFICATION,
} from "constants/notificationMessage";
import { error, info, warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { showtimeActions } from "./showtimeActions";

export function* addShowtime({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiShowtime.post(payload));
    if (response.status === 201 ) {
      yield put(info(ADD_SUCCESS_NOTIFICATION));
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchAddShowtime() {
  yield takeLatest(showtimeActions.ADD_SHOWTIME, addShowtime);
}


export function* updateShowtime({ payload }) {
  yield put(changeShowLoading(true));
  // eslint-disable-next-line no-debugger
  debugger;
  try {
    const response = yield call(() =>
      apiShowtime.put(payload.showtime.id, payload.showtime)
    );
    if (response.status >= 200 && response.status < 300) {
      if (payload.userRole === ADMIN_ROLE) {
        yield put(info(UPDATE_SUCCESS_NOTIFICATION));
      }
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchUpdateShowtime() {
  yield takeLatest(showtimeActions.UPDATE_SHOWTIME, updateShowtime);
}

export function* removeShowtime({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiShowtime.remove(payload));
    if (response.status >= 200 && response.status < 300) {
      yield put(info(REMOVE_SUCCESS_NOTIFICATION));
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchRemoveShowtime() {
  yield takeLatest(showtimeActions.REMOVE_SHOWTIME, removeShowtime);
}
