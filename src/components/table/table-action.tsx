import { Loader } from '@mantine/core';
import { DeleteIcon, Download2Icon, EditIcon } from 'assets/svg';
import React from 'react';
import { color } from 'styles/color';

interface TableActionProps<T> extends React.ComponentProps<'div'> {
  row: T;
  onClickDetail?: (row: T) => void;
  onClickDelete?: (row: T) => void;
  downloadMeta?: {
    loading?: boolean;
    onClickDownload: (row: T) => void;
  };
}

export default function TableAction<T>(props: TableActionProps<T>) {
  const { row, onClickDelete, onClickDetail, downloadMeta } = props;
  const size = 24;
  const editComponent = React.useCallback(
    (row: T) => {
      if (!onClickDetail) return null;
      return (
        <EditIcon
          width={size}
          height={size}
          color={color.neutral50}
          cursor="pointer"
          style={{
            flexShrink: 0,
          }}
          onClick={() => {
            onClickDetail(row);
          }}
        />
      );
    },
    [onClickDetail],
  );

  const deleteComponent = React.useCallback(
    (row: T) => {
      if (!onClickDelete) return null;
      return (
        <DeleteIcon
          width={size}
          height={size}
          color={color.neutral50}
          cursor="pointer"
          style={{
            flexShrink: 0,
          }}
          onClick={() => {
            onClickDelete?.(row);
          }}
        />
      );
    },
    [onClickDelete],
  );

  const downloadComponent = React.useCallback(
    (row: T) => {
      if (!downloadMeta) return null;
      if (downloadMeta.loading) {
        return <Loader size={size} />;
      }
      return (
        <Download2Icon
          width={size}
          height={size}
          color={color.neutral50}
          cursor="pointer"
          style={{
            flexShrink: 0,
          }}
          onClick={() => {
            downloadMeta.onClickDownload(row);
          }}
        />
      );
    },
    [downloadMeta],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: color.neutral50,
      }}
    >
      {editComponent(row)}
      {downloadComponent(row)}
      {deleteComponent(row)}
    </div>
  );
}
