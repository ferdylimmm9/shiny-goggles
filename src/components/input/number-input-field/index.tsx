import { NumberInput, NumberInputProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';

import { numberInputStyles } from './styles.css';
import { useFormState } from '../../form';

export interface NumberInputFieldProps extends Omit<NumberInputProps, 'type'> {
  type: 'number';
  name: string;
  onAfterChange?: (value: string | number) => void;
}

export function RawNumberInput(props: NumberInputProps) {
  const { thousandSeparator = true, className, ...rest } = props;
  return (
    <NumberInput
      thousandSeparator={thousandSeparator}
      hideControls
      className={classNames(numberInputStyles, className)}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      radius={10}
      {...rest}
    />
  );
}

export default function NumberInputField(props: NumberInputFieldProps) {
  const { type, name, onAfterChange, disabled, readOnly, ...rest } = props;
  const formState = useFormState();

  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <RawNumberInput
      {...rest}
      {...field}
      hideControls
      disabled={_disabled}
      error={error}
      onChange={(val) => {
        field.onChange(val);
      }}
    />
  );
}
