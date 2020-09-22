import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ErrorResponse, UploadCardRequest } from 'interfaces/http';
import { Card, CardPreview } from 'interfaces';

export const getCard = createAction(actionTypes.GET_CARD)();
export const getCardSuccess = createAction(actionTypes.GET_CARD_SUCCESS)<Card>();
export const getCardFailed = createAction(actionTypes.GET_CARD_FAILED)<ErrorResponse>();

export const getCards = createAction(actionTypes.GET_CARDS)();
export const getCardsSuccess = createAction(actionTypes.GET_CARDS_SUCCESS)<CardPreview[]>();
export const getCardsFailed = createAction(actionTypes.GET_CARDS_FAILED)<ErrorResponse>();

export const uploadCard = createAction(actionTypes.UPLOAD_CARD)<UploadCardRequest>();
export const uploadCardSuccess = createAction(actionTypes.UPLOAD_CARD_SUCCESS)<CardPreview>();
export const uploadCardFailed = createAction(actionTypes.UPLOAD_CARD_FAILED)<ErrorResponse>();
