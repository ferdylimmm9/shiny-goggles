import { useCreateProduct } from 'api-hooks/product/mutation';
import { queryClient } from 'common/query-client';
import notification from 'components/notification';
import React from 'react';

import ProductForm from './components/product-form';
import { ProductFormType } from './components/product-form-type';

interface ProductCreateProps {
  onClose?: () => void;
}

export default function ProductCreate(props: ProductCreateProps) {
  const createProduct = useCreateProduct();
  const onSubmit = React.useCallback(
    async (values: ProductFormType) => {
      const result = await createProduct.mutateAsync(values);
      queryClient.invalidateQueries();
      notification.success({
        title: 'Add New Product',
        message: result.message,
      });
      return result;
    },
    [createProduct],
  );
  return <ProductForm onSubmit={onSubmit} onClose={props.onClose} />;
}
