import { Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { FilterListIcon } from 'assets/svg';
import { ApiError, ExtendedApiResult } from 'common/common.model';
import Button from 'components/button';
import DrawerTitle from 'components/drawer/drawer-title';
import Pagination from 'components/pagination';
import { SortType } from 'components/table/type';
import Text from 'components/text';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';
import { color } from 'styles/color';

import useCheckMobileScreen from './use-check-mobile-screen';

interface UseGenerateListComponentProps<T = any, U = any> {
  queryFn: (props: {
    input?: U;
    options?: UseQueryOptions<ExtendedApiResult<T>, ApiError>;
  }) => UseQueryResult<ExtendedApiResult<T>, ApiError>;
  input: U;
  options?: UseQueryOptions<ExtendedApiResult<T>, ApiError>;
  synced?: boolean;
  filterForm: (
    setParams: React.Dispatch<React.SetStateAction<U | undefined>>,
    onClose: () => void,
  ) => React.ReactNode;
}

export default function useGenerateListComponent<T = any, U = any>(
  props: UseGenerateListComponentProps<T, U>,
) {
  const nextRouter = useRouter();
  const { route, replace, isReady } = nextRouter;
  const queryDefault = qs.stringify(nextRouter.query);
  const { input, queryFn, options, synced = true, filterForm } = props;
  const [params, setParams] = React.useState<U | undefined>(undefined);
  const [initiated, setInitiated] = React.useState(false);

  const query = queryFn({
    input: params,
    options: {
      ...options,
      enabled: isReady && params !== undefined,
    },
  });

  const [isOpenedFilter, { open, close }] = useDisclosure();

  const isMobile = useCheckMobileScreen();

  const status = query.status;

  const currentQuery = qs.stringify(params);

  React.useEffect(() => {
    if (!synced) return;
    if (!isReady) return;
    if (initiated) return;
    const parsed = queryDefault
      ? (qs.parse(queryDefault) as unknown as U)
      : input;
    const query = qs.stringify(parsed);
    setParams(parsed);
    replace(`${route}?${query}`);
    setInitiated(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiated, input, isReady, queryDefault, route, synced]);

  React.useEffect(() => {
    if (!synced) return;
    if (!isReady) return;
    if (!initiated) return;
    replace(`${route}?${currentQuery}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery, initiated, route, synced]);

  const filterComponent = (
    <Button
      buttonVariants={{
        color: 'quaternary',
        size: 'default',
      }}
      w="fit-content"
      onClick={open}
      miw={120}
      leftSection={
        <FilterListIcon width={24} height={24} color={color.primary30} />
      }
    >
      Filter
    </Button>
  );

  const drawerComponent = (
    <Drawer
      onClose={close}
      opened={isOpenedFilter}
      position="right"
      size="xl"
      withCloseButton={false}
      padding={0}
    >
      <div
        style={{
          position: 'relative',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <DrawerTitle close={close} title="Filter" />
        {filterForm(setParams, close)}
      </div>
    </Drawer>
  );

  if (status === 'loading' || status === 'error') {
    return {
      status,
      query,
      setParams,
      params,
      drawerComponent,
      filterComponent,
    };
  }

  const data = query?.data;
  const page = data?.meta?.currentPage;
  const sort = data?.sorts?.value || '';
  const limit = data?.meta?.perPage;
  const filters = data?.filters;
  const from = data?.meta?.from;
  const to = data?.meta?.to;
  const total = data?.meta?.lastPage;
  const lastPage = data?.meta?.lastPage;

  const onChangePage = (page: number) => {
    setParams((prev: any) => {
      const query = {
        ...prev,
        params: {
          ...prev?.params,
          page,
        },
      };

      return query;
    });
  };

  const onChangeLimit = (limit: number) => {
    setParams((prev: any) => {
      const query = {
        ...prev,
        params: {
          ...prev?.params,
          limit,
        },
      };

      return query;
    });
  };

  const paginationInformationComponent = (
    <Text textVariant="caption1" c={color.primary20}>
      Showing&nbsp;
      <Text
        textVariant="caption1"
        span
        fontWeightVariant="semibold"
        c={color.primary20}
      >
        {[from || 0, to || 0].join('-')}
      </Text>
      &nbsp; of&nbsp;
      <Text
        textVariant="caption1"
        span
        fontWeightVariant="semibold"
        c={color.primary20}
      >
        {total}
      </Text>
      &nbsp; result
    </Text>
  );

  const paginationComponent = (
    <Pagination
      total={lastPage}
      defaultValue={page}
      value={page}
      onChange={onChangePage}
    />
  );

  const pagination = (
    <Flex
      direction={isMobile ? 'column-reverse' : 'row'}
      justify={isMobile ? 'center' : 'space-between'}
      w="100%"
      gap={8}
      align="center"
    >
      {paginationInformationComponent}
      {paginationComponent}
    </Flex>
  );

  const indexing = (page - 1) * data.meta.perPage;

  const onClickSort = (sortName: string) => {
    if (sortName === sort) {
      setParams((prev: any) => {
        return {
          ...prev,
          params: {
            ...prev?.params,
            sort: '-' + sortName,
          },
        };
      });
      return;
    }

    setParams((prev: any) => {
      return {
        ...prev,
        params: {
          ...prev?.params,
          sort: sortName,
        },
      };
    });
  };

  const sortMetaData = sort
    ? ({
        sortName: sort.replace('-', ''),
        sorted: sort[0] === '-' ? 'desc' : 'asc',
      } as { sortName: string; sorted: SortType })
    : undefined;

  return {
    status,
    data,
    page,
    total,
    onChangePage,
    sort,
    limit,
    onChangeLimit,
    filters,
    params,
    setParams,
    query,
    from,
    to,
    lastPage,
    //component
    paginationInformationComponent,
    paginationComponent,
    filterComponent,
    drawerComponent,
    pagination,
    indexing,
    onClickSort,
    sortMetaData,
  };
}
