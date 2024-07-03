import { Flex, Space } from '@mantine/core';
import { PlatformTypeEnum } from 'api-hooks/platform/model';
import { useImportSales } from 'api-hooks/product/mutation';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import FormContent from 'modules/components/form-content';
import FormFooter from 'modules/components/form-footer';
import FormScroller from 'modules/components/form-scroller';
import StoreSelectInput from 'modules/select/store-select-input';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ProductImportSalesFormType } from './product-form-type';

interface ProductImportSalesFormProps {
  onClose: () => void;
}

export default function ProductImportSalesForm(
  props: ProductImportSalesFormProps,
) {
  const [platformName, setPlatformName] =
    React.useState<PlatformTypeEnum | null>(null);
  const defaultValues = React.useMemo<ProductImportSalesFormType>(() => {
    return {
      incomeFile: [],
      orderFile: [],
      storeId: '',
    };
  }, []);

  const methods = useForm({
    defaultValues,
  });

  const { setValue } = methods;

  const { mutateAsync } = useImportSales();

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const formData = new FormData();
        const orderFile = values.orderFile[0];
        const incomeFile = values.incomeFile[0];
        orderFile && formData.append('order_file', orderFile);
        incomeFile && formData.append('income_file', incomeFile);
        const result = await mutateAsync({
          id: values.storeId,
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

  const filesComponent = React.useMemo(() => {
    switch (platformName) {
      case PlatformTypeEnum.Shopee:
        return (
          <>
            <Input type="files" name="orderFile" label="Order File" />
            <Input type="files" name="incomeFile" label="Income File" />
          </>
        );
      case PlatformTypeEnum.Tokopedia:
        return (
          <>
            <Input type="files" name="orderFile" label="Order File" />
          </>
        );
      default:
        return null;
    }
  }, [platformName]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormScroller>
        <FormContent>
          <Flex direction="column" gap={12}>
            <StoreSelectInput
              label="Store"
              placeholder="Select Store"
              name="storeId"
              onAfterChange={(value) => {
                setPlatformName(value.item.platform.name);
                setValue('incomeFile', []);
                setValue('orderFile', []);
              }}
            />
            {filesComponent}
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
