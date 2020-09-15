import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { ErrorResponse } from 'interfaces/http';
import { Credentials, User } from 'interfaces';

export interface UserState {
  isLoading: boolean,
  error?: ErrorResponse,
  user: User,
  credentials: Credentials,
}

export type UserActions = ActionType<typeof actions>;

const initialState: UserState = {
  isLoading: false,
  error: undefined,
  user: {
    id: 0,
    email: '',
    username: '',
    accessToken: '',
  },
  credentials: {
    accessToken: '',
    expiresIn: 0,
    refreshToken: '',
    scope: '',
    tokenType: '',
  }
}

export const userReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(actions.getUser, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.getUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    user: action.payload,
    error: initialState.error,
  }))
  .handleAction(actions.getUserFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleAction(actions.login, (state) => ({
    ...state,
    isLoading: true,
    error: initialState.error,
  }))
  .handleAction(actions.loginSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    credentials: action.payload,
    error: initialState.error,
  }))
  .handleAction(actions.loginFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }));
