import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { ErrorResponse } from 'interfaces/http';
import { CardOptions } from 'interfaces';

export interface CardOptionsState {
  isLoading: boolean,
  error?: ErrorResponse,
  cardOptions: CardOptions,
}

export type CardOptionsActions = ActionType<typeof actions>;

const initialState: CardOptionsState = {
  isLoading: false,
  error: undefined,
  cardOptions: {
    supertypes: [],
    baseSets: [],
    rarities: [],
    sets: [],
    subtypes: [],
    types: [],
    variations: [],
    rotations: [],
    rarityIcons: [],
  },
}

export const cardOptionsReducer = createReducer<CardOptionsState, CardOptionsActions>(initialState)
  .handleAction(actions.getCardOptions, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.getCardOptionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cardOptions: action.payload,
    error: initialState.error,
  }))
  .handleAction(actions.getCardOptionsFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }));
