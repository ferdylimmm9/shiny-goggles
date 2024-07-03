import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  WholesaleOrderLiteModel,
  WholesaleOrderModel,
} from 'api-hooks/wholesale-order/model';
import { useDeleteWholesale } from 'api-hooks/wholesale-order/mutation';
import { WholesaleKey } from 'api-hooks/wholesale-order/query';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import React from 'react';
import { color } from 'styles/color';

export default function useDeleteWholesaleHooks() {
  const deleteWholesale = useDeleteWholesale();

  const onDelete = React.useCallback(
    async (id: string) => {
      try {
        const result = await deleteWholesale.mutateAsync({ id });
        notification.success({
          title: 'Delete Wholesale Order',
          message: result.message,
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesKey(),
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesStatsKey(),
        });
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Delete Wholesale Order',
            message: e.message,
          });
      }
    },
    [deleteWholesale],
  );

  const onClickDelete = React.useCallback(
    (wholesale: WholesaleOrderLiteModel | WholesaleOrderModel) => {
      const modalId = `delete-modal-${wholesale.id}`;
      const onClose = () => modals.close(modalId);
      const label = [wholesale.invoiceNumber, wholesale.customerName].join(
        ' - ',
      );
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
                Delete Wholesale Order
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to delete the store {labelComponent} ?
            </Text>
            <SimpleGrid cols={deleteWholesale.isLoading ? 1 : 2}>
              {!deleteWholesale.isLoading && (
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
                loading={deleteWholesale.isLoading}
                onClick={async () => {
                  await onDelete(wholesale.id);
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
    [deleteWholesale.isLoading, onDelete],
  );

  return {
    ...deleteWholesale,
    onDelete,
    onClickDelete,
  };
}
