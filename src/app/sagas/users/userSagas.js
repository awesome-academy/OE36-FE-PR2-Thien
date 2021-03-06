import apiUser from "apis/tasks/apiUser";
import { changeShowLoading } from "app/features/common";
import {
  ADD_SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  REMOVE_SUCCESS_NOTIFICATION,
  UPDATE_SUCCESS_NOTIFICATION,
} from "constants/notificationMessage";
import { info, warning, error } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { userAction } from "./userActions";

export function* addUser({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiUser.post(payload));
    if (response.status === 201) {
      yield put(info(ADD_SUCCESS_NOTIFICATION));
    } else {
      yield put(warning(response.payload?.data || ERROR_NOTIFICATION));
    }
  } catch (e) {
    yield put(error(ERROR_NOTIFICATION));
  }
  yield put(changeShowLoading(false));
}

export function* watchAddUser() {
  yield takeLatest(userAction.ADD_USER, addUser);
}

export function* updateUser({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiUser.put(payload.id, payload));
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

export function* watchUpdateUser() {
  yield takeLatest(userAction.UPDATE_USER, updateUser);
}

export function* removeUser({ payload }) {
  yield put(changeShowLoading(true));
  try {
    const response = yield call(() => apiUser.remove(payload));
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

export function* watchRemoveUser() {
  yield takeLatest(userAction.REMOVE_USER, removeUser);
}
