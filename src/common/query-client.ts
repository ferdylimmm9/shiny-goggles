import { QueryClient } from '@tanstack/react-query';
import { plainToClass } from 'class-transformer';

import { ExtendedApiResult, PaginationMeta } from './common.model';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: ((lastPage: ExtendedApiResult<any[]>, _: any) => {
        const newLastPage = {
          ...lastPage,
          meta: plainToClass(PaginationMeta, lastPage.meta),
        };
        return newLastPage.meta.currentPage !== newLastPage.meta.lastPage
          ? newLastPage.meta.currentPage + 1
          : undefined;
      }) as any,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: false,
    },
  },
});
