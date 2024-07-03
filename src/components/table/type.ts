import {
  TableTdProps,
  TableThProps,
  TableProps as RawTableProps,
} from '@mantine/core';

export type SortType = 'asc' | 'desc';
export type ColumnType<T> = {
  type?: 'default' | 'action';
  header: string;
  accessorKey: keyof T;
  sortName?: string;
  cellProps?: (row: T, data: T[]) => TableTdProps;
  headerCellProps?: (data: T[]) => TableThProps;
  footerCellProps?: (column: T[keyof T][], data: T[]) => TableThProps;
  footer?: (column: T[keyof T][], data: T[]) => React.ReactNode;
  cell?: (values: { row: T; index: number; data: T[] }) => any;
  minWidth?: number;
  maxWidth?: number;
  sorted?: SortType;
  textAlign?: React.CSSProperties['textAlign'];
};

export interface TableProps<T> extends Omit<RawTableProps, 'data'> {
  data: T[];
  columns: ColumnType<T>[];
  onClickRow?: (row: T, data: T[]) => void;
  onClickSort?: (sortName: string) => void;
  rowKey: (row: T) => React.Key;
  sortMetaData?: {
    sortName: string;
    sorted: SortType;
  };
}
