import { createAction } from 'typesafe-actions';
import * as actionTypes from './actionTypes';
import { ErrorResponse } from 'interfaces/http';
import { User } from 'interfaces';

export const getUser = createAction(actionTypes.GET_USER)();
export const getUserSuccess = createAction(actionTypes.GET_USER_SUCCESS)<User>();
export const getUserFailed = createAction(actionTypes.GET_USER_FAILED)<ErrorResponse>();
