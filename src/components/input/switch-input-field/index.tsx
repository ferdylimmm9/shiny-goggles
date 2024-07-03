import { Switch, SwitchProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/breakpoint';
import { classNames } from 'common/utils/string';
import React from 'react';
import { useController } from 'react-hook-form';
import { color } from 'styles/color';

import { switchStyles } from './styles.css';
import { useFormState } from '../../form';

export interface SwitchFieldProps extends SwitchProps {
  type: 'switch';
  name: string;
  onAfterChange?: (value: boolean) => void;
}

export function RawSwitch(props: SwitchProps) {
  const { className, ...rest } = props;
  const isMobile = useMediaQuery(breakpoints.screenMaxLg);

  return (
    <Switch
      color={color.secondary70}
      className={classNames(switchStyles, className)}
      size={isMobile ? 'sm' : 'sm'}
      labelPosition="left"
      {...rest}
    />
  );
}

export default function SwitchField(props: SwitchFieldProps) {
  const { name, type, disabled, readOnly, onAfterChange, className, ...rest } =
    props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <RawSwitch
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
