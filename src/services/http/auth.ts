import fetchApi, { defaultHeaders } from 'utils/fetchApi';
import { ErrorResponse, LoginRequest, LoginResponse } from 'interfaces/http';

export const login = (request: LoginRequest) =>
  fetchApi<LoginResponse | ErrorResponse>(request.endpoint, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    data: request.data,
  });
