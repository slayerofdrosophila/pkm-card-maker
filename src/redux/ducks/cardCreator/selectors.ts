import { RootState } from 'redux/store';

export const selectCardCreatorState = (state: RootState) => state.cardCreator;

export const selectCardCreatorOptions = (state: RootState) => selectCardCreatorState(state).card;
