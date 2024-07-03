import { ComboboxItem } from '@mantine/core';
import { ProductLiteModel } from 'api-hooks/product/model';
import { useGetProducts } from 'api-hooks/product/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type ProductOptionType = ComboboxItem & {
  item: ProductLiteModel;
};

export interface ProductSelectInputProps
  extends Omit<SelectFieldProps, 'data' | 'type' | 'onAfterChange'> {
  onAfterChange?: (value: ProductOptionType) => void;
}

export function productTransformer(item: ProductLiteModel): ProductOptionType {
  return {
    item,
    label: [item.tokopediaName, item.shopeeName, item.vendorName].join(' - '),
    value: item.id,
  };
}

export default function ProductSelectInput(props: ProductSelectInputProps) {
  const { onAfterChange, ...rest } = props;

  const { data } = useGetProducts({
    input: {
      params: {
        limit: -1,
      },
    },
  });

  const options = (data?.data || []).map((item) => {
    return productTransformer(item);
  });

  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
