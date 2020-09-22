import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { toCamelCase } from 'utils/http';
import { HttpCard, HttpCardPreview } from 'interfaces/http';
import { CardPreview } from 'interfaces';
import { postCard, fetchCards, fetchCardDetail } from 'services/http/card';
import { ActionType } from 'typesafe-actions';
import { httpCardToCard } from 'utils/card';
import { fetchImage } from 'services/http/image';

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
      const card = httpCardToCard(response, payload.options);
      // Add authenticatable images
      if(card.cardImage) {
        const img: Blob = yield call(fetchImage, card.cardImage);
        card.cardImage = URL.createObjectURL(img);
      }
      if(card.backgroundImage) {
        const img: Blob = yield call(fetchImage, card.backgroundImage);
        card.backgroundImage = URL.createObjectURL(img);
      }
      if(card.topImage) {
        const img: Blob = yield call(fetchImage, card.topImage);
        card.topImage = URL.createObjectURL(img);
      }
      if(card.customSetIcon) {
        const img: Blob = yield call(fetchImage, card.customSetIcon);
        card.customSetIcon = URL.createObjectURL(img);
      }
      if(card.prevolveImage) {
        const img: Blob = yield call(fetchImage, card.prevolveImage);
        card.prevolveImage = URL.createObjectURL(img);
      }
      if(card.typeImage) {
        const img: Blob = yield call(fetchImage, card.typeImage);
        card.typeImage = URL.createObjectURL(img);
      }
      yield put({ type: actionTypes.GET_CARD_SUCCESS, payload: card });
      return response;
    } else {
      yield put({ type: actionTypes.GET_CARD_FAILED, payload: response });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_CARD_FAILED, payload: error });
  }
}


export default function* cardSaga() {
  yield takeLatest(actionTypes.UPLOAD_CARD, callPostCard);
  yield takeLatest(actionTypes.GET_CARDS, callGetCards);
  yield takeLatest(actionTypes.GET_CARD, callGetCardDetail);
}
