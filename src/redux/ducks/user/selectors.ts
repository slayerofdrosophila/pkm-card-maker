import { RootState } from 'redux/store';

export const selectUserState = (state: RootState) => state.user;

export const selectUser = (state: RootState) => selectUserState(state).user;
