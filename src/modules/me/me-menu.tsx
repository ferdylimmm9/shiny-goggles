import { Drawer, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LockSimple } from '@phosphor-icons/react';
import { AdminIcon, LogoutIcon } from 'assets/svg';
import DrawerTitle from 'components/drawer/drawer-title';
import Text from 'components/text';
import { NavigationEnum } from 'constant/navigation';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useLogout from 'hooks/use-logout';
import { useRouter } from 'next/router';
import React from 'react';
import { color } from 'styles/color';

import MeChangePassword from './me-change-password';
import MePage from './me-page';
import MeView from './me-view';

interface MeMenuProps {
  children?: React.ReactNode;
}

export default function MeMenu(props: MeMenuProps) {
  const children = props.children ?? <MeView />;
  const { onClickLogout } = useLogout();

  const isMobile = useCheckMobileScreen();
  const [isOpenProfile, setOpenProfile] = useDisclosure();
  const [isOpenPassword, setOpenPassword] = useDisclosure();

  const { push } = useRouter();

  const onClickProfile = () => {
    if (isMobile) {
      push(NavigationEnum.Profile);
      return;
    }
    setOpenProfile.open();
  };

  const onClickChangePassword = () => {
    if (isMobile) {
      push(NavigationEnum.ProfileChangePassword);
      return;
    }
    setOpenPassword.open();
  };

  return (
    <>
      <Menu position="right-end">
        <Menu.Target>
          <UnstyledButton w="100%">{children}</UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            color={color.primary20}
            leftSection={<AdminIcon />}
            onClick={onClickProfile}
          >
            <Text textVariant="body1" fontWeightVariant="regular">
              View Profile
            </Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color={color.primary20}
            leftSection={<LockSimple weight="fill" size={22} />}
            onClick={onClickChangePassword}
          >
            <Text textVariant="body1" fontWeightVariant="regular">
              Change Password
            </Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color={color.red50}
            leftSection={<LogoutIcon />}
            onClick={onClickLogout}
          >
            <Text textVariant="body1" fontWeightVariant="regular">
              Logout
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {!isMobile && (
        <>
          <Drawer
            opened={isOpenProfile}
            closeOnClickOutside={false}
            withCloseButton={false}
            onClose={setOpenProfile.close}
            padding={0}
            position="right"
            size="xl"
          >
            <div
              style={{
                position: 'relative',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <DrawerTitle close={setOpenProfile.close} title="Profile" />
              <MePage onClose={setOpenProfile.close} />
            </div>
          </Drawer>

          <Drawer
            opened={isOpenPassword}
            closeOnClickOutside={false}
            withCloseButton={false}
            onClose={setOpenPassword.close}
            padding={0}
            position="right"
            size="xl"
          >
            <div
              style={{
                position: 'relative',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <DrawerTitle
                close={setOpenPassword.close}
                title="Change Password"
              />
              <MeChangePassword onClose={setOpenPassword.close} />
            </div>
          </Drawer>
        </>
      )}
    </>
  );
}
