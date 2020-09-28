import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ErrorResponse, GetCardRequest, CreateCardRequest, UpdateCardRequest } from 'interfaces/http';
import { Card, CardPreview } from 'interfaces';

export const getCard = createAction(actionTypes.GET_CARD)<GetCardRequest>();
export const getCardSuccess = createAction(actionTypes.GET_CARD_SUCCESS)<Card>();
export const getCardFailed = createAction(actionTypes.GET_CARD_FAILED)<ErrorResponse>();

export const getCards = createAction(actionTypes.GET_CARDS)();
export const getCardsSuccess = createAction(actionTypes.GET_CARDS_SUCCESS)<CardPreview[]>();
export const getCardsFailed = createAction(actionTypes.GET_CARDS_FAILED)<ErrorResponse>();

export const uploadCard = createAction(actionTypes.UPLOAD_CARD)<CreateCardRequest>();
export const uploadCardSuccess = createAction(actionTypes.UPLOAD_CARD_SUCCESS)<CardPreview>();
export const uploadCardFailed = createAction(actionTypes.UPLOAD_CARD_FAILED)<ErrorResponse>();

export const updateCard = createAction(actionTypes.UPDATE_CARD)<UpdateCardRequest>();
export const updateCardSuccess = createAction(actionTypes.UPDATE_CARD_SUCCESS)<Card>();
export const updateCardFailed = createAction(actionTypes.UPDATE_CARD_FAILED)<ErrorResponse>();
