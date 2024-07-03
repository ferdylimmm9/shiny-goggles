import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  getProductReportInput,
  getSalesReportInput,
  ProductReportModel,
  SalesReportModel,
  TotalModel,
} from './model';

export const ReportKey = {
  productReport: 'get-product-report',
  salesReport: 'get-sales-report',
  productReportKey(input?: getProductReportInput) {
    return [ReportKey.productReport, input];
  },
  salesReportKey(input?: getSalesReportInput) {
    return [ReportKey.salesReport, input];
  },
} as const;

export function useGetProductReport({
  input,
  options,
}: {
  input?: getProductReportInput;
  options?: UseQueryOptions<
    ExtendedApiResult<ProductReportModel[]> & TotalModel,
    ApiError
  >;
}) {
  return useQuery({
    queryKey: ReportKey.productReportKey(input),
    queryFn: () =>
      callApi(
        { url: `${API_LIST.Reports}/products`, params: input?.params },
        ProductReportModel,
      ),
    ...options,
  });
}

export function useGetSalesReport({
  input,
  options,
}: {
  input: getSalesReportInput;
  options?: UseQueryOptions<
    ExtendedApiResult<SalesReportModel[]> & {
      total: TotalModel;
    },
    ApiError
  >;
}) {
  return useQuery({
    ...options,
    queryKey: ReportKey.productReportKey(input),
    queryFn: () =>
      callApi(
        {
          url: `${API_LIST.Reports}/${input.storeId}/sales`,
          params: input?.params,
        },
        SalesReportModel,
      ),
    enabled: !!input?.storeId && (options?.enabled ?? true),
  });
}
