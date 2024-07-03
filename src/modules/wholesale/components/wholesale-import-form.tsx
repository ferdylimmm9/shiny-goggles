import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Space } from '@mantine/core';
import { useImportWholesale } from 'api-hooks/wholesale-order/mutation';
import { WholesaleKey } from 'api-hooks/wholesale-order/query';
import { queryClient } from 'common/query-client';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  WholesaleImportFormSchema,
  WholesaleImportFormType,
} from './wholesale-form-type';

interface WholesaleImportFormProps {
  onClose: () => void;
}

export default function WholesaleImportForm(props: WholesaleImportFormProps) {
  const defaultValues = React.useMemo<WholesaleImportFormType>(() => {
    return {
      customer_name: '',
      customer_address: '',
      files: [],
    };
  }, []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(WholesaleImportFormSchema()),
  });

  const { mutateAsync } = useImportWholesale();

  const onSubmit = React.useCallback(
    async (values: WholesaleImportFormType) => {
      try {
        const formData = new FormData();
        const file = values.files[0];
        formData.append('customer_name', values.customer_name);
        formData.append('customer_address', values.customer_address);
        file && formData.append('file', file);

        const result = await mutateAsync({
          data: formData,
        });
        notification.success({
          message: result.message,
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesKey(),
        });
        queryClient.refetchQueries({
          queryKey: WholesaleKey.wholesalesStatsKey(),
        });
        props.onClose();
      } catch (e) {
        console.error(e);
        e?.message &&
          notification.error({
            title: 'Import Data',
            message: e.message,
          });
      }
    },
    [mutateAsync, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormScroller>
        <FormContent>
          <Flex direction="column" gap={12}>
            <Input type="text" name="customer_name" label="Customer Name" />
            <Input
              type="text"
              name="customer_address"
              label="Customer Address"
            />
            <Input type="files" name="files" label="File" />
          </Flex>
          <Space h={12} />
        </FormContent>
        <FormFooter
          onClose={props.onClose}
          submitButtonProps={{
            children: 'Import Data',
          }}
        />
      </FormScroller>
    </Form>
  );
}
