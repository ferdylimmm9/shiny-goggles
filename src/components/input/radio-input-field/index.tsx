import { Radio, RadioGroupProps, RadioProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import { useController } from 'react-hook-form';
import { color } from 'styles/color';

import { radioGroupStyles } from './styles.css';
import { useFormState } from '../../form';

export interface RadioInputFieldProps
  extends Omit<RadioGroupProps, 'children'> {
  data: RadioProps[];
  type: 'radio';
  name: string;
  orientation?: 'horizontal' | 'vertical';
}
export function RawRadioInput(
  props: Omit<RadioInputFieldProps, 'name' | 'type' | 'children'>,
) {
  const { data, className, orientation = 'vertical', ...rest } = props;

  return (
    <Radio.Group
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      color={color.secondary70}
      {...rest}
    >
      <div className={classNames(radioGroupStyles({ orientation }), className)}>
        {data.map((radio) => {
          return (
            <Radio
              key={radio.value as any}
              {...radio}
              color={color.secondary70}
            />
          );
        })}
      </div>
    </Radio.Group>
  );
}

export default function RadioInputField(props: RadioInputFieldProps) {
  const { name, type, readOnly, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const error = fieldState?.error?.message;

  return (
    <RawRadioInput
      {...rest}
      {...field}
      onChange={(val) => field.onChange(val)}
      value={field.value}
      error={error}
      readOnly={readOnly || formState.disabled}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
    />
  );
}
