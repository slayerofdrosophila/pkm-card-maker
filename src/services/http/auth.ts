import fetchApi, { defaultHeaders } from 'utils/fetchApi';
import { ErrorResponse, LoginResponse } from 'interfaces/http';

export const login = (data: FormData) =>
  fetchApi<LoginResponse | ErrorResponse>('/auth/convert-token/', {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    data,
  });
