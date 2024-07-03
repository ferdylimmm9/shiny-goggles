import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import { StoreDeleteType, StoreInputType, StoreUpdateType } from './model';

export function useCreateStore(
  options?: UseMutationOptions<{ message: string }, ApiError, StoreInputType>,
): UseMutationResult<{ message: string }, ApiError, StoreInputType> {
  return useMutation<{ message: string }, ApiError, StoreInputType>(
    async function (data) {
      return await callApi({
        url: API_LIST.Stores,
        data,
        method: 'POST',
      });
    },
    options,
  );
}

export function useUpdateStore(
  options?: UseMutationOptions<{ message: string }, ApiError, StoreUpdateType>,
): UseMutationResult<{ message: string }, ApiError, StoreUpdateType> {
  return useMutation<{ message: string }, ApiError, StoreUpdateType>(
    async function (value) {
      const { data, id } = value;
      return await callApi({
        url: `${API_LIST.Stores}/${id}`,
        data,
        method: 'PUT',
      });
    },
    options,
  );
}

export function useDeleteStore(
  options?: UseMutationOptions<{ message: string }, ApiError, StoreDeleteType>,
): UseMutationResult<{ message: string }, ApiError, StoreDeleteType> {
  return useMutation<{ message: string }, ApiError, StoreDeleteType>(
    async function ({ id }) {
      return await callApi({
        url: `${API_LIST.Stores}/${id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
