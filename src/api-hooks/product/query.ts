import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult, ExtendedApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  ProductLiteModel,
  ProductModel,
  getProductInput,
  getProductsInput,
} from './model';

export const ProductKey = {
  products: 'get-products',
  product: 'get-product',
  productsKey(input?: getProductsInput) {
    return [ProductKey.products, input].filter(Boolean);
  },
  productKey(input: getProductInput) {
    return [ProductKey.product, input];
  },
} as const;

export function useGetProducts({
  input,
  options,
}: {
  input?: getProductsInput;
  options?: UseQueryOptions<ExtendedApiResult<ProductLiteModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: ProductKey.productsKey(input),
    queryFn: () =>
      callApi(
        { url: API_LIST.Products, params: input?.params },
        ProductLiteModel,
      ),
    ...options,
  });
}

export function useGetProduct({
  input,
  options,
}: {
  input: getProductInput;
  options?: UseQueryOptions<ApiResult<ProductModel>, ApiError>;
}) {
  return useQuery({
    queryKey: ProductKey.productKey(input),
    queryFn: () =>
      callApi({ url: `${API_LIST.Products}/${input.id}` }, ProductModel),
    ...options,
  });
}
