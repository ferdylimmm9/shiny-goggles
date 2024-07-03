import { useCreateStore } from 'api-hooks/store/mutation';
import { queryClient } from 'common/query-client';
import notification from 'components/notification';
import React from 'react';

import StoreForm from './components/store-form';
import { StoreFormType } from './components/store-form-type';

interface StoreCreateProps {
  onClose?: () => void;
}

export default function StoreCreate(props: StoreCreateProps) {
  const createStore = useCreateStore();
  const onSubmit = React.useCallback(
    async (values: StoreFormType) => {
      const result = await createStore.mutateAsync(values);
      queryClient.invalidateQueries();
      notification.success({
        title: 'Add New Store',
        message: result.message,
      });
      return result;
    },
    [createStore],
  );
  return <StoreForm onSubmit={onSubmit} onClose={props.onClose} />;
}
