import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { decamelizeKeys } from 'humps';

import QueryTransformer from './query-transfomer';
import { getTokenStorage } from './storage';
export const BASE_URL =
  'https://madebycaramel.varrelmarcellius.xyz/api/employee/' as const;

export const API_LIST = {
  Auth: 'auth',
  Me: 'me',
  MeAuth: 'me/auth',
  Employees: 'employees',
  PermissionGroups: 'permission-groups',
  Permissions: 'permissions',
  Platforms: 'platforms',
  Products: 'products',
  Stores: 'stores',
  Reports: 'reports',
  WholesaleOrders: 'wholesale-orders',
} as const;

const client = axios.create({
  baseURL: BASE_URL,
});

// https://axios-http.com/docs/interceptors
client.interceptors.request.use((value) => {
  // authorization
  const token = getTokenStorage()?.accessToken;
  value.headers.Authorization = token ? `Bearer ${token}` : undefined;

  //params
  if (value.params) {
    value.params = decamelizeKeys(value.params);
  }

  // data
  if (value.data && value.headers['Content-Type'] !== 'multipart/form-data') {
    value.data = decamelizeKeys(value.data);
  }
  return value;
});

export async function callApi<T = any>(
  args: AxiosRequestConfig,
  dataType?: ClassConstructor<T>,
) {
  const { method = 'GET', headers, ...rest } = args;
  const token = getTokenStorage()?.accessToken;
  //https://medium.com/@amavictor/how-to-use-react-query-axios-and-a-custom-request-processor-to-transform-your-data-2a9f0c9f5bf0
  return client({
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...headers,
    },
    ...rest,
  })
    .then(async (value: AxiosResponse<T>) => {
      if (value.headers['content-type'] === 'application/pdf') {
        return value.data;
      }
      return QueryTransformer(value.data, dataType);
    })
    .catch((error) => Promise.reject(error.response.data));
}

export default client;
