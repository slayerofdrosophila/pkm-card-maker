import { ErrorResponse, HttpUser } from "interfaces/http";
import fetchApi, { authHeader, defaultHeaders } from "utils/fetchApi";

export const fetchUser = () =>
  fetchApi<HttpUser | ErrorResponse>('/api/users/user_by_token/', {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  });
