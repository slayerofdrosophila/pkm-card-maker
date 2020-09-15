import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { httpToNormalType } from 'utils/http';
import { LoginResponse } from 'interfaces/http';
import { Credentials } from 'interfaces';
import { login } from 'services/http/auth';
import { ActionType } from 'typesafe-actions';

export function* callLogin({ payload }: ActionType<typeof actions.login>) {
  try {
    const response = yield call(login, payload);
    if (response.ok !== false) {
      yield put({ type: actionTypes.LOGIN_SUCCESS, payload: httpToNormalType<LoginResponse, Credentials>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.LOGIN_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_FAILED, payload: error });
  }
}


export default function* userSaga() {
  yield takeLatest(actionTypes.LOGIN, callLogin);
}
