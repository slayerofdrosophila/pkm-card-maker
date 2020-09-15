import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Response<T> {
  data: T;
}

function mapResponse<T>(response: Response<T>): T {
  return response.data;
}

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
      return {
        ok: false,
        code: error.response.status,
        message: error.response.data.error,
      };
    });
}
