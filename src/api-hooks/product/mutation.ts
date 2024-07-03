import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  ImportProductType,
  ImportSalesType,
  ProductDeleteType,
  ProductInputType,
  ProductUpdateType,
} from './model';

export function useCreateProduct(
  options?: UseMutationOptions<{ message: string }, ApiError, ProductInputType>,
): UseMutationResult<{ message: string }, ApiError, ProductInputType> {
  return useMutation<{ message: string }, ApiError, ProductInputType>(
    async function (data) {
      return await callApi({
        url: API_LIST.Products,
        data,
        method: 'POST',
      });
    },
    options,
  );
}

export function useUpdateProduct(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    ProductUpdateType
  >,
): UseMutationResult<{ message: string }, ApiError, ProductUpdateType> {
  return useMutation<{ message: string }, ApiError, ProductUpdateType>(
    async function (value) {
      const { data, id } = value;
      return await callApi({
        url: `${API_LIST.Products}/${id}`,
        data,
        method: 'PUT',
      });
    },
    options,
  );
}

export function useDeleteProduct(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    ProductDeleteType
  >,
): UseMutationResult<{ message: string }, ApiError, ProductDeleteType> {
  return useMutation<{ message: string }, ApiError, ProductDeleteType>(
    async function ({ id }) {
      return await callApi({
        url: `${API_LIST.Products}/${id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}

export function useImportSales(
  options?: UseMutationOptions<{ message: string }, ApiError, ImportSalesType>,
): UseMutationResult<{ message: string }, ApiError, ImportSalesType> {
  return useMutation<{ message: string }, ApiError, ImportSalesType>(
    async function ({ id, data }) {
      return await callApi({
        url: `${API_LIST.Products}/${id}/import-sales`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      });
    },
    options,
  );
}

export function useImportProduct(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    ImportProductType
  >,
): UseMutationResult<{ message: string }, ApiError, ImportProductType> {
  return useMutation<{ message: string }, ApiError, ImportProductType>(
    async function ({ data }) {
      return await callApi({
        url: `${API_LIST.Products}/import`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      });
    },
    options,
  );
}
