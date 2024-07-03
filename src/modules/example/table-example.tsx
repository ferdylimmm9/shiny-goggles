import Table from 'components/table';
import TableAction from 'components/table/table-action';
import { ColumnType } from 'components/table/type';

export default function TableExample() {
  const data = [
    {
      id: '018f2fe3-9ef8-db4d-d3ff-9327ebee4b76',
      name: 'admin123',
      username: '0192321213',
      email: 'admin1234@gmail.com',
      permission_count: 0,
      status: true,
      created_at: '2024-04-30T16:43:17.681808Z',
      updated_at: '2024-05-02T02:33:21.328153Z',
    },
    {
      id: '018f3749-f610-2c16-6da9-758a6da478bf',
      name: 'Hanto',
      username: 'hanto123',
      email: 'hanto@gmail.com',
      permission_count: 1,
      status: true,
      created_at: '2024-05-02T03:12:25.109446Z',
      updated_at: '2024-05-02T03:12:25.109446Z',
    },
  ];

  const columns: ColumnType<(typeof data)[0]>[] = [
    {
      accessorKey: 'id',
      header: ' ',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated At',
    },
    {
      accessorKey: 'id',
      header: 'Action',
      type: 'action',
      minWidth: 70,
      cell(values) {
        return (
          <TableAction
            row={values.row}
            onClickDelete={() => {}}
            onClickDetail={() => {}}
            downloadMeta={{
              onClickDownload(row) {},
            }}
          />
        );
      },
    },
  ];
  return (
    <>
      <Table data={data} columns={columns} rowKey={(row) => row.id} />
    </>
  );
}
