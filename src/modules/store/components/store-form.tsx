import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { StoreModel } from 'api-hooks/store/model';
import BreadCrumbs from 'components/bread-crumbs';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import PageLabel from 'components/page-label';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import PlatformSelectInput from 'modules/select/platform-select-input';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { StoreFormSchema, StoreFormType } from './store-form-type';

interface StoreFormProps {
  store?: StoreModel;
  onSubmit: (values: StoreFormType) => Promise<{ message: string } | undefined>;
  onClose?: () => void;
}

export default function StoreForm(props: StoreFormProps) {
  const { store } = props;

  const defaultValues = React.useMemo<StoreFormType>(() => {
    return {
      fee: store?.fee,
      name: store?.name ?? '',
      platform_id: store?.platform?.id ?? '',
      status: store?.status ?? true,
      data: store,
    } as unknown as StoreFormType;
  }, [store]);

  const resolver = yupResolver(StoreFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { back } = useRouter();
  const dismiss = props.onClose ?? back;

  const onSubmit = React.useCallback(
    async (values: StoreFormType) => {
      try {
        await props.onSubmit(values);
        dismiss();
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: props.store ? 'Update Store' : 'Add New Store',
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
            <PlatformSelectInput
              name="platform_id"
              label="Platform"
              placeholder="Platform"
            />
            <Input
              type="text"
              name="name"
              label="Store Name"
              placeholder="Store Name"
            />

            <Input type="number" name="fee" label="Fee" placeholder="Fee" />
          </Flex>
          <Input type="switch" label="Status" name="status" mt={16} />
          <Space h={12} />
        </FormContent>
        <FormFooter onClose={dismiss} />
      </FormScroller>
    </Form>
  );
}
