import { Card, Drawer, Flex, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductLiteModel } from 'api-hooks/product/model';
import { useGetProducts } from 'api-hooks/product/query';
import { ExportIcon } from 'assets/svg';
import { string2money } from 'common/utils/string';
import Button from 'components/button';
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
import useJsonToExcel from 'hooks/use-json-to-excel';
import CreateButton from 'modules/components/create-button';
import ListContainer from 'modules/components/list-container';
import StatusBadge from 'modules/components/status-badge';
import { useRouter } from 'next/router';
import React from 'react';

import ProductFilterForm from './components/product-filter-form';
import ProductImport from './components/product-import';
import ProductImportSales from './components/product-import-sales';
import ProductCreate from './create';
import useDeleteProductHooks from './hooks/use-delete-product-hooks';
import ProductView from './view';

//default filter
const defaultQueryFilter = {
  page: 1,
  limit: -1,
  sort: 'created_at',
  q: '',
} as const;

export default function ProductList() {
  const { push } = useRouter();
  const [product, setProduct] = React.useState<ProductLiteModel | undefined>(
    undefined,
  );
  const [isOpenForm, handleOpenForm] = useDisclosure();
  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetProducts,
    // set default-values of query filter
    input: { params: defaultQueryFilter },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <ProductFilterForm
          onSubmit={(values) => setParams(values)}
          onClose={close}
        />
      );
    },
  });
  const isMobile = useCheckMobileScreen();
  const permission = useCrudPermission('products');

  const {
    pagination,
    drawerComponent,
    filterComponent,
    indexing = 0,
    onClickSort,
    sortMetaData,
  } = generateList;

  const { onClickDelete } = useDeleteProductHooks();

  const onClickCreate = permission.create
    ? () => {
        if (isMobile) {
          push(NavigationEnum.ProductCreate);
          return;
        }
        setProduct(undefined);
        handleOpenForm.open();
      }
    : undefined;

  const onClickDetail = permission.view
    ? (product: ProductLiteModel) => {
        if (isMobile) {
          push({
            pathname: NavigationEnum.ProductView,
            query: { id: product.id },
          });
        } else {
          setProduct(product);
          handleOpenForm.open();
        }
      }
    : undefined;

  const columns: ColumnType<ProductLiteModel>[] = [
    {
      header: 'No',
      accessorKey: 'id',
      cell(values) {
        return indexing + values.index + 1;
      },
    },
    {
      header: 'Tokopedia Name',
      accessorKey: 'tokopediaName',
      sortName: 'tokopedia_name',
      minWidth: 300,
    },
    {
      header: 'Shopee Name',
      accessorKey: 'shopeeName',
      sortName: 'shopee_name',
      minWidth: 300,
    },
    {
      header: 'Vendor Name',
      accessorKey: 'vendorName',
      sortName: 'vendor_name',
      minWidth: 180,
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
      sortName: 'stock',
      textAlign: 'right',
      minWidth: 80,
      cell(values) {
        return string2money(values.row.stock);
      },
    },
    {
      header: 'Current Stock',
      accessorKey: 'currentStock',
      sortName: 'current_stock',
      minWidth: 120,
      textAlign: 'right',
      cell(values) {
        return string2money(values.row.currentStock);
      },
    },
    {
      header: 'Total Buy Price',
      accessorKey: 'totalBuyPrice',
      textAlign: 'right',
      sortName: 'total_buy_price',
      minWidth: 180,
      cell(values) {
        return string2money(values.row.totalBuyPrice);
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortName: 'status',
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
                  onClickDelete={permission.delete ? onClickDelete : undefined}
                  onClickDetail={onClickDetail}
                />
              );
            },
          },
        ] as ColumnType<ProductLiteModel>[])
      : []),
  ];

  const onExport = useJsonToExcel({
    data: generateList.data?.data || [],
    filename: 'product-list',
  });
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <ProductImport />
          <ProductImportSales />
          {!!generateList.data?.data?.length && (
            <Button onClick={onExport} leftSection={<ExportIcon />}>
              Export
            </Button>
          )}
          {permission.create && <CreateButton onClick={onClickCreate} />}
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
              title={product ? 'Edit Product' : 'Add New Product'}
            />
            {product ? (
              <ProductView onClose={handleOpenForm.close} id={product.id} />
            ) : (
              <ProductCreate onClose={handleOpenForm.close} />
            )}
          </div>
        </Drawer>
      )}
    </ListContainer>
  );
}
