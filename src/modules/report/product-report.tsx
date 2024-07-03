import { Card, Flex, Space } from '@mantine/core';
import {
  getProductReportInput,
  ProductReportModel,
  TotalModel,
} from 'api-hooks/report/model';
import { useGetProductReport } from 'api-hooks/report/query';
import { ExportIcon } from 'assets/svg';
import { ModelTransformer } from 'common/utils/query-transfomer';
import { string2money } from 'common/utils/string';
import Button from 'components/button';
import LoaderView from 'components/loader-view';
import PageLabel from 'components/page-label';
import Table from 'components/table';
import { ColumnType } from 'components/table/type';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useGenerateListComponent from 'hooks/use-generate-list-component';
import useJsonToExcel from 'hooks/use-json-to-excel';
import ListContainer from 'modules/components/list-container';

import ReportFilterForm from './components/report-filter-form';
import ReportPreview from './components/report-preview';

const defaultQueryFilter: getProductReportInput['params'] = {
  page: 1,
  limit: -1,
  sort: 'product_name',
  q: '',
};

export default function ProductReport() {
  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetProductReport,
    // set default-values of query filter
    input: { params: defaultQueryFilter },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <ReportFilterForm
          onSubmit={(values) => setParams(values)}
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

  const columns: ColumnType<ProductReportModel>[] = [
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
  ];

  const isMobile = useCheckMobileScreen();
  const onExport = useJsonToExcel({
    data: generateList.data?.data || [],
    filename: 'product-report',
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
        {filterComponent}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
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
