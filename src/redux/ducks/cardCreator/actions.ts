import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ImportedCard } from 'interfaces';

export const getCardCreatorOptions = createAction(actionTypes.GET_CARD_CREATOR_OPTIONS)();
export const setCardCreatorOptions = createAction(actionTypes.SET_CARD_CREATOR_OPTIONS)<ImportedCard>();
