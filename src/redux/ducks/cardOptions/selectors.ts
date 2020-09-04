import { RootState } from 'redux/store';

export const selectCardOptionsState = (state: RootState) => state.cardOptions;

export const selectCardOptions = (state: RootState) => selectCardOptionsState(state).cardOptions;
