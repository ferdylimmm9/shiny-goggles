import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import { PlatformLiteModel, getPlatformsInput } from './model';

export const PlatformKey = {
  platforms: 'get-platforms',
  platformsKey(input?: getPlatformsInput) {
    return [PlatformKey.platforms, input].filter(Boolean);
  },
} as const;

export function useGetPlatforms({
  input,
  options,
}: {
  input?: getPlatformsInput;
  options?: UseQueryOptions<ExtendedApiResult<PlatformLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: PlatformKey.platformsKey(input),
    queryFn: () =>
      callApi(
        { url: API_LIST.Platforms, params: input?.params },
        PlatformLiteModel,
      ),
    ...options,
  });
}
