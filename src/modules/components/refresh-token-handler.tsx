import { useRefreshTokenInput } from 'api-hooks/auth/mutation';
import { queryClient } from 'common/query-client';
import {
  clearTokenStorage,
  getTokenStorage,
  setTokenStorage,
} from 'common/utils/storage';
import { isWindowUndefined } from 'common/utils/string';
import notification from 'components/notification';
import { NavigationEnum } from 'constant/navigation';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import React from 'react';

export default function RefreshTokenHandler() {
  const { mutateAsync } = useRefreshTokenInput();
  const { replace } = useRouter();

  React.useEffect(() => {
    if (isWindowUndefined) return;

    const interval = setInterval(async () => {
      const currentTime = new Date().getTime();
      if (isWindowUndefined) return;
      const token = getTokenStorage();

      if (!token) return;

      const refreshTokenExpiredAt = token.refreshTokenExpiredAt;
      const isRefreshTokenExpired =
        currentTime > new Date(refreshTokenExpiredAt).getTime();

      if (isRefreshTokenExpired) {
        clearTokenStorage();
        return;
      }

      const exp = jwtDecode(token.accessToken).exp;
      const isAccessTokenExpired = exp
        ? currentTime > new Date(exp * 1000).getTime()
        : false;

      if (!isAccessTokenExpired) return;

      try {
        const result = await mutateAsync({ refreshToken: token.refreshToken });
        setTokenStorage({
          ...result.data,
          refreshTokenExpiredAt,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        clearTokenStorage();
        replace(NavigationEnum.Login);
        notification.error({
          message: e.message,
        });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
