import { ErrorResponse } from "interfaces/http";
import fetchApi, { authHeader, defaultHeaders } from "utils/fetchApi";

export const fetchImage = (path: string) => {
  const baseUrl: string = process.env.REACT_APP_API_URL || '';

  return fetchApi<Blob | ErrorResponse>(path.replace(baseUrl, ''), {
    method: 'GET',
    responseType: 'blob',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  });
}
