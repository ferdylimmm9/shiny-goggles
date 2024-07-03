import { Flex, SelectProps, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  WholesaleOrderLiteModel,
  WholesaleOrderModel,
} from 'api-hooks/wholesale-order/model';
import { useUpdateWholesaleStatus } from 'api-hooks/wholesale-order/mutation';
import { WholesaleKey } from 'api-hooks/wholesale-order/query';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import { RawSelect } from 'components/input/select-input-field';
import notification from 'components/notification';
import Text from 'components/text';
import { PERMISSIONS } from 'constant/permissions';
import useAuthorization from 'hooks/use-authorization';
import React from 'react';
import { color } from 'styles/color';

interface WholesaleStatusSelectProps extends Omit<SelectProps, 'data'> {
  data: WholesaleOrderLiteModel | WholesaleOrderModel;
}

export default function WholesaleStatusSelect(
  props: WholesaleStatusSelectProps,
) {
  const id = props.data.id;
  const status = props.data.status;
  const wholesale = props.data;

  const { can } = useAuthorization();
  const { mutateAsync, isLoading } = useUpdateWholesaleStatus();
  const data = React.useMemo(() => {
    return [
      {
        label: 'Paid',
        value: 'paid',
        disabled: !can(PERMISSIONS.UpdateWholesaleOrderToPaid),
      },
      {
        label: 'Unpaid',
        value: 'unpaid',
        disabled: !can(PERMISSIONS.UpdateWholesaleOrderToPaid),
      },
    ];
  }, [can]);

  const value = React.useMemo(() => {
    return data.find((option) => {
      return option.value === props.data.status;
    })?.value;
  }, [data, props.data.status]);

  const onUpdate = React.useCallback(
    async (action: any) => {
      try {
        const response = await mutateAsync({
          action,
          id,
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesKey(),
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesStatsKey(),
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesaleKey({ id }),
        });
        notification.success({
          message: response.message,
        });
      } catch (e) {
        console.error(e);
        notification.error({
          message: e.message,
        });
      }
    },
    [id, mutateAsync],
  );

  const onChange = React.useCallback(
    async (value: string | null) => {
      if (!value) return;
      const modalId = `update-modal-${id}`;
      const onClose = () => modals.close(modalId);
      const nextStatus = status === 'paid' ? 'unpaid' : 'paid';
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
              <InfoIcon width={24} height={24} color={color.blue40} />
              <Text textVariant="body1" fontWeightVariant="semibold">
                Update Status Wholesale Order
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to update the wholesale order status{' '}
              {labelComponent} to {status} from {nextStatus} ?
            </Text>
            <SimpleGrid cols={isLoading ? 1 : 2}>
              {!isLoading && (
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
                loading={isLoading}
                onClick={async () => {
                  await onUpdate(value);
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
    [
      id,
      isLoading,
      onUpdate,
      status,
      wholesale.customerName,
      wholesale.invoiceNumber,
    ],
  );

  return (
    <RawSelect
      styles={{
        input: {
          backgroundColor: status === 'paid' ? color.green90 : color.red90,
          color: status === 'paid' ? color.green40 : color.red40,
          borderColor: status === 'paid' ? color.green90 : color.red90,
        },
      }}
      {...props}
      data={data}
      searchable
      value={value}
      onChange={onChange}
      clearable={false}
    />
  );
}
