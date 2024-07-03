import { SimpleGrid } from '@mantine/core';
import { getProductsInput } from 'api-hooks/product/model';
import {
  generateDatesToString,
  generateNumbersToString,
  generateStringToDate,
  generateStringToNumbers,
  trimFilter,
} from 'common/utils/string';
import Form from 'components/form';
import Input from 'components/input';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ProductFilterFormType } from './product-form-type';
interface ProductFilterFormProps {
  onSubmit: (values: getProductsInput) => void;
  onClose: () => void;
}

const reset = {
  name: '',
  vendor_name: '',
  stock: '',
  total_buy_price: '',
  endAt: null,
  startAt: null,
};

export default function ProductFilterForm(props: ProductFilterFormProps) {
  const { query } = useRouter();
  const stringify = qs.stringify(query);

  const defaultValues = React.useMemo<ProductFilterFormType>(() => {
    const { params }: getProductsInput = qs.parse(stringify) as any;

    const {
      vendor_name = '',
      tokopedia_name = '',
      shopee_name = '',
      stock = '',
      total_buy_price = '',
      created_at = '',
    } = params?.filter || {};

    const [startAt, endAt] = generateStringToDate(created_at);
    const [total_buy_price_start, total_buy_price_end] =
      generateStringToNumbers(total_buy_price);
    const [stock_start, stock_end] = generateStringToNumbers(stock);

    const values = {
      vendor_name: vendor_name || '',
      tokopedia_name: tokopedia_name || '',
      shopee_name: shopee_name || '',
      stock: stock || '',
      startAt: startAt || null,
      endAt: endAt || null,
      total_buy_price_start: total_buy_price_start || '',
      total_buy_price_end: total_buy_price_end || '',
      stock_start: stock_start || '',
      stock_end: stock_end || '',
    };

    return values;
  }, [stringify]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    (values: ProductFilterFormType) => {
      //
      const created_at = generateDatesToString(values.startAt, values.endAt);
      const stock = generateNumbersToString(
        values.stock_start,
        values.stock_end,
      );
      const total_buy_price = generateNumbersToString(
        values.total_buy_price_start,
        values.total_buy_price_end,
      );

      const filter = trimFilter({
        created_at,
        stock,
        total_buy_price,
        shopee_name: values.shopee_name,
        tokopedia_name: values.tokopedia_name,
        vendor_name: values.vendor_name,
      });
      //
      props.onSubmit({
        params: {
          sort: (query['sort'] || '') as any,
          page: 1,
          filter,
          limit: 15,
        },
      });

      props.onClose();
    },
    [props, query],
  );

  const isMobile = useCheckMobileScreen();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormScroller isResponsive={false}>
        <FormContent>
          <SimpleGrid cols={2} mb={16}>
            <Input type="date" name="startAt" label="Created At" />
            <Input type="date" name="endAt" label=" " />
            <Input
              type="number"
              name="stock_start"
              label="Stock"
              placeholder="Stock Start"
            />
            <Input
              type="number"
              name="stock_end"
              label=" "
              placeholder="Stock End"
            />
            <Input
              type="number"
              name="total_buy_price_start"
              label="Total Buy Price"
              placeholder="Total Buy Price Start"
            />
            <Input
              type="number"
              name="total_buy_price_end"
              label=" "
              placeholder="Total Buy Price End"
            />
          </SimpleGrid>
          <SimpleGrid cols={isMobile ? 1 : 2}>
            <Input
              type="text"
              name="vendor_name"
              label="Vendor Name"
              placeholder="Vendor Name"
            />
            <Input
              type="text"
              name="tokopedia_name"
              label="Tokopedia name"
              placeholder="Tokopedia name"
            />
            <Input
              type="text"
              name="shopee_name"
              label="Shopee name"
              placeholder="Shopee name"
            />
          </SimpleGrid>
        </FormContent>

        <FormFooter
          secondaryButtonProps={{
            onClick: () => {
              methods.reset(reset);
              methods.handleSubmit(onSubmit)();
            },
            children: 'Reset Filter',
          }}
          submitButtonProps={{
            children: 'Apply Filters',
          }}
        />
      </FormScroller>
    </Form>
  );
}
