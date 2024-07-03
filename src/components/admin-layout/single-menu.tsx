import { Tooltip } from '@mantine/core';
import Text from 'components/text';
import { NavigationEnum } from 'constant/navigation';
import { useMenuDisclosure } from 'hooks/use-menu-disclosure';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { AdminLayoutStyle } from './styles.css';

export interface SingleMenuProps {
  type: 'single';
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  to: NavigationEnum;
  isHidden?: boolean;
  isAllowed?: boolean;
}

export default function SingleMenu(props: SingleMenuProps) {
  const { Icon, label, to, isHidden = false, isAllowed } = props;
  const { push, pathname } = useRouter();
  const onClick = () => push(to);
  const active = pathname === to;

  const [isOpenMenu] = useMenuDisclosure();

  if (!isAllowed) return null;

  return (
    <Tooltip label={label}>
      <Link href={to} passHref>
        <div
          onClick={onClick}
          className={
            active ? AdminLayoutStyle.menuActive : AdminLayoutStyle.menuIdle
          }
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            width: '100%',
          }}
        >
          {isHidden ? (
            <div
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Icon width={24} height={24} />
          )}

          {isOpenMenu && (
            <Text textVariant="body2" fontWeightVariant="semibold">
              {label}
            </Text>
          )}
        </div>
      </Link>
    </Tooltip>
  );
}
