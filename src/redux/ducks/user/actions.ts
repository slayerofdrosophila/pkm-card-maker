import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ErrorResponse } from 'interfaces/http';
import { User, Credentials } from 'interfaces';

export const getUser = createAction(actionTypes.GET_USER)();
export const getUserSuccess = createAction(actionTypes.GET_USER_SUCCESS)<User>();
export const getUserFailed = createAction(actionTypes.GET_USER_FAILED)<ErrorResponse>();

export const login = createAction(actionTypes.LOGIN)<FormData>();
export const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS)<Credentials>();
export const loginFailed = createAction(actionTypes.LOGIN_FAILED)<ErrorResponse>();
export const logout = createAction(actionTypes.LOGOUT)();
