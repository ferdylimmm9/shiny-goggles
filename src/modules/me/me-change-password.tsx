import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { useChangePassword } from 'api-hooks/auth/mutation';
import { AuthKey } from 'api-hooks/auth/query';
import { queryClient } from 'common/query-client';
import Border from 'components/border';
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

import {
  ChangePasswordFormSchema,
  ChangePasswordFormType,
} from './me-form-type';
import MeView from './me-view';

export interface MeChangePasswordProps {
  onClose?: () => void;
}

export default function MeChangePassword(props: MeChangePasswordProps) {
  const defaultValues = React.useMemo<ChangePasswordFormType>(() => {
    return {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    };
  }, []);

  const resolver = yupResolver(ChangePasswordFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const changePassword = useChangePassword();

  const { back } = useRouter();
  const dismiss = props.onClose ?? back;

  const onSubmit = React.useCallback(
    async (values: ChangePasswordFormType) => {
      try {
        const result = await changePassword.mutateAsync(values);
        queryClient.refetchQueries({
          queryKey: AuthKey.me,
        });
        notification.success({
          title: 'Change Password',
          message: result.message,
        });
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Change Password',
            message: e.message,
          });
      }
    },
    [changePassword],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {!props.onClose && (
        <>
          <BreadCrumbs />
          <PageLabel mb={16} />
        </>
      )}
      <FormScroller>
        <FormContent>
          <MeView isView />
          <Space h={20} />
          <Border />
          <Space h={20} />
          <Flex direction="column" w="100%" gap={16}>
            <Input
              type="password"
              name="oldPassword"
              label="Old Password"
              placeholder="Old Password"
            />
            <Input
              type="password"
              name="password"
              label="New Password"
              placeholder="New Password"
            />
            <Input
              type="password"
              name="passwordConfirmation"
              label="New Password Confirmation"
              placeholder="New Password Confirmation"
            />
          </Flex>
        </FormContent>
        <FormFooter onClose={dismiss} />
      </FormScroller>
    </Form>
  );
}
