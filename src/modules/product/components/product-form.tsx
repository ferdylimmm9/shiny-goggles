import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { ProductModel } from 'api-hooks/product/model';
import BreadCrumbs from 'components/bread-crumbs';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import PageLabel from 'components/page-label';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ProductFormSchema, ProductFormType } from './product-form-type';

interface ProductFormProps {
  product?: ProductModel;
  onSubmit: (
    values: ProductFormType,
  ) => Promise<{ message: string } | undefined>;
  onClose?: () => void;
}

export default function ProductForm(props: ProductFormProps) {
  const { product } = props;

  const defaultValues = React.useMemo<ProductFormType>(() => {
    return {
      vendor_name: product?.vendorName ?? '',
      tokopedia_name: product?.tokopediaName ?? '',
      shopee_name: product?.shopeeName ?? '',
      stock: product?.stock ?? undefined,
      total_buy_price: product?.totalBuyPrice ?? undefined,
      data: product,
    } as unknown as ProductFormType;
  }, [product]);

  const resolver = yupResolver(ProductFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { back } = useRouter();
  const dismiss = props.onClose ?? back;

  const onSubmit = React.useCallback(
    async (values: ProductFormType) => {
      try {
        await props.onSubmit(values);
        dismiss();
        // console.log(result);
      } catch (e) {
        console.error(e);
        e?.message &&
          notification.error({
            title: props.product ? 'Update Product' : 'Add New Product',
            message: e.message,
          });
      }
    },
    [dismiss, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {!props?.onClose && (
        <>
          <BreadCrumbs />
          <PageLabel mb={16} />
        </>
      )}
      <FormScroller>
        <FormContent>
          <Flex direction="column" gap={12}>
            <Input
              type="text"
              name="shopee_name"
              label="Shopee Name"
              placeholder="Shopee Name"
            />
            <Input
              type="text"
              name="tokopedia_name"
              label="Tokopedia Name"
              placeholder="Tokopedia Name"
            />
            <Input
              type="text"
              name="vendor_name"
              label="Vendor Name"
              placeholder="Vendor Name"
            />
            <Input
              type="number"
              name="stock"
              label="Stock"
              placeholder="Stock"
            />
            <Input
              type="number"
              name="total_buy_price"
              label="Total Buy Price"
              placeholder="Total Buy Price"
            />
          </Flex>
          <Space h={12} />
        </FormContent>
        <FormFooter onClose={dismiss} />
      </FormScroller>
    </Form>
  );
}
