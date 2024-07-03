import { Card, Drawer, Flex, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EmployeeLiteModel } from 'api-hooks/employee/model';
import { useGetEmployees } from 'api-hooks/employee/query';
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

import EmployeeFilterForm from './components/employee-filter-form';
import EmployeeCreate from './create';
import useDeleteEmployeeHooks from './hooks/use-delete-employee-hooks';
import EmployeeView from './view';

//default filter
const defaultQueryFilter = {
  page: 1,
  limit: 15,
  sort: 'created_at',
  q: '',
} as const;

export default function EmployeeList() {
  const { push } = useRouter();
  const permission = useCrudPermission('employees');
  const [employee, setEmployee] = React.useState<EmployeeLiteModel | undefined>(
    undefined,
  );
  const [isOpenForm, handleOpenForm] = useDisclosure();
  const generateList = useGenerateListComponent({
    // hooks
    queryFn: useGetEmployees,
    // set default-values of query filter
    input: { params: defaultQueryFilter },
    // sync with params
    synced: true,
    filterForm(setParams, close) {
      return (
        <EmployeeFilterForm
          onSubmit={(values) => setParams(values)}
          onClose={close}
        />
      );
    },
  });
  const isMobile = useCheckMobileScreen();

  const {
    pagination,
    drawerComponent,
    filterComponent,
    indexing = 0,
    onClickSort,
    sortMetaData,
  } = generateList;

  const { onClickDelete } = useDeleteEmployeeHooks();

  const onClickCreate = permission.create
    ? () => {
        if (isMobile) {
          push(NavigationEnum.EmployeeCreate);
          return;
        }
        setEmployee(undefined);
        handleOpenForm.open();
      }
    : undefined;

  const onClickDetail = permission.view
    ? (employee: EmployeeLiteModel) => {
        if (isMobile) {
          push({
            pathname: NavigationEnum.EmployeeView,
            query: { id: employee.id },
          });
        } else {
          setEmployee(employee);
          handleOpenForm.open();
        }
      }
    : undefined;

  const columns: ColumnType<EmployeeLiteModel>[] = [
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
      header: 'Username',
      accessorKey: 'username',
      sortName: 'username',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      sortName: 'email',
    },
    {
      header: 'Permissions',
      accessorKey: 'permissionCount',
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
                  onClickDetail={onClickDetail}
                  onClickDelete={permission.delete ? onClickDelete : undefined}
                />
              );
            },
          },
        ] as ColumnType<EmployeeLiteModel>[])
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
                sortMetaData={sortMetaData}
                onClickSort={onClickSort}
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
              title={employee ? 'Edit Staff' : 'Add New Staff'}
            />
            {employee ? (
              <EmployeeView onClose={handleOpenForm.close} id={employee.id} />
            ) : (
              <EmployeeCreate onClose={handleOpenForm.close} />
            )}
          </div>
        </Drawer>
      )}
    </ListContainer>
  );
}
