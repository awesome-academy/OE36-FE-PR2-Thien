import apiMovie from "apis/tasks/apiMovie";
import { changeShowLoading } from "app/features/common";
import {
  ADD_SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  REMOVE_SUCCESS_NOTIFICATION,
  UPDATE_SUCCESS_NOTIFICATION,
} from "constants/notificationMessage";
import { error, info, warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { movieActions } from "./movieActions";

export function* addMovie({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiMovie.post(payload));
    if (response.status === 201) {
      yield put(info(ADD_SUCCESS_NOTIFICATION));
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchAddMovie() {
  yield takeLatest(movieActions.ADD_MOVIE, addMovie);
}

export function* updateMovie({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiMovie.put(payload.id, payload));
    if (response.status >= 200 && response.status < 300) {
      yield put(info(UPDATE_SUCCESS_NOTIFICATION));
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (err) {
    yield put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchUpdateMovie() {
  yield takeLatest(movieActions.UPDATE_MOVIE, updateMovie);
}

export function* removeMovie({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiMovie.remove(payload));
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

export function* watchRemoveMovie() {
  yield takeLatest(movieActions.REMOVE_MOVIE, removeMovie);
}
