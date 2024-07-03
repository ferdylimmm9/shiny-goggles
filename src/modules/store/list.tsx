import { Card, Drawer, Flex, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { StoreLiteModel } from 'api-hooks/store/model';
import { useGetStores } from 'api-hooks/store/query';
import { string2money } from 'common/utils/string';
import DrawerTitle from 'components/drawer/drawer-title';
import LoaderView from 'components/loader-view';
import PageLabel from 'components/page-label';
import Table from 'components/table';
import TableAction from 'components/table/table-action';
import { ColumnType } from 'components/table/type';
import { NavigationEnum } from 'constant/navigation';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useCrudPermission from 'hooks/use-crud-permission';
import useGenerateListComponent from 'hooks/use-generate-list-component';
import CreateButton from 'modules/components/create-button';
import ListContainer from 'modules/components/list-container';
import StatusBadge from 'modules/components/status-badge';
import { useRouter } from 'next/router';
import React from 'react';

import StoreFilterForm from './components/store-filter-form';
import StoreCreate from './create';
import useDeleteStoreHooks from './hooks/use-delete-store-hooks';
import StoreView from './view';

//default filter
const defaultQueryFilter = {
  page: 1,
  limit: 15,
  sort: 'created_at',
  q: '',
} as const;

export default function StoreList() {
  const { push } = useRouter();
  const [store, setStore] = React.useState<StoreLiteModel | undefined>(
    undefined,
  );
  const [isOpenForm, handleOpenForm] = useDisclosure();
  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetStores,
    // set default-values of query filter
    input: { params: defaultQueryFilter },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <StoreFilterForm
          onSubmit={(values) => setParams(values)}
          onClose={close}
        />
      );
    },
  });
  const isMobile = useCheckMobileScreen();
  const permission = useCrudPermission('stores');

  const {
    pagination,
    drawerComponent,
    filterComponent,
    indexing = 0,
    onClickSort,
    sortMetaData,
  } = generateList;

  const { onClickDelete } = useDeleteStoreHooks();

  const onClickCreate = permission.create
    ? () => {
        if (isMobile) {
          push(NavigationEnum.StoreCreate);
          return;
        }
        setStore(undefined);
        handleOpenForm.open();
      }
    : undefined;

  const onClickDetail = permission.view
    ? (store: StoreLiteModel) => {
        if (isMobile) {
          push({
            pathname: NavigationEnum.StoreView,
            query: { id: store.id },
          });
        } else {
          setStore(store);
          handleOpenForm.open();
        }
      }
    : undefined;

  const columns: ColumnType<StoreLiteModel>[] = [
    {
      header: 'No',
      accessorKey: 'id',
      cell(values) {
        return indexing + values.index + 1;
      },
    },
    {
      header: 'Name',
      accessorKey: 'name',
      sortName: 'name',
    },
    {
      header: 'Platform',
      accessorKey: 'platform',
      sortName: 'platform_name',
      cell(values) {
        return values.row.platform.name;
      },
    },
    {
      header: 'Fee',
      accessorKey: 'fee',
      textAlign: 'right',
      sortName: 'fee',
      cell(values) {
        return string2money(values.row.fee);
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell(values) {
        return <StatusBadge status={values.row.status} />;
      },
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      sortName: 'created_at',
      minWidth: 180,
    },
    {
      header: 'Updated At',
      accessorKey: 'updatedAt',
      minWidth: 180,
    },
    ...(permission.create || permission.delete
      ? ([
          {
            type: 'action',
            header: 'Action',
            accessorKey: 'id',
            minWidth: 64,
            cell({ row }) {
              return (
                <TableAction
                  row={row}
                  onClickDetail={onClickDetail}
                  onClickDelete={permission.delete ? onClickDelete : undefined}
                />
              );
            },
          },
        ] as ColumnType<StoreLiteModel>[])
      : []),
  ];

  return (
    <ListContainer>
      {/** Header */}
      <PageLabel />
      <Space h={isMobile ? 16 : 32} />
      {/** Filter Component */}
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={16}
      >
        {filterComponent}
        {permission.create && <CreateButton onClick={onClickCreate} />}
      </Flex>
      <Space h={isMobile ? 12 : 20} />
      {/** Table */}
      <Card radius={isMobile ? 4 : 12} flex={1}>
        <LoaderView query={generateList.query}>
          {({ data }) => {
            return (
              <Table
                data={data}
                columns={columns}
                rowKey={(row) => row.id}
                onClickSort={onClickSort}
                sortMetaData={sortMetaData}
              />
            );
          }}
        </LoaderView>
      </Card>
      <Space h={isMobile ? 24 : 28} />
      {/** Pagination Component */}
      {pagination}
      {/** Filter Drawer */}
      {drawerComponent}
      {!isMobile && (
        <Drawer
          opened={isOpenForm}
          closeOnClickOutside={false}
          withCloseButton={false}
          onClose={handleOpenForm.close}
          padding={0}
          position="right"
          size="xl"
        >
          <div
            style={{
              position: 'relative',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <DrawerTitle
              close={handleOpenForm.close}
              title={store ? 'Edit Store' : 'Add New Store'}
            />
            {store ? (
              <StoreView onClose={handleOpenForm.close} id={store.id} />
            ) : (
              <StoreCreate onClose={handleOpenForm.close} />
            )}
          </div>
        </Drawer>
      )}
    </ListContainer>
  );
}
