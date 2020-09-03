import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchCardOptions } from 'services/http/cardOptionsRequest';
import * as actionTypes from './actionTypes';
import { httpToNormalType } from 'utils/http';
import { CardOptionsResponse } from 'interfaces/http';
import { CardOptions } from 'interfaces';

export function* getCardOptions() {
  try {
    const response = yield call(fetchCardOptions);
    if (!response.error) {
      yield put({ type: actionTypes.GET_CARD_OPTIONS_SUCCESS, payload: httpToNormalType<CardOptionsResponse, CardOptions>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.GET_CARD_OPTIONS_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_CARD_OPTIONS_FAILED, payload: error });
  }
}


export default function* cardOptionsSaga() {
  yield takeLatest(actionTypes.GET_CARD_OPTIONS, getCardOptions);
}
