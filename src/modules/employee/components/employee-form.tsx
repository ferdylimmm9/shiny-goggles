import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { EmployeeModel } from 'api-hooks/employee/model';
import BreadCrumbs from 'components/bread-crumbs';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import PageLabel from 'components/page-label';
import Text from 'components/text';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EmployeeFormSchema, EmployeeFormType } from './employee-form-type';
import EmployeePermissionGroup from './employee-permission-group';

interface EmployeeFormProps {
  employee?: EmployeeModel;
  onSubmit: (
    values: EmployeeFormType,
  ) => Promise<{ message: string } | undefined>;
  onClose?: () => void;
}

export default function EmployeeForm(props: EmployeeFormProps) {
  const { employee } = props;

  const defaultValues = React.useMemo<EmployeeFormType>(() => {
    return {
      email: employee?.email || '',
      name: employee?.name || '',
      permissions: employee?.permissions || [],
      status: employee?.status ?? true,
      username: employee?.username || '',
      password: '',
      data: employee,
    };
  }, [employee]);

  const resolver = yupResolver(EmployeeFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { back } = useRouter();
  const dismiss = props.onClose ?? back;

  const onSubmit = React.useCallback(
    async (values: EmployeeFormType) => {
      try {
        await props.onSubmit(values);
        dismiss();
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: props.employee ? 'Update Staff' : 'Add New Staff',
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
            <Input type="text" name="name" label="Name" placeholder="Name" />
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Input type="text" name="email" label="Email" placeholder="Email" />
            {!employee && (
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
              />
            )}
          </Flex>

          <Space h={12} />
          <Text
            textVariant="body3"
            isResponsive={false}
            fontWeightVariant="semibold"
            mb={4}
          >
            Permissions
          </Text>
          <EmployeePermissionGroup />
          <Space h={12} />
          <Input type="switch" label="Status" name="status" />
        </FormContent>
        <FormFooter onClose={dismiss} />
      </FormScroller>
    </Form>
  );
}
