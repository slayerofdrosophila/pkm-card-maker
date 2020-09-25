import { ErrorResponse } from "interfaces/http";
import fetchApi, { authHeader, defaultHeaders } from "utils/fetchApi";

export const fetchImage = (path: string) =>
  fetchApi<Blob | ErrorResponse>(path, {
    method: 'GET',
    responseType: 'blob',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  }, true);
