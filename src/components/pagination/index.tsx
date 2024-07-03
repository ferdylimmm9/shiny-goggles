import {
  Pagination as RawPagination,
  PaginationProps as RawPaginationProps,
} from '@mantine/core';
import { color } from 'styles/color';

import { PaginationStyle } from './styles.css';

interface PaginationProps extends RawPaginationProps {}

export default function Pagination(props: PaginationProps) {
  return (
    <RawPagination
      {...props}
      classNames={PaginationStyle}
      styles={{
        root: {
          '--pagination-active-bg': color.secondary70,
          '--pagination-active-color': color.neutral100,
        },
      }}
    />
  );
}
