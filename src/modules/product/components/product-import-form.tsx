import { Flex, Space } from '@mantine/core';
import { useImportProduct } from 'api-hooks/product/mutation';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ProductImportFormType } from './product-form-type';

interface ProductImportFormProps {
  onClose: () => void;
}

export default function ProductImportForm(props: ProductImportFormProps) {
  const defaultValues = React.useMemo<ProductImportFormType>(() => {
    return {
      file: [],
    };
  }, []);

  const methods = useForm({
    defaultValues,
  });

  const { mutateAsync } = useImportProduct();

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const formData = new FormData();
        const file = values.file[0];
        file && formData.append('file', file);
        const result = await mutateAsync({
          data: formData,
        });
        notification.success({
          message: result.message,
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
            <Input type="files" name="file" label="File" />
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
