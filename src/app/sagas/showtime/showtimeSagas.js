import apiShowtime from "apis/tasks/apiShowtime";
import { changeShowLoading } from "app/features/common";
import { ADMIN_ROLE } from "constants/common";
import {
  ERROR_NOTIFICATION,
  UPDATE_SUCCESS_NOTIFICATION,
} from "constants/notificationMessage";
import { error, info, warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { showtimeActions } from "./showtimeActions";

export function* updateShowtime({ payload }) {
  yield put(changeShowLoading(true));
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
