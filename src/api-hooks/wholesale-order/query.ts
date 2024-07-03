import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  getWholesaleInput,
  getWholesalesInput,
  WholesaleOrderLiteModel,
  WholesaleOrderModel,
  WholesaleStatsModel,
} from './model';

export const WholesaleKey = {
  wholesales: 'get-wholesales',
  wholesale: 'get-wholesale',
  wholesaleStats: 'get-wholesales-stats',
  wholesalesKey(input?: getWholesalesInput) {
    return [WholesaleKey.wholesales, input].filter(Boolean);
  },
  wholesalesStatsKey() {
    return [WholesaleKey.wholesaleStats];
  },
  wholesaleKey(input: getWholesaleInput) {
    return [WholesaleKey.wholesale, input];
  },
} as const;

export function useGetWholesales({
  input,
  options,
}: {
  input?: getWholesalesInput;
  options?: UseQueryOptions<
    ExtendedApiResult<WholesaleOrderLiteModel[]>,
    ApiError
  >;
}) {
  return useQuery({
    queryKey: WholesaleKey.wholesalesKey(input),
    queryFn: () =>
      callApi(
        { url: API_LIST.WholesaleOrders, params: input?.params },
        WholesaleOrderLiteModel,
      ),
    ...options,
  });
}

export function useGetWholesalesStats(params?: {
  options?: UseQueryOptions<ApiResult<WholesaleStatsModel>, ApiError>;
}) {
  return useQuery({
    queryKey: WholesaleKey.wholesalesStatsKey(),
    queryFn: () =>
      callApi(
        {
          url: [API_LIST.WholesaleOrders, 'stats'].join('/'),
        },
        WholesaleStatsModel,
      ),
    ...params?.options,
  });
}

export function useGetWholesale({
  input,
  options,
}: {
  input: getWholesaleInput;
  options?: UseQueryOptions<ApiResult<WholesaleOrderModel>, ApiError>;
}) {
  return useQuery({
    queryKey: WholesaleKey.wholesaleKey(input),
    queryFn: () =>
      callApi(
        { url: `${API_LIST.WholesaleOrders}/${input.id}` },
        WholesaleOrderModel,
      ),
    ...options,
  });
}
