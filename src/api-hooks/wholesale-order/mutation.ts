import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import { WholesaleDeleteType, WholesaleUpdateStatusType } from './model';

export function useDeleteWholesale(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    WholesaleDeleteType
  >,
): UseMutationResult<{ message: string }, ApiError, WholesaleDeleteType> {
  return useMutation<{ message: string }, ApiError, WholesaleDeleteType>(
    async function ({ id }) {
      return await callApi({
        url: `${API_LIST.WholesaleOrders}/${id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}

export function useUpdateWholesaleStatus(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    WholesaleUpdateStatusType
  >,
): UseMutationResult<{ message: string }, ApiError, WholesaleUpdateStatusType> {
  return useMutation<{ message: string }, ApiError, WholesaleUpdateStatusType>(
    async function ({ id, action }) {
      return await callApi({
        url: `${API_LIST.WholesaleOrders}/${id}/status/${action}`,
        method: 'PATCH',
      });
    },
    options,
  );
}

export function useImportWholesale(
  options?: UseMutationOptions<{ message: string }, ApiError, any>,
): UseMutationResult<{ message: string }, ApiError, any> {
  return useMutation<{ message: string }, ApiError, any>(async function ({
    data,
  }) {
    return await callApi({
      url: `${API_LIST.WholesaleOrders}/import`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }, options);
}

export function useGetInvoice(
  options?: UseMutationOptions<any, ApiError, any>,
): UseMutationResult<any, ApiError, any> {
  return useMutation<any, ApiError, any>(async function ({ id }) {
    return await callApi({
      url: `${API_LIST.WholesaleOrders}/${id}/invoice`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    });
  }, options);
}
