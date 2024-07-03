import { Checkbox, CheckboxProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';
import { color } from 'styles/color';

import { checkboxStyles } from './styles.css';
import { useFormState } from '../../form';

export interface CheckboxFieldProps extends CheckboxProps {
  type: 'text' | 'email' | 'tel';
  name: string;
  onAfterChange?: (value: boolean) => void;
}

export function RawCheckbox(props: CheckboxProps) {
  const { className, ...rest } = props;

  return (
    <Checkbox
      radius={10}
      color={color.secondary70}
      className={classNames(checkboxStyles, className)}
      {...rest}
    />
  );
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { name, type, disabled, readOnly, onAfterChange, className, ...rest } =
    props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <RawCheckbox
      {...field}
      {...rest}
      disabled={_disabled}
      error={error}
      checked={field.value}
      onChange={(e) => {
        field.onChange(e.currentTarget.checked);
        onAfterChange?.(e.currentTarget.checked);
      }}
    />
  );
}
