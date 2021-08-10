import apiAuth from "apis/tasks/apiAuth";
import apiUploadImage from "apis/tasks/apiUploadImage";
import { login } from "app/features/account/accountSlice";
import { changeShowLoading } from "app/features/common";
import { ACCOUNT_STATUS_ACTIVE, ACCOUNT_STATUS_BLOCKED, ADMIN_ROLE, BASIC_USER_ROLE } from "constants/common";
import {
  ERROR_NOTIFICATION,
  LOGIN_NOTIFICATION,
  PERMISSION_ERROR_NOTIFICATION,
} from "constants/notificationMessage";
import { warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { authAction } from "./authActions";

export function* doLogin({ payload }) {
  yield put(changeShowLoading(true));
  let response;
  try {
    response = yield call(() => apiAuth.login(payload));
    if (
      response.status >= 200 &&
      response.status < 300 &&
      response.data.user.status !== ACCOUNT_STATUS_BLOCKED &&
      (response.data.user.role === payload.role ||
        response.data.user.role === ADMIN_ROLE)
    ) {
      yield put({
        type: authAction.DO_SUCCEEDED,
        payload: {
          ...response.data.user,
          token: response.data.accessToken,
        },
      });
    } else if (
      response.data.user.role !== payload.role ||
      response.data.user.status === ACCOUNT_STATUS_BLOCKED
    ) {
      yield put({
        type: authAction.DO_FAILED,
        payload: {
          data: PERMISSION_ERROR_NOTIFICATION,
        },
      });
    } else {
      yield put({
        type: authAction.DO_FAILED,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: authAction.DO_FAILED,
      payload: response,
    });
  }
  yield put(changeShowLoading(false));
}

export function* watchLogin() {
  yield takeLatest(authAction.LOGIN, doLogin);
}

export function* doSignup({ payload }) {
  yield put(changeShowLoading(true));
  try {
    let uploadResponse;
    if (payload.avatar) {
      uploadResponse = yield call(() => apiUploadImage.upload(payload.avatar));
    }
    if (uploadResponse?.status >= 200 && uploadResponse?.status < 300) {
      const response = yield call(() =>
        apiAuth.signup({
          ...payload,
          role: BASIC_USER_ROLE,
          status: ACCOUNT_STATUS_ACTIVE,
          avatar: uploadResponse.data.shift(),
        })
      );

      if (response.status >= 200 && response.status < 300) {
        yield put({
          type: authAction.DO_SUCCEEDED,
          payload: {
            ...response.data.user,
            token: response.data.accessToken,
          },
        });
      } else {
        yield put({
          type: authAction.DO_FAILED,
          payload: response,
        });
      }
    } else {
      yield put({
        type: authAction.DO_FAILED,
        payload: uploadResponse,
      });
    }
    yield put(changeShowLoading(false));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSignup() {
  yield takeLatest(authAction.SIGNUP, doSignup);
}

export function* doSuccess(action) {
  yield put(login(action.payload));
  yield put(warning(LOGIN_NOTIFICATION));
}

export function* watchSuccess() {
  yield takeLatest(authAction.DO_SUCCEEDED, doSuccess);
}

export function* doFailed(action) {
  yield put(warning(action.payload?.data || ERROR_NOTIFICATION));
}

export function* watchFail() {
  yield takeLatest(authAction.DO_FAILED, doFailed);
}
