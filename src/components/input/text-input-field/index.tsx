import { TextInput, TextInputProps } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';

import { textInputStyles } from './styles.css';
import { useFormState } from '../../form';

export interface TextInputFieldProps extends TextInputProps {
  type: 'text' | 'email' | 'tel';
  name: string;
  onAfterChange?: (value: string) => void;
}

export function RawTextInput(props: TextInputProps) {
  const { className, ...rest } = props;

  return (
    <TextInput
      radius={10}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(textInputStyles, className)}
      {...rest}
    />
  );
}

export default function TextInputField(props: TextInputFieldProps) {
  const {
    name,
    type,
    disabled,
    readOnly,
    rightSection,
    onAfterChange,
    className,
    ...rest
  } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <RawTextInput
      {...field}
      {...rest}
      disabled={_disabled}
      error={error}
      onChange={(e) => {
        field.onChange(e.target.value);
        onAfterChange?.(e.target.value);
      }}
    />
  );
}
