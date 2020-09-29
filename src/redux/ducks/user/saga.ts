import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { toCamelCase } from 'utils/http';
import { HttpUser, LoginResponse } from 'interfaces/http';
import { Credentials, User } from 'interfaces';
import { login } from 'services/http/auth';
import { ActionType } from 'typesafe-actions';
import { fetchUser } from 'services/http/user';

export function* callLogin({ payload }: ActionType<typeof actions.login>) {
  try {
    const response = yield call(login, payload);
    if (response.ok !== false) {
      yield put({ type: actionTypes.LOGIN_SUCCESS, payload: toCamelCase<LoginResponse, Credentials>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.LOGIN_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_FAILED, payload: error });
  }
}

export function* callFetchUser() {
  try {
    const response = yield call(fetchUser);
    if (response.ok !== false) {
      yield put({ type: actionTypes.GET_USER_SUCCESS, payload: toCamelCase<HttpUser, User>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.GET_USER_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_USER_FAILED, payload: error });
  }
}

export default function* userSaga() {
  yield takeLatest(actionTypes.LOGIN, callLogin);
  yield takeLatest(actionTypes.GET_USER, callFetchUser);
}
