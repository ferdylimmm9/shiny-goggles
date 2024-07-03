import { Tooltip } from '@mantine/core';
import { ArrowDropDownIcon, ArrowDropUpIcon } from 'assets/svg';
import Text from 'components/text';
import { useMenuDisclosure } from 'hooks/use-menu-disclosure';
import React from 'react';

import SingleMenu, { SingleMenuProps } from './single-menu';
import { AdminLayoutStyle } from './styles.css';

export interface MultipleMenuProps {
  type: 'multiple';
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  menus: SingleMenuProps[];
}

export default function MultipleMenu(props: MultipleMenuProps) {
  const { Icon, label, menus } = props;
  const [open, setOpen] = React.useState(true);
  const [isOpenMenu, setOpenMenu] = useMenuDisclosure();

  const menuLength = menus.filter((menu) => menu.isAllowed).length;

  if (menuLength === 0) return null;

  const menuComponents = (
    <>
      {menus.map((menu) => {
        return (
          <SingleMenu
            key={menu.to}
            Icon={menu.Icon}
            label={menu.label}
            to={menu.to}
            type="single"
            isHidden
            isAllowed={menu.isAllowed}
          />
        );
      })}
    </>
  );

  const onClick = () => {
    if (!isOpenMenu) {
      setOpen(true);
      setOpenMenu.open();
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <Tooltip label={label}>
        <div
          onClick={onClick}
          className={AdminLayoutStyle.menuIdle}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
            }}
          >
            <Icon width={24} height={24} />
            {isOpenMenu && (
              <>
                <Text textVariant="body2" fontWeightVariant="semibold">
                  {label}
                </Text>
              </>
            )}
          </div>
          {isOpenMenu && (
            <>
              {open ? (
                <ArrowDropUpIcon width={24} />
              ) : (
                <ArrowDropDownIcon width={24} />
              )}
            </>
          )}
        </div>
      </Tooltip>

      {open && menuComponents}
    </>
  );
}
