import { Card, Flex, Space } from '@mantine/core';
import { WholesaleOrderLiteModel } from 'api-hooks/wholesale-order/model';
import { useGetWholesales } from 'api-hooks/wholesale-order/query';
import { string2money } from 'common/utils/string';
import LoaderView from 'components/loader-view';
import PageLabel from 'components/page-label';
import Table from 'components/table';
import TableAction from 'components/table/table-action';
import { ColumnType } from 'components/table/type';
import { NavigationEnum } from 'constant/navigation';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useCrudPermission from 'hooks/use-crud-permission';
import useGenerateListComponent from 'hooks/use-generate-list-component';
import ListContainer from 'modules/components/list-container';
import { useRouter } from 'next/router';
import React from 'react';

import WholesaleFilterForm from './components/wholesale-filter-form';
import WholesaleImport from './components/wholesale-import';
import WholesaleStats from './components/wholesale-stats';
import WholesaleStatusSelect from './components/wholesale-status-select';
import useDeleteWholesaleHooks from './hooks/use-delete-wholesale-hooks';
import useGetInvoiceHooks from './hooks/use-get-invoice-hooks';

//default filter
const defaultQueryFilter = {
  page: 1,
  limit: 15,
  sort: 'created_at',
  q: '',
} as const;

export default function WholesaleList() {
  const { push } = useRouter();

  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetWholesales,
    // set default-values of query filter
    input: { params: defaultQueryFilter },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <WholesaleFilterForm
          onSubmit={(values) => setParams(values)}
          onClose={close}
        />
      );
    },
  });

  const isMobile = useCheckMobileScreen();
  const permission = useCrudPermission('wholesales');

  const {
    pagination,
    drawerComponent,
    filterComponent,
    indexing = 0,
    onClickSort,
    sortMetaData,
  } = generateList;

  const { onClickDelete } = useDeleteWholesaleHooks();

  const onClickDetail = permission.view
    ? (wholesale: WholesaleOrderLiteModel) => {
        push({
          pathname: NavigationEnum.WholesaleOrderView,
          query: { id: wholesale.id },
        });
      }
    : undefined;

  const {
    onClickDownload,
    isLoading: loadingDownload,
    permission: permissionDownload,
  } = useGetInvoiceHooks();

  const columns: ColumnType<WholesaleOrderLiteModel>[] = [
    {
      header: 'No',
      accessorKey: 'id',
      cell(values) {
        return indexing + values.index + 1;
      },
    },
    {
      header: 'Invoice Number',
      accessorKey: 'invoiceNumber',
      sortName: 'invoice_number',
      minWidth: 180,
      cell(values) {
        return values.row.invoiceNumber;
      },
    },
    {
      header: 'Customer Name',
      accessorKey: 'customerName',
      sortName: 'customer_name',
      minWidth: 180,
      cell(values) {
        return values.row.customerName;
      },
    },
    {
      header: 'Customer Address',
      accessorKey: 'customerAddress',
      sortName: 'customer_address',
      minWidth: 180,
      cell(values) {
        return values.row.customerAddress;
      },
    },
    {
      header: 'Total Price',
      accessorKey: 'totalPrice',
      textAlign: 'right',
      sortName: 'total_price',
      minWidth: 180,
      cell(values) {
        return string2money(values.row.totalPrice);
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      minWidth: 90,
      cell(values) {
        return <WholesaleStatusSelect data={values.row} />;
      },
    },
    {
      header: 'Paid At',
      accessorKey: 'paidAt',
      sortName: 'paid_at',
      minWidth: 180,
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
    ...(permission.view || permission.delete || permissionDownload
      ? ([
          {
            type: 'action',
            header: 'Action',
            accessorKey: 'id',
            minWidth: 70,
            cell({ row }) {
              return (
                <TableAction
                  onClickDetail={onClickDetail}
                  row={row}
                  onClickDelete={permission.delete ? onClickDelete : undefined}
                  downloadMeta={{
                    loading: loadingDownload,
                    onClickDownload(row) {
                      onClickDownload(row.id);
                    },
                  }}
                />
              );
            },
          },
        ] as ColumnType<WholesaleOrderLiteModel>[])
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
        <WholesaleImport />
      </Flex>
      <Space h={isMobile ? 12 : 20} />
      {/** Table */}
      <WholesaleStats />
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
    </ListContainer>
  );
}
