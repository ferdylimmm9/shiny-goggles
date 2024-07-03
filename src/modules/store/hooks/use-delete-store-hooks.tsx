import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { StoreLiteModel, StoreModel } from 'api-hooks/store/model';
import { useDeleteStore } from 'api-hooks/store/mutation';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import React from 'react';
import { color } from 'styles/color';

export default function useDeleteStoreHooks() {
  const deleteStore = useDeleteStore();

  const onDelete = React.useCallback(
    async (id: string) => {
      try {
        const result = await deleteStore.mutateAsync({ id });
        notification.success({
          title: 'Delete Store',
          message: result.message,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Delete Store',
            message: e.message,
          });
      }
    },
    [deleteStore],
  );

  const onClickDelete = React.useCallback(
    (store: StoreLiteModel | StoreModel) => {
      const modalId = `delete-modal-${store.id}`;
      const onClose = () => modals.close(modalId);
      const label = [store.name, store.platform.name].join(' - ');
      const labelComponent = (
        <Text span fontWeightVariant="semibold">
          {label}
        </Text>
      );
      modals.open({
        modalId,
        withCloseButton: false,
        children: (
          <>
            <Flex align="center" gap={8} mb={8}>
              <InfoIcon width={24} height={24} color={color.red40} />
              <Text textVariant="body1" fontWeightVariant="semibold">
                Delete Store
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to delete the store {labelComponent} ?
            </Text>
            <SimpleGrid cols={deleteStore.isLoading ? 1 : 2}>
              {!deleteStore.isLoading && (
                <Button
                  onClick={onClose}
                  buttonVariants={{
                    color: 'quaternary',
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                loading={deleteStore.isLoading}
                onClick={async () => {
                  await onDelete(store.id);
                  onClose();
                }}
                buttonVariants={{
                  color: 'primary',
                }}
              >
                Delete
              </Button>
            </SimpleGrid>
          </>
        ),
      });
    },
    [deleteStore.isLoading, onDelete],
  );

  return {
    ...deleteStore,
    onDelete,
    onClickDelete,
  };
}
