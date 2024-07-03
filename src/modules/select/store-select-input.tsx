import { ComboboxItem } from '@mantine/core';
import { StoreLiteModel } from 'api-hooks/store/model';
import { useGetStores } from 'api-hooks/store/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type StoreOptionType = ComboboxItem & {
  item: StoreLiteModel;
};

export interface StoreSelectInputProps
  extends Omit<SelectFieldProps, 'data' | 'type' | 'onAfterChange'> {
  onAfterChange?: (value: StoreOptionType) => void;
}

export function storeTransformer(item: StoreLiteModel): StoreOptionType {
  return {
    item,
    label: [item.name, item.platform.name].join(' - '),
    value: item.id,
  };
}

export default function StoreSelectInput(props: StoreSelectInputProps) {
  const { onAfterChange, ...rest } = props;

  const { data } = useGetStores({
    input: {
      params: {
        limit: -1,
      },
    },
  });

  const options = (data?.data || []).map((item) => {
    return storeTransformer(item);
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
