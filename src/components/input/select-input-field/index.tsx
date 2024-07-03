import { ComboboxItem, Select, SelectProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';

import { selectStyles } from './styles.css';
import { useFormState } from '../../form';

export interface SelectFieldProps extends SelectProps {
  type: 'select';
  name: string;
  onAfterChange?: (value: ComboboxItem) => void;
}

export function RawSelect(props: SelectProps) {
  const { className, ...rest } = props;

  return (
    <Select
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(selectStyles, className)}
      {...rest}
    />
  );
}

export default function SelectField(props: SelectFieldProps) {
  const {
    name,
    type,
    disabled,
    readOnly,
    onAfterChange,
    searchable = true,
    clearable = true,
    ...rest
  } = props;
  const formState = useFormState();

  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <Select
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      clearable={clearable}
      searchable={searchable}
      onChange={(val, option) => {
        field.onChange(val);
        onAfterChange?.(option);
      }}
    />
  );
}
