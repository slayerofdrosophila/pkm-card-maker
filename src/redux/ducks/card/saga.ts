import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { toCamelCase } from 'utils/http';
import { HttpCard, HttpCardPreview } from 'interfaces/http';
import { CardPreview } from 'interfaces';
import { postCard, fetchCards } from 'services/http/card';
import { ActionType } from 'typesafe-actions';

export function* callPostCard({ payload }: ActionType<typeof actions.uploadCard>) {
  try {
    const response = yield call(postCard, payload);
    if (response.ok !== false) {
      yield put({ type: actionTypes.UPLOAD_CARD_SUCCESS, payload: toCamelCase<HttpCard, CardPreview>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.UPLOAD_CARD_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.UPLOAD_CARD_FAILED, payload: error });
  }
}

export function* callGetCards() {
  try {
    const response = yield call(fetchCards);
    if (response.ok !== false) {
      yield put({ type: actionTypes.GET_CARDS_SUCCESS, payload: toCamelCase<HttpCardPreview[], CardPreview[]>(response) });
      return response;
    } else {
      yield put({ type: actionTypes.GET_CARDS_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_CARDS_FAILED, payload: error });
  }
}


export default function* cardSaga() {
  yield takeLatest(actionTypes.UPLOAD_CARD, callPostCard);
  yield takeLatest(actionTypes.GET_CARDS, callGetCards);
}
