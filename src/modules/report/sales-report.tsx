import { Card, Flex, Space } from '@mantine/core';
import {
  getSalesReportInput,
  SalesReportModel,
  TotalModel,
} from 'api-hooks/report/model';
import { useGetSalesReport } from 'api-hooks/report/query';
import { useGetStores } from 'api-hooks/store/query';
import { ExportIcon } from 'assets/svg';
import { ModelTransformer } from 'common/utils/query-transfomer';
import { string2money } from 'common/utils/string';
import Button from 'components/button';
import { RawSelect } from 'components/input/select-input-field';
import LoaderView from 'components/loader-view';
import PageLabel from 'components/page-label';
import Table from 'components/table';
import { ColumnType } from 'components/table/type';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useGenerateListComponent from 'hooks/use-generate-list-component';
import useJsonToExcel from 'hooks/use-json-to-excel';
import ListContainer from 'modules/components/list-container';
import { storeTransformer } from 'modules/select/store-select-input';
import React from 'react';

import ReportFilterForm from './components/report-filter-form';
import ReportPreview from './components/report-preview';

const defaultQueryFilter: getSalesReportInput['params'] = {
  date: '',
  page: 1,
  limit: -1,
  sort: 'product_name',
  q: '',
};

export default function SalesReport() {
  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetSalesReport,
    // set default-values of query filter
    input: { params: defaultQueryFilter, storeId: '' },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <ReportFilterForm
          onSubmit={(values) =>
            setParams((prev: any) => {
              return {
                ...prev,
                ...values,
              };
            })
          }
          onClose={close}
        />
      );
    },
  });

  const {
    pagination,
    drawerComponent,
    filterComponent,
    indexing = 0,
    onClickSort,
    sortMetaData,
  } = generateList;

  const columns: ColumnType<SalesReportModel>[] = [
    {
      header: 'No',
      accessorKey: 'productId',
      cell(values) {
        return indexing + values.index + 1;
      },
    },
    {
      header: 'Name',
      accessorKey: 'productName',
      sortName: 'product_name',
      minWidth: 300,
    },
    {
      header: 'Unit Price',
      accessorKey: 'unitPrice',
      sortName: 'unit_price',
      textAlign: 'right',
      minWidth: 100,
      cell(values) {
        return string2money(values.row.unitPrice);
      },
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      sortName: 'quantity',
      textAlign: 'right',
      minWidth: 100,
      cell(values) {
        return string2money(values.row.quantity);
      },
    },
    {
      header: 'Sales',
      accessorKey: 'sales',
      sortName: 'sales',
      textAlign: 'right',
      minWidth: 100,
      cell(values) {
        return string2money(values.row.sales);
      },
    },
    {
      header: 'Gross Profit',
      accessorKey: 'grossProfit',
      sortName: 'gross_profit',
      textAlign: 'right',
      minWidth: 100,
      cell(values) {
        return string2money(values.row.grossProfit);
      },
    },
    {
      header: 'Net Profit',
      accessorKey: 'netProfit',
      sortName: 'net_profit',
      textAlign: 'right',
      minWidth: 100,
      cell(values) {
        return string2money(values.row.netProfit);
      },
    },
    {
      header: 'Net Margin (%)',
      accessorKey: 'netMargin',
      textAlign: 'right',
      sortName: 'net_margin',
      minWidth: 120,
      cell(values) {
        return string2money(values.row.netMargin);
      },
    },
    {
      header: 'Platform',
      accessorKey: 'platform',
    },
  ];

  const isMobile = useCheckMobileScreen();

  const { data } = useGetStores({
    input: {
      params: {
        limit: -1,
      },
    },
  });

  const options = (data?.data || []).map((item) => {
    return storeTransformer(item);
  });

  const [isInitialize, setInitialize] = React.useState(false);

  React.useEffect(() => {
    if (!data?.data) return;
    if (isInitialize) return;
    const storeId = options?.[0]?.value || '';
    generateList.setParams((prev: any) => {
      return {
        ...prev,
        storeId,
      };
    });
    setInitialize(true);
  }, [data?.data, generateList, isInitialize, options]);

  const onExport = useJsonToExcel({
    data: generateList.data?.data || [],
    filename: 'sales-report',
  });
  return (
    <ListContainer>
      {/** Header */}
      <PageLabel />
      <Space h={isMobile ? 16 : 32} />
      {generateList.data && (
        <ReportPreview
          total={ModelTransformer((generateList.data as any).total, TotalModel)}
        />
      )}
      <Space h={isMobile ? 16 : 32} />
      {/** Filter Component */}
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={16}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <RawSelect
            styles={{
              input: {
                minWidth: 280,
                minHeight: 40,
              },
            }}
            onChange={(value) => {
              if (value === null) return;
              generateList.setParams((prev: any) => {
                return {
                  ...prev,
                  storeId: value,
                };
              });
            }}
            value={generateList.params?.storeId}
            data={options}
          />
          {filterComponent}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
          }}
        >
          {!!generateList.data?.data?.length && (
            <Button onClick={onExport} leftSection={<ExportIcon />}>
              Export
            </Button>
          )}
        </div>
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
                rowKey={(row) => row.productId}
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
