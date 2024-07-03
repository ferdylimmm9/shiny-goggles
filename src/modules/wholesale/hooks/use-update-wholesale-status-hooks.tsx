import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  WholesaleOrderLiteModel,
  WholesaleOrderModel,
  WholesaleOrderStatusType,
} from 'api-hooks/wholesale-order/model';
import { useUpdateWholesaleStatus } from 'api-hooks/wholesale-order/mutation';
import { WholesaleKey } from 'api-hooks/wholesale-order/query';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import React from 'react';
import { color } from 'styles/color';

export default function useUpdateWholesaleStatusHooks() {
  const updateWholesaleStatus = useUpdateWholesaleStatus();
  const onUpdate = React.useCallback(
    async (id: string, action: WholesaleOrderStatusType) => {
      try {
        const result = await updateWholesaleStatus.mutateAsync({
          id,
          action,
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesKey(),
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesStatsKey(),
        });
        notification.success({
          title: 'Update Wholesale Order',
          message: result.message,
        });
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Update Wholesale Order',
            message: e.message,
          });
      }
    },
    [updateWholesaleStatus],
  );

  const onClickUpdate = React.useCallback(
    (wholesale: WholesaleOrderModel | WholesaleOrderLiteModel) => {
      const modalId = `update-modal-${wholesale.id}`;
      const onClose = () => modals.close(modalId);
      const label = [wholesale.invoiceNumber, wholesale.customerName].join(
        ' - ',
      );
      const labelComponent = (
        <Text span fontWeightVariant="semibold">
          {label}
        </Text>
      );

      const action: WholesaleOrderStatusType =
        wholesale.status === 'paid' ? 'unpaid' : 'paid';
      modals.open({
        modalId,
        withCloseButton: false,
        children: (
          <>
            <Flex align="center" gap={8} mb={8}>
              <InfoIcon width={24} height={24} color={color.red40} />
              <Text textVariant="body1" fontWeightVariant="semibold">
                Update Wholesale Order
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to update the wholesale order status{' '}
              {labelComponent} to {action} ?
            </Text>
            <SimpleGrid cols={updateWholesaleStatus.isLoading ? 1 : 2}>
              {!updateWholesaleStatus.isLoading && (
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
                loading={updateWholesaleStatus.isLoading}
                onClick={async () => {
                  await onUpdate(wholesale.id, action);
                  onClose();
                }}
                buttonVariants={{
                  color: 'primary',
                }}
              >
                Confirm
              </Button>
            </SimpleGrid>
          </>
        ),
      });
    },
    [onUpdate, updateWholesaleStatus.isLoading],
  );

  return {
    ...updateWholesaleStatus,
    onUpdate,
    onClickUpdate,
  };
}
