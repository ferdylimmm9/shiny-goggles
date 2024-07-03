import { SimpleGrid } from '@mantine/core';
import {
  getProductReportInput,
  getSalesReportInput,
} from 'api-hooks/report/model';
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

import { ReportFilterFormType } from './report-form-type';

const reset: ReportFilterFormType = {
  gross_profit_end: '',
  gross_profit_start: '',
  net_margin_end: '',
  net_margin_start: '',
  net_profit_end: '',
  net_profit_start: '',
  product_name: '',
  quantity_end: '',
  quantity_start: '',
  sales_end: '',
  sales_start: '',
  unit_price_end: '',
  unit_price_start: '',
  date_end: undefined,
  date_start: undefined,
};

interface ReportFilterFormProps {
  onSubmit: (values: getProductReportInput | getSalesReportInput) => void;
  onClose: () => void;
}

export default function ReportFilterForm(props: ReportFilterFormProps) {
  const { query } = useRouter();
  const stringify = qs.stringify(query);

  const defaultValues = React.useMemo<ReportFilterFormType>(() => {
    const { params }: getSalesReportInput | getProductReportInput = qs.parse(
      stringify,
    ) as any;

    const {
      gross_profit = '',
      net_margin = '',
      net_profit = '',
      product_name = '',
      quantity = '',
      sales = '',
      unit_price = '',
    } = params?.filter || {};

    const { date = '' } = params;

    const [gross_profit_start, gross_profit_end] =
      generateStringToNumbers(gross_profit);

    const [net_margin_start, net_margin_end] =
      generateStringToNumbers(net_margin);

    const [net_profit_start, net_profit_end] =
      generateStringToNumbers(net_profit);

    const [quantity_start, quantity_end] = generateStringToNumbers(quantity);

    const [sales_start, sales_end] = generateStringToNumbers(sales);

    const [unit_price_start, unit_price_end] =
      generateStringToNumbers(unit_price);

    const [date_start, date_end] = generateStringToDate(date);

    const values: ReportFilterFormType = {
      gross_profit_end,
      gross_profit_start,
      net_margin_end,
      net_margin_start,
      net_profit_end,
      net_profit_start,
      quantity_end,
      quantity_start,
      sales_end,
      sales_start,
      unit_price_end,
      unit_price_start,
      product_name: product_name || '',
      date_start,
      date_end,
    };

    return values;
  }, [stringify]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    (values: ReportFilterFormType) => {
      const filter = trimFilter({
        gross_profit: generateNumbersToString(
          values.gross_profit_start,
          values.gross_profit_end,
        ),
        net_margin: generateNumbersToString(
          values.net_margin_start,
          values.net_margin_end,
        ),
        net_profit: generateNumbersToString(
          values.net_profit_start,
          values.net_profit_end,
        ),
        product_name: values.product_name,
        quantity: generateNumbersToString(
          values.quantity_start,
          values.quantity_end,
        ),
        sales: generateNumbersToString(values.sales_start, values.sales_end),
        unit_price: generateNumbersToString(
          values.unit_price_start,
          values.unit_price_end,
        ),
      });
      props.onSubmit({
        params: {
          sort: (query['sort'] || '') as any,
          page: 1,
          filter,
          limit: -1,
          date: generateDatesToString(values.date_start, values.date_end),
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
          <Input
            type="text"
            name="product_name"
            label="Product Name"
            placeholder="Product Name"
            mb={16}
          />
          <SimpleGrid cols={2}>
            <Input type="date" name="date_start" label="Date" />
            <Input type="date" name="date_end" label=" " />
            <Input
              type="number"
              name="quantity_start"
              label="Quantity"
              placeholder="Quantity Start"
            />
            <Input
              type="number"
              name="quantity_end"
              label=" "
              placeholder="Quantity End"
            />
            <Input
              type="number"
              name="sales_start"
              label="Sales (Rp)"
              placeholder="Sales Start"
            />
            <Input
              type="number"
              name="sales_end"
              label=" "
              placeholder="Sales End"
            />
            <Input
              type="number"
              name="unit_price_start"
              label="Unit Price (Rp)"
              placeholder="Unit Price Start"
            />
            <Input
              type="number"
              name="unit_price_end"
              label=" "
              placeholder="Unit Price End"
            />
            <Input
              type="number"
              name="gross_profit_start"
              label="Gross Profit"
              placeholder="Gross Profit Start"
            />
            <Input
              type="number"
              name="gross_profit_end"
              label=" "
              placeholder="Gross Profit End"
            />
            <Input
              type="number"
              name="net_profit_start"
              label="Net Profit"
              placeholder="Net Profit Start"
            />
            <Input
              type="number"
              name="net_profit_end"
              label=" "
              placeholder="Net Profit End"
            />
            <Input
              type="number"
              name="net_margin_start"
              label="Net Margin (%)"
              placeholder="Net Margin Start"
            />
            <Input
              type="number"
              name="net_margin_end"
              label=" "
              placeholder="Net Margin End"
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
