import { SimpleGrid } from '@mantine/core';
import { getWholesalesInput } from 'api-hooks/wholesale-order/model';
import {
  generateDatesToString,
  generateNumbersToString,
  generateStringToDate,
  generateStringToNumbers,
  trimFilter,
} from 'common/utils/string';
import Form from 'components/form';
import Input from 'components/input';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';
import { useForm } from 'react-hook-form';

import { WholesaleFilterFormType } from './wholesale-form-type';
interface WholesaleFilterFormProps {
  onSubmit: (values: getWholesalesInput) => void;
  onClose: () => void;
}

const reset = {
  name: '',
  customer_address: '',
  fee: '',
  status: '',

  paid_at_start: null,
  paid_at_end: null,
} as const;

export default function WholesaleFilterForm(props: WholesaleFilterFormProps) {
  const { query } = useRouter();

  const stringify = qs.stringify(query);
  const defaultValues = React.useMemo<WholesaleFilterFormType>(() => {
    const { params }: getWholesalesInput = qs.parse(stringify) as any;

    const {
      customer_address = '',
      customer_name = '',
      invoice_number = '',
      paid_at = '',
      total_price = '',
      status = '',
    } = params?.filter || {};

    const [paid_at_start, paid_at_end] = generateStringToDate(paid_at);
    const [total_price_start, total_price_end] =
      generateStringToNumbers(total_price);
    const values = {
      customer_name: customer_name || '',
      customer_address: customer_address || '',
      invoice_number: invoice_number || '',
      total_price_start: total_price_start || '',
      total_price_end: total_price_end || '',
      status: status || '',
      paid_at_start: paid_at_start || null,
      paid_at_end: paid_at_end || null,
    };

    return values;
  }, [stringify]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    (values: WholesaleFilterFormType) => {
      //
      const paid_at = generateDatesToString(
        values.paid_at_start,
        values.paid_at_end,
      );
      const total_price = generateNumbersToString(
        values.total_price_start,
        values.total_price_end,
      );
      //
      const filter = trimFilter({
        paid_at,
        customer_address: values.customer_address,
        customer_name: values.customer_name,
        status: values.status,
        total_price,
        invoice_number: values.invoice_number,
      });
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

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormScroller isResponsive={false}>
        <FormContent>
          <SimpleGrid cols={1} mb={16}>
            <Input
              type="text"
              name="customer_name"
              label="Customer Name"
              placeholder="Customer Name"
            />
            <Input
              type="text"
              name="customer_address"
              label="Customer Address"
              placeholder="Customer Address"
            />
            <Input
              type="text"
              name="invoice_number"
              label="Invoice Number"
              placeholder="Invoice Number"
            />
          </SimpleGrid>
          <SimpleGrid cols={2} mb={16}>
            <Input type="date" name="paid_at_start" label="Paid At" />
            <Input type="date" name="paid_at_end" label=" " />
            <Input
              type="number"
              name="total_price_start"
              label="Total Price"
              placeholder="Total Price Start"
            />
            <Input
              type="number"
              name="total_price_end"
              label=" "
              placeholder="Total Price End"
            />
          </SimpleGrid>
          <Input
            type="radio"
            label="Status"
            name="status"
            data={[
              {
                label: 'Paid',
                value: 'paid',
              },
              {
                label: 'Unpaid',
                value: 'unpaid',
              },
            ]}
          />
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
