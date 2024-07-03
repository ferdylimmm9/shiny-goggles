import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { MeModel } from 'api-hooks/auth/model';
import { useProfileUpdate } from 'api-hooks/auth/mutation';
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

import { MeFormSchema, MeFormType } from './me-form-type';
import MeView from './me-view';

interface MeFormProps {
  data: MeModel;
  onClose?: () => void;
}

export default function MeForm(props: MeFormProps) {
  const { data } = props;
  const defaultValues = React.useMemo<MeFormType>(() => {
    return {
      name: data.name,
      username: data.username,
      email: data.email,
    };
  }, [data.email, data.name, data.username]);

  const resolver = yupResolver(MeFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const profileUpdate = useProfileUpdate();

  const { back } = useRouter();
  const dismiss = props.onClose ?? back;

  const onSubmit = React.useCallback(
    async (values: MeFormType) => {
      try {
        const result = await profileUpdate.mutateAsync(values);
        queryClient.refetchQueries({
          queryKey: AuthKey.me,
        });
        notification.success({
          title: 'Update Profile',
          message: result.message,
        });
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Update Profile',
            message: e.message,
          });
      }
    },
    [profileUpdate],
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
          <MeView isView />
          <Space h={20} />
          <Border />
          <Space h={20} />
          <Flex direction="column" gap={12}>
            <Input type="text" name="name" label="Name" placeholder="Name" />
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Input type="text" name="email" label="Email" placeholder="Email" />
          </Flex>
        </FormContent>
        <FormFooter onClose={dismiss} />
      </FormScroller>
    </Form>
  );
}
