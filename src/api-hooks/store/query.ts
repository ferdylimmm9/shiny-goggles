import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  StoreLiteModel,
  StoreModel,
  getStoreInput,
  getStoresInput,
} from './model';

export const StoreKey = {
  stores: 'get-stores',
  store: 'get-store',
  storesKey(input?: getStoresInput) {
    return [StoreKey.stores, input].filter(Boolean);
  },
  storeKey(input: getStoreInput) {
    return [StoreKey.store, input];
  },
} as const;

export function useGetStores({
  input,
  options,
}: {
  input?: getStoresInput;
  options?: UseQueryOptions<ExtendedApiResult<StoreLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: StoreKey.storesKey(input),
    queryFn: () =>
      callApi({ url: API_LIST.Stores, params: input?.params }, StoreLiteModel),
    ...options,
  });
}

export function useGetStore({
  input,
  options,
}: {
  input: getStoreInput;
  options?: UseQueryOptions<ApiResult<StoreModel>, ApiError>;
}) {
  return useQuery({
    queryKey: StoreKey.storeKey(input),
    queryFn: () =>
      callApi({ url: `${API_LIST.Stores}/${input.id}` }, StoreModel),
    ...options,
  });
}
