import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { logout } from 'redux/ducks/user/actions';
import { store } from 'redux/store';
import { loadState } from './localStorage';

interface Response<T> {
  data: T;
}

function mapResponse<T>(response: Response<T>): T {
  return response.data;
}

export const authHeader = () => ({
  Authorization: `Bearer ${loadState().user.credentials.accessToken}`,
});

export const defaultHeaders = {
  'accept': 'application/json',
};

export default async function fetchApi<T>(endpoint: string, options: AxiosRequestConfig) {
  const baseUrl: string = process.env.REACT_APP_API_URL || '';

  return axios(`${baseUrl}${endpoint}`, options)
    .then((response: AxiosResponse<any>) => {
      const responseData = response.data
        ? mapResponse<T>(response)
        : ((response as unknown) as T);
      return responseData;
    })
    .catch((error) => {
      if(error.response.status === 401) {
        store.dispatch(logout());
      }
      return {
        ok: false,
        code: error.response.status,
        message: error.response.data.error,
      };
    });
}
