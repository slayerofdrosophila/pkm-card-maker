import { RootState } from 'redux/store';

export const selectUserState = (state: RootState) => state.user;

export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectCredentials = (state: RootState) => selectUserState(state).credentials;
export const selectUserError = (state: RootState) => selectUserState(state).error;
export const selectUserLoading = (state: RootState) => selectUserState(state).isLoading;
