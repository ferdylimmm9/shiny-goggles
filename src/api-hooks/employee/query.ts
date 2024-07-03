import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  EmployeeLiteModel,
  EmployeeModel,
  getEmployeeInput,
  getEmployeesInput,
} from './model';

export const EmployeeKey = {
  employees: 'get-employees',
  employee: 'get-employee',
  employeesKey(input?: getEmployeesInput) {
    return [EmployeeKey.employees, input].filter(Boolean);
  },
  employeeKey(input: getEmployeeInput) {
    return [EmployeeKey.employee, input];
  },
} as const;

export function useGetEmployees({
  input,
  options,
}: {
  input?: getEmployeesInput;
  options?: UseQueryOptions<ExtendedApiResult<EmployeeLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: EmployeeKey.employeesKey(input),
    queryFn: () =>
      callApi(
        { url: API_LIST.Employees, params: input?.params },
        EmployeeLiteModel,
      ),
    ...options,
  });
}

export function useGetEmployee({
  input,
  options,
}: {
  input: getEmployeeInput;
  options?: UseQueryOptions<ApiResult<EmployeeModel>, ApiError>;
}) {
  return useQuery({
    queryKey: EmployeeKey.employeeKey(input),
    queryFn: () =>
      callApi({ url: `${API_LIST.Employees}/${input.id}` }, EmployeeModel),
    ...options,
  });
}
