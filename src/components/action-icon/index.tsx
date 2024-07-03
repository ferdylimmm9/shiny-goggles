import { ActionIcon as RawActionIcon } from '@mantine/core';
import { classNames } from 'common/utils/string';
import React from 'react';

import { ActionIconVariants, actionIcon } from './action-icon.css';

export interface ActionIconProps
  extends Omit<
    React.ComponentProps<typeof RawActionIcon<'button'>>,
    'children'
  > {
  actionIconsVariants?: ActionIconVariants;
  children: (size: number) => React.ReactNode;
}

export default function ActionIcon(props: ActionIconProps) {
  const { actionIconsVariants, children, ...rest } = props;
  const size = React.useMemo(() => {
    switch (actionIconsVariants?.size) {
      case 'small':
        return 20;
      case 'normal':
      case 'medium':
      default:
        return 24;
    }
  }, [actionIconsVariants?.size]);
  return (
    <RawActionIcon
      {...rest}
      variant="subtle"
      className={classNames(props.className, actionIcon(actionIconsVariants))}
    >
      {children(size)}
    </RawActionIcon>
  );
}
