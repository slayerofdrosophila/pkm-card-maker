import { HttpCard } from 'interfaces/http';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

export interface CardCreatorState {
  card: HttpCard,
}

export type CardCreatorActions = ActionType<typeof actions>;

export const initialCardCreatorState: CardCreatorState = {
  card: {
    name: '',
    base_set: 1,
    full_card_image: '',
  },
}

export const cardCreatorReducer = createReducer<CardCreatorState, CardCreatorActions>(initialCardCreatorState)
  .handleAction(actions.getCardCreatorOptions, (state) => state)
  .handleAction(actions.setCardCreatorOptions, (state, action) => ({
    ...state,
    card: action.payload,
  }))
