import { Button as RawButton } from '@mantine/core';
import { classNames } from 'common/utils/string';

import { ButtonVariants, button } from './button.css';

export interface ButtonProps
  extends React.ComponentProps<typeof RawButton<'button'>> {
  buttonVariants?: ButtonVariants;
}

export default function Button(props: ButtonProps) {
  const { buttonVariants } = props;
  return (
    <RawButton
      {...props}
      className={classNames(props.className, button(buttonVariants))}
    />
  );
}
