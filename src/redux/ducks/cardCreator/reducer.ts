import { HttpCardNoImg } from 'interfaces/http';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

export interface CardCreatorState {
  card: HttpCardNoImg,
}

export type CardCreatorActions = ActionType<typeof actions>;

export const initialCardCreatorState: CardCreatorState = {
  card: {
    name: '',
    base_set: 1,
    supertype: 1,
    type: 1,
    subtype: 1,
    weakness_type: 2,
    rotation: 1,
    set: 1,
    weakness_amount: 2,
    resistance_amount: 30,
    hitpoints: 100,
    retreat_cost: 2,
    card_number: '051',
    total_cards: '100',
    illustrator: 'Card Creator'
  },
}

export const cardCreatorReducer = createReducer<CardCreatorState, CardCreatorActions>(initialCardCreatorState)
  .handleAction(actions.getCardCreatorOptions, (state) => state)
  .handleAction(actions.setCardCreatorOptions, (state, action) => ({
    ...state,
    card: action.payload,
  }))
