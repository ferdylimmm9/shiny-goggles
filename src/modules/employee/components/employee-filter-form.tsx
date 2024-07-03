import { SimpleGrid } from '@mantine/core';
import { getEmployeesInput } from 'api-hooks/employee/model';
import {
  generateDatesToString,
  generateStringToDate,
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

import { EmployeeFilterFormType } from './employee-form-type';
interface EmployeeFilterFormProps {
  onSubmit: (values: getEmployeesInput) => void;
  onClose: () => void;
}

const reset = {
  email: '',
  endAt: null,
  startAt: null,
  name: '',
  status: '',
  username: '',
};

export default function EmployeeFilterForm(props: EmployeeFilterFormProps) {
  const { query } = useRouter();

  const stringify = qs.stringify(query);
  const defaultValues = React.useMemo<EmployeeFilterFormType>(() => {
    const { params }: getEmployeesInput = qs.parse(stringify) as any;

    const {
      email = '',
      name = '',
      username = '',
      created_at = '',
      status = '',
    } = params?.filter || {};

    const [startAt, endAt] = generateStringToDate(created_at);

    const values = {
      email: email || '',
      name: name || '',
      username: username || '',
      startAt: startAt || null,
      endAt: endAt || null,
      status: status || '',
    };

    return values;
  }, [stringify]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    (values: EmployeeFilterFormType) => {
      //
      const created_at = generateDatesToString(values.startAt, values.endAt);
      //
      const filter = trimFilter({
        created_at,
        email: values.email,
        name: values.name,
        status: values.status,
        username: values.username,
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

  const isMobile = useCheckMobileScreen();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormScroller isResponsive={false}>
        <FormContent>
          <SimpleGrid cols={2} mb={16}>
            <Input type="date" name="startAt" label="Created At" />
            <Input type="date" name="endAt" label=" " />
          </SimpleGrid>
          <SimpleGrid cols={isMobile ? 1 : 2} mb={16}>
            <Input type="text" name="name" label="Name" placeholder="Name" />
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Input type="text" name="email" label="Email" placeholder="Email" />
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
