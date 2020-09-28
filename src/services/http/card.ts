import fetchApi, { authHeader, defaultHeaders } from 'utils/fetchApi';
import { ErrorResponse, HttpCard, HttpCardPreview, CreateCardRequest, GetCardRequest, UpdateCardRequest, DeleteCardRequest } from 'interfaces/http';

export const postCard = (request: CreateCardRequest) =>
  fetchApi<HttpCard | ErrorResponse>('/api/cards/', {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
      'Content-Type': 'multipart/form-data',
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

export const fetchCardDetail = (request: GetCardRequest) =>
  fetchApi<HttpCard | ErrorResponse>(`/api/cards/${request.id}/`, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  });

export const putCard = (request: UpdateCardRequest) =>
  fetchApi<HttpCard | ErrorResponse>(`/api/cards/${request.id}/`, {
    method: 'PUT',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
      'Content-Type': 'multipart/form-data',
    },
    data: request.card,
  });

export const deleteCard = (request: DeleteCardRequest) =>
  fetchApi<null | ErrorResponse>(`/api/cards/${request.id}/`, {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...authHeader(),
    },
  });
