import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { ErrorResponse } from 'interfaces/http';
import { Card, CardPreview } from 'interfaces';

export interface CardState {
  isLoading: boolean,
  error?: ErrorResponse,
  card: Card,
  cards: CardPreview[],
}

export type CardActions = ActionType<typeof actions>;

const initialState: CardState = {
  isLoading: false,
  error: undefined,
  card: { },
  cards: [],
}

export const cardReducer = createReducer<CardState, CardActions>(initialState)
  .handleAction(actions.getCard, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.getCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    card: action.payload,
    error: initialState.error,
  }))
  .handleAction(actions.getCardFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleAction(actions.getCards, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.getCardsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: action.payload,
    error: initialState.error,
  }))
  .handleAction(actions.getCardsFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleAction(actions.uploadCard, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.uploadCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: action.payload ? [
      ...state.cards,
      {
        id: action.payload.id,
        fullCardImage: action.payload.fullCardImage,
        name: action.payload.name,
      },
    ] : state.cards,
    error: initialState.error,
  }))
  .handleAction(actions.uploadCardFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleAction(actions.updateCard, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.updateCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    card: action.payload || state.card,
    error: initialState.error,
  }))
  .handleAction(actions.updateCardFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }));
