import { Table as RawTable, TableScrollContainer } from '@mantine/core';
import { ArrowDropDownIcon, ArrowDropUpIcon } from 'assets/svg';
import { formatDateTime, isDate } from 'common/utils/date';
import Text from 'components/text';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import React from 'react';
import { color } from 'styles/color';

import { TableProps } from './type';

export default function Table<T>(props: TableProps<T>) {
  const {
    data,
    columns,
    onClickRow,
    rowKey,
    onClickSort, //click sort
    sortMetaData, //check sort
    ...restTable
  } = props;

  const isMobile = useCheckMobileScreen(); // responsive
  const height = isMobile ? 36 : 48; // fix the cell height

  const miw = (minWidth?: number) => minWidth; // fix the cell width
  const maw = (maxWidth?: number) => maxWidth; // fix the cell width

  // sort icon
  const sortIcon = React.useCallback(
    (sortName?: string) => {
      if (!sortMetaData) return null;
      if (!sortName) return null;

      const { sorted } = sortMetaData;

      if (sortMetaData.sortName !== sortName) return null;

      switch (sorted) {
        case 'asc':
          return <ArrowDropDownIcon cursor="pointer" width={24} height={24} />;
        case 'desc':
          return <ArrowDropUpIcon cursor="pointer" width={24} height={24} />;
        default:
          return null;
      }
    },
    [sortMetaData],
  );

  const stickyStyle: any = {
    position: 'sticky',
    zIndex: 2,
    right: 0,
    backgroundColor: color.neutral100,
  };

  // generate header cells
  const header = columns.map((column) => {
    const headerCellProps = column.headerCellProps?.(data);
    const type = column.type || 'default';
    const isAction = type === 'action';
    const isDefault = type === 'default';

    return (
      <RawTable.Th
        {...headerCellProps}
        style={{
          ...headerCellProps?.style,
          ...(isAction ? stickyStyle : {}),
          cursor: column.sortName ? 'pointer' : 'auto',
        }}
        miw={miw(column.minWidth)}
        maw={maw(column.maxWidth)}
        key={column.header}
        onClick={() => {
          if (!column.sortName) return;
          onClickSort?.(column.sortName as string);
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Text
            textVariant="body2"
            fontWeightVariant="semibold"
            c={color.primary10}
            miw={miw(column.minWidth)}
            maw={maw(column.maxWidth)}
          >
            {column.header}
          </Text>
          {isDefault && (
            <div style={{ color: color.primary70, height: 24, width: 24 }}>
              {sortIcon(column.sortName)}
            </div>
          )}
        </div>
      </RawTable.Th>
    );
  });

  // generate rows
  const rows = data.map((item, indexRow) => {
    return (
      <RawTable.Tr
        mih={height}
        mah={height}
        key={rowKey(item)}
        onClick={(e) => {
          e.stopPropagation();
          onClickRow?.(item, data);
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        {columns.map((column, index) => {
          const _data = item[column.accessorKey];
          const _cell = isDate(_data) ? formatDateTime(_data) : _data;
          const cell =
            column?.cell?.({ row: item, data, index: indexRow }) ?? _cell;
          const textAlign = column.textAlign || 'left';
          const cellProps = column.cellProps?.(item, data);
          const type = column.type || 'default';
          const isAction = type === 'action';
          const isDefault = type === 'default';

          return (
            <RawTable.Td
              {...cellProps}
              style={{
                ...cellProps?.style,
                ...(type === 'action' ? stickyStyle : {}),
              }}
              miw={isDefault ? miw(column.minWidth) : 64}
              maw={isDefault ? maw(column.maxWidth) : 64}
              key={index}
            >
              {isAction && cell}
              {isDefault && (
                <Text
                  w="100%"
                  textVariant="body3"
                  miw={miw(column.minWidth)}
                  maw={maw(column.maxWidth)}
                  fontWeightVariant="regular"
                  c={color.primary10}
                  ta={textAlign}
                >
                  {cell}
                </Text>
              )}
            </RawTable.Td>
          );
        })}
      </RawTable.Tr>
    );
  });

  //check has footer
  const hasFooter = !!columns.find((column) => !!column.footer);

  // generate footer
  const footer = (
    <RawTable.Tr mih={height} h="100%" mah={height}>
      {columns.map((column) => {
        const item = data.map((item) => item[column.accessorKey]);
        const footerCellProps = column.footerCellProps?.(item, data);
        const textAlign = column.textAlign || 'left';

        return (
          <RawTable.Th
            {...footerCellProps}
            miw={miw(column.minWidth)}
            maw={maw(column.maxWidth)}
            key={column.accessorKey as string}
            ta={textAlign}
          >
            {column.footer?.(item, data) ?? ' '}
          </RawTable.Th>
        );
      })}
    </RawTable.Tr>
  );

  return (
    <TableScrollContainer minWidth={800} h="100%">
      <RawTable
        borderColor={color.neutral90}
        stickyHeader
        withRowBorders
        highlightOnHover
        bg={color.neutral100}
        w="fit-content"
        styles={{
          table: {
            overflow: 'auto',
          },
        }}
        {...restTable}
      >
        <RawTable.Thead style={{ zIndex: 3 }}>
          <RawTable.Tr mih={height} h="100%" mah={height}>
            {header}
          </RawTable.Tr>
        </RawTable.Thead>
        <RawTable.Tbody>{rows}</RawTable.Tbody>
        {hasFooter && <RawTable.Tfoot>{footer}</RawTable.Tfoot>}
      </RawTable>
    </TableScrollContainer>
  );
}
