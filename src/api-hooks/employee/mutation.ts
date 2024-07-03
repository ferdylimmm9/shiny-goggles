import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  EmployeeDeleteType,
  EmployeeInputType,
  EmployeeUpdateType,
} from './model';

export function useCreateEmployee(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    EmployeeInputType
  >,
): UseMutationResult<{ message: string }, ApiError, EmployeeInputType> {
  return useMutation<{ message: string }, ApiError, EmployeeInputType>(
    async function (data) {
      return await callApi({
        url: API_LIST.Employees,
        data,
        method: 'POST',
      });
    },
    options,
  );
}

export function useUpdateEmployee(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    EmployeeUpdateType
  >,
): UseMutationResult<{ message: string }, ApiError, EmployeeUpdateType> {
  return useMutation<{ message: string }, ApiError, EmployeeUpdateType>(
    async function (value) {
      const { data, id } = value;
      return await callApi({
        url: `${API_LIST.Employees}/${id}`,
        data,
        method: 'PUT',
      });
    },
    options,
  );
}

export function useDeleteEmployee(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    EmployeeDeleteType
  >,
): UseMutationResult<{ message: string }, ApiError, EmployeeDeleteType> {
  return useMutation<{ message: string }, ApiError, EmployeeDeleteType>(
    async function ({ id }) {
      return await callApi({
        url: `${API_LIST.Employees}/${id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
