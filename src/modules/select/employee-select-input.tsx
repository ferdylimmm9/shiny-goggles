import { ComboboxItem } from '@mantine/core';
import { EmployeeLiteModel } from 'api-hooks/employee/model';
import { useGetEmployees } from 'api-hooks/employee/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type EmployeeOptionType = ComboboxItem & {
  item: EmployeeLiteModel;
};

export interface EmployeeSelectInputProps
  extends Omit<SelectFieldProps, 'data' | 'type' | 'onAfterChange'> {
  onAfterChange?: (value: EmployeeOptionType) => void;
}

export function employeeTransformer(
  item: EmployeeLiteModel,
): EmployeeOptionType {
  return {
    item,
    label: item.name,
    value: item.id,
  };
}

export default function EmployeeSelectInput(props: EmployeeSelectInputProps) {
  const { onAfterChange, ...rest } = props;

  const { data } = useGetEmployees({
    input: {
      params: {
        limit: -1,
      },
    },
  });

  const options = (data?.data || []).map((item) => {
    return employeeTransformer(item);
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
