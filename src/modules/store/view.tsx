import { useUpdateStore } from 'api-hooks/store/mutation';
import { useGetStore } from 'api-hooks/store/query';
import { queryClient } from 'common/query-client';
import LoaderView from 'components/loader-view';
import notification from 'components/notification';
import { useRouter } from 'next/router';
import React from 'react';

import StoreForm from './components/store-form';
import { StoreFormType } from './components/store-form-type';

interface StoreViewProps {
  id?: string;
  onClose?: () => void;
}

export default function StoreView(props: StoreViewProps) {
  const { query } = useRouter();
  const id = (props?.id ?? query.id) as string;
  const getStore = useGetStore({ input: { id } });

  const updateStore = useUpdateStore();
  const onSubmit = React.useCallback(
    async (values: StoreFormType) => {
      const result = await updateStore.mutateAsync({
        id,
        data: values,
      });
      queryClient.invalidateQueries();
      notification.success({
        title: 'Update Store',
        message: result.message,
      });
      return result;
    },
    [id, updateStore],
  );
  return (
    <LoaderView query={getStore}>
      {(data) => {
        return (
          <StoreForm
            store={data.data}
            onSubmit={onSubmit}
            onClose={props.onClose}
          />
        );
      }}
    </LoaderView>
  );
}
