import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { ProductLiteModel, ProductModel } from 'api-hooks/product/model';
import { useDeleteProduct } from 'api-hooks/product/mutation';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import React from 'react';
import { color } from 'styles/color';

export default function useDeleteProductHooks() {
  const deleteProduct = useDeleteProduct();

  const onDelete = React.useCallback(
    async (id: string) => {
      try {
        const result = await deleteProduct.mutateAsync({ id });
        notification.success({
          title: 'Delete Product',
          message: result.message,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Delete Product',
            message: e.message,
          });
      }
    },
    [deleteProduct],
  );

  const onClickDelete = React.useCallback(
    (product: ProductLiteModel | ProductModel) => {
      const modalId = `delete-modal-${product.id}`;
      const onClose = () => modals.close(modalId);
      const label = [
        product.tokopediaName,
        product.shopeeName,
        product.vendorName,
      ].join(' - ');
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
                Delete Product
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to delete the product {labelComponent} ?
            </Text>
            <SimpleGrid cols={deleteProduct.isLoading ? 1 : 2}>
              {!deleteProduct.isLoading && (
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
                loading={deleteProduct.isLoading}
                onClick={async () => {
                  await onDelete(product.id);
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
    [deleteProduct.isLoading, onDelete],
  );

  return {
    ...deleteProduct,
    onDelete,
    onClickDelete,
  };
}
