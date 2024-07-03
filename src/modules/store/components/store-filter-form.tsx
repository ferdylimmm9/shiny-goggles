import { SimpleGrid } from '@mantine/core';
import { getStoresInput } from 'api-hooks/store/model';
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

import { StoreFilterFormType } from './store-form-type';
interface StoreFilterFormProps {
  onSubmit: (values: getStoresInput) => void;
  onClose: () => void;
}

const reset = {
  name: '',
  platform_name: '',
  fee: '',
  status: '',
  startAt: null,
  endAt: null,
} as const;

export default function StoreFilterForm(props: StoreFilterFormProps) {
  const { query } = useRouter();

  const stringify = qs.stringify(query);
  const defaultValues = React.useMemo<StoreFilterFormType>(() => {
    const { params }: getStoresInput = qs.parse(stringify) as any;

    const {
      name = '',
      platform_name = '',
      fee = '',
      created_at = '',
      status = null,
    } = params?.filter || {};

    const [startAt, endAt] = generateStringToDate(created_at);
    const [fee_start, fee_end] = generateStringToNumbers(fee);
    const values = {
      name: name || '',
      platform_name: platform_name || '',
      fee: fee || '',
      fee_start: fee_start || '',
      fee_end: fee_end || '',
      status: status || '',
      startAt: startAt || null,
      endAt: endAt || null,
    };

    return values;
  }, [stringify]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    (values: StoreFilterFormType) => {
      //
      const created_at = generateDatesToString(values.startAt, values.endAt);
      const fee = generateNumbersToString(values.fee_start, values.fee_end);
      const filter = trimFilter({
        created_at,
        platform_name: values.platform_name,
        name: values.name,
        status: values.status,
        fee,
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
              name="fee_start"
              label="Fee"
              placeholder="Fee Start"
            />
            <Input
              type="number"
              name="fee_end"
              label=" "
              placeholder="Fee End"
            />
          </SimpleGrid>
          <SimpleGrid cols={isMobile ? 1 : 2} mb={16}>
            <Input
              type="text"
              name="platform_name"
              label="Platform Name"
              placeholder="Platform Name"
            />
            <Input
              type="text"
              name="name"
              label="Store name"
              placeholder="Store name"
            />
          </SimpleGrid>
          <Input
            type="radio"
            label="Status"
            name="status"
            data={[
              {
                label: 'Active',
                value: 'Active',
              },
              {
                label: 'Inactive',
                value: 'Inactive',
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
