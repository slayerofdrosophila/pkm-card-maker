import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ErrorResponse } from 'interfaces/http';
import { CardOptions } from 'interfaces';

export const getCardOptions = createAction(actionTypes.GET_CARD_OPTIONS)();
export const getCardOptionsSuccess = createAction(actionTypes.GET_CARD_OPTIONS_SUCCESS)<CardOptions>();
export const getCardOptionsFailed = createAction(actionTypes.GET_CARD_OPTIONS_FAILED)<ErrorResponse>();
