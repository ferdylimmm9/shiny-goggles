import { ComboboxItem } from '@mantine/core';
import { PlatformLiteModel } from 'api-hooks/platform/model';
import { useGetPlatforms } from 'api-hooks/platform/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type PlatformOptionType = ComboboxItem & {
  item: PlatformLiteModel;
};

export interface PlatformSelectInputProps
  extends Omit<SelectFieldProps, 'data' | 'type' | 'onAfterChange'> {
  onAfterChange?: (value: PlatformOptionType) => void;
}

export function platformTransformer(
  item: PlatformLiteModel,
): PlatformOptionType {
  return {
    item,
    label: item.name,
    value: item.id,
  };
}

export default function PlatformSelectInput(props: PlatformSelectInputProps) {
  const { onAfterChange, ...rest } = props;

  const { data } = useGetPlatforms({
    input: {
      params: {
        limit: -1,
      },
    },
  });

  const options = (data?.data || []).map((item) => {
    return platformTransformer(item);
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
