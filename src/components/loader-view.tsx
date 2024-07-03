import { Loader } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import { UseQueryResult } from '@tanstack/react-query';
import { ApiError } from 'common/common.model';
import React from 'react';
import { color } from 'styles/color';

import Text from './text';

interface LoaderViewProps<T> {
  query: UseQueryResult<T, ApiError>;
  children: (data: T) => React.ReactNode;
}

export default function LoaderView<T>(props: LoaderViewProps<T>) {
  const { children, query } = props;
  const { status, data, error } = query;
  try {
    if (status === 'loading') {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader size={18} color={color.primary10} />
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <X size={24} color={color.red50} />
          <Text c={color.red50}>{error.message}</Text>
        </div>
      );
    }

    return children(data);
  } catch (error) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <X size={18} color={color.red90} />
        <Text>{error.message}</Text>
      </div>
    );
  }
}
