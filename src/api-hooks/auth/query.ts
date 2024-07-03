import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { ApiError, ApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import { MeModel } from './model';

export const AuthKey = {
  permissions: ['get-me-permissions'],
  me: ['get-me'],
} as const;

export function useGetMe(props?: {
  options?: UseQueryOptions<ApiResult<MeModel>, ApiError>;
}): UseQueryResult<ApiResult<MeModel>, ApiError> {
  return useQuery({
    queryKey: AuthKey.me,
    queryFn: () => callApi({ url: API_LIST.Me }, MeModel),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...props?.options,
  });
}

export function useGetPermissions(props?: {
  options?: UseQueryOptions<{ data: string[] }, ApiError>;
}): UseQueryResult<{ data: string[] }, ApiError> {
  return useQuery({
    queryKey: AuthKey.permissions,
    queryFn: () => callApi({ url: `${API_LIST.Me}/permissions` }),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...props?.options,
  });
}
