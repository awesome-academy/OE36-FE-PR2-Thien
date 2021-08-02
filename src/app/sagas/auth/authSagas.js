import apiAuth from "apis/tasks/apiAuth";
import apiUploadImage from "apis/tasks/apiUploadImage";
import { login } from "app/features/account/accountSlice";
import { changeShowLoading } from "app/features/common";
import { warning } from "react-toastify-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { ERROR_NOTIFICATION, LOGIN_NOTIFICATION } from "utils/constant";
import { authAction } from "./authActions";

export function* doSignup({ payload }) {
  yield put(changeShowLoading(true));
  try {
    let uploadResponse;
    if (payload.avatar) {
      uploadResponse = yield call(() => apiUploadImage.upload(payload.avatar));
    }
    if (uploadResponse?.status >= 200 && uploadResponse?.status < 300) {
      const response = yield call(() =>
        apiAuth.signup({ ...payload, avatar: uploadResponse.data.shift() })
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
