import { RootState } from 'redux/store';

export const selectCardState = (state: RootState) => state.card;

export const selectCardError = (state: RootState) => selectCardState(state).error;
export const selectCardLoading = (state: RootState) => selectCardState(state).isLoading;

export const selectCard = (state: RootState) => selectCardState(state).card;
export const selectCards = (state: RootState) => selectCardState(state).cards;
