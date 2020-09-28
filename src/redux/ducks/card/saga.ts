import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { toCamelCase } from 'utils/http';
import { HttpCard, HttpCardPreview } from 'interfaces/http';
import { CardPreview } from 'interfaces';
import { postCard, fetchCards, fetchCardDetail, putCard } from 'services/http/card';
import { ActionType } from 'typesafe-actions';
import { httpCardToCardWithImg } from 'utils/card';

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

export function* callGetCardDetail({ payload }: ActionType<typeof actions.getCard>) {
  try {
    const response = yield call(fetchCardDetail, payload);
    if (response.ok !== false) {
      const card = yield httpCardToCardWithImg(response, payload.options);
      yield put({ type: actionTypes.GET_CARD_SUCCESS, payload: card });
      return response;
    } else {
      yield put({ type: actionTypes.GET_CARD_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_CARD_FAILED, payload: error });
  }
}

export function* callPutCard({ payload }: ActionType<typeof actions.updateCard>) {
  try {
    const response = yield call(putCard, payload);
    if (response.ok !== false) {
      const card = yield httpCardToCardWithImg(response, payload.options);
      yield put({ type: actionTypes.UPDATE_CARD_SUCCESS, payload: card });
      return response;
    } else {
      yield put({ type: actionTypes.UPDATE_CARD_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.UPDATE_CARD_FAILED, payload: error });
  }
}


export default function* cardSaga() {
  yield takeLatest(actionTypes.UPLOAD_CARD, callPostCard);
  yield takeLatest(actionTypes.GET_CARDS, callGetCards);
  yield takeLatest(actionTypes.GET_CARD, callGetCardDetail);
  yield takeLatest(actionTypes.UPDATE_CARD, callPutCard);
}
