import { useGetPermissions } from 'api-hooks/auth/query';
import { PermissionValuesType } from 'constant/permissions';
import React from 'react';

export default function useAuthorization() {
  const { data } = useGetPermissions();

  const permissions = React.useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const can = React.useCallback(
    (permission: PermissionValuesType) => {
      const isAllowed = (permissions || []).find((p) => permission === p);

      return !!isAllowed;
    },
    [permissions],
  );

  return { can, permissions };
}
