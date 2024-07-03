import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import { PermissionGroupModel, PermissionModel } from './model';

export const OtherKey = {
  permissionGroupKey: ['get-permission-group'],
  permissionKey: ['get-permission'],
} as const;

export function useGetPermissionGroups(props?: {
  options?: UseQueryOptions<PermissionGroupModel[], ApiError>;
}) {
  return useQuery({
    queryKey: OtherKey.permissionGroupKey,
    queryFn: () =>
      callApi({ url: API_LIST.PermissionGroups }, PermissionGroupModel),
    ...props?.options,
  });
}

export function useGetPermissions(props?: {
  options?: UseQueryOptions<PermissionModel[], ApiError>;
}) {
  return useQuery({
    queryKey: OtherKey.permissionKey,
    queryFn: () => callApi({ url: API_LIST.Permissions }, PermissionModel),
    ...props?.options,
  });
}
