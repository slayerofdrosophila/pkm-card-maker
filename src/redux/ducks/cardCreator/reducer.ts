import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { ImportedCard } from 'interfaces';

export interface CardCreatorState {
  card: ImportedCard,
}

export type CardCreatorActions = ActionType<typeof actions>;

export const initialCardCreatorState: CardCreatorState = {
  card: {
    hitpoints: 100,
    weaknessAmount: 2,
    resistanceAmount: 30,
    retreatCost: 1,
    supertypeId: 1,
    baseSetId: 1,
    setId: 1,
    typeId: 1,
    weaknessTypeId: 1,
    subtypeId: 1,
    rotationId: 1
  },
}

export const cardCreatorReducer = createReducer<CardCreatorState, CardCreatorActions>(initialCardCreatorState)
  .handleAction(actions.getCardCreatorOptions, (state) => state)
  .handleAction(actions.setCardCreatorOptions, (state, action) => ({
    ...state,
    card: action.payload,
  }))
