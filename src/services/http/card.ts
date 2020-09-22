import fetchApi, { authHeader, defaultHeaders } from 'utils/fetchApi';
import { ErrorResponse, HttpCard, HttpCardPreview, UploadCardRequest } from 'interfaces/http';

export const postCard = (request: UploadCardRequest) =>
  fetchApi<HttpCard | ErrorResponse>('/api/cards/', {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    data: request.card,
  });

export const fetchCards = () =>
  fetchApi<HttpCardPreview[] | ErrorResponse>('/api/cards/', {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  });
