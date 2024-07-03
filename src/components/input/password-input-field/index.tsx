import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';

import { passwordInputStyles } from './styles.css';
import { useFormState } from '../../form';

export interface PasswordInputFieldProps extends PasswordInputProps {
  type: 'password';
  name: string;
  onAfterChange?: (value: string) => void;
}

export function RawPasswordInput(props: PasswordInputProps) {
  const { className, ...rest } = props;

  return (
    <PasswordInput
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(passwordInputStyles, className)}
      radius={10}
      {...rest}
    />
  );
}

export default function PasswordInputField(props: PasswordInputFieldProps) {
  const {
    name,
    type,
    disabled,
    readOnly,
    rightSection,
    onAfterChange,
    ...rest
  } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <RawPasswordInput
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      onChange={(e) => {
        field.onChange(e.currentTarget.value);
        onAfterChange?.(e.currentTarget.value);
      }}
    />
  );
}
