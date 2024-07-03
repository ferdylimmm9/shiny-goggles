import { useUpdateProduct } from 'api-hooks/product/mutation';
import { useGetProduct } from 'api-hooks/product/query';
import { queryClient } from 'common/query-client';
import LoaderView from 'components/loader-view';
import notification from 'components/notification';
import { useRouter } from 'next/router';
import React from 'react';

import ProductForm from './components/product-form';
import { ProductFormType } from './components/product-form-type';

interface ProductViewProps {
  id?: string;
  onClose?: () => void;
}

export default function ProductView(props: ProductViewProps) {
  const { query } = useRouter();
  const id = (props?.id ?? query.id) as string;
  const getProduct = useGetProduct({ input: { id } });

  const updateProduct = useUpdateProduct();
  const onSubmit = React.useCallback(
    async (values: ProductFormType) => {
      const result = await updateProduct.mutateAsync({
        id,
        data: values,
      });
      queryClient.invalidateQueries();
      notification.success({
        title: 'Update Product',
        message: result.message,
      });
      return result;
    },
    [id, updateProduct],
  );
  return (
    <LoaderView query={getProduct}>
      {(data) => {
        return (
          <ProductForm
            product={data.data}
            onSubmit={onSubmit}
            onClose={props.onClose}
          />
        );
      }}
    </LoaderView>
  );
}
