import { Button, Drawer, Loader, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Lock } from '@phosphor-icons/react';
// import logo from 'assets/illustration/logo.svg';
// import miniLogo from 'assets/illustration/mini-logo.svg';
import {
  AdminIcon,
  AssignmentIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HumburgerIcon,
  Inventory2Icon,
  LogoutIcon,
  NotificationsUnreadIcon,
  Package2Icon,
  StoreIcon,
} from 'assets/svg';
import ActionIcon from 'components/action-icon';
import Border from 'components/border';
import { NavigationEnum } from 'constant/navigation';
import { PERMISSIONS } from 'constant/permissions';
import useAuthorization from 'hooks/use-authorization';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import useCrudPermission from 'hooks/use-crud-permission';
import useLogout from 'hooks/use-logout';
import { MenuDisclosure } from 'hooks/use-menu-disclosure';
import MeMenu from 'modules/me/me-menu';
import MeView from 'modules/me/me-view';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { color } from 'styles/color';

import MultipleMenu, { MultipleMenuProps } from './multiple-menu';
import SingleMenu, { SingleMenuProps } from './single-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout(props: AdminLayoutProps) {
  const [isOpenMenu, setOpenMenu] = useDisclosure(true);
  const isMobile = useCheckMobileScreen();
  const { onClickLogout } = useLogout();

  const { pathname, prefetch } = useRouter();

  const isBackgroundWhite = React.useMemo(() => {
    switch (pathname as NavigationEnum) {
      case NavigationEnum.EmployeeCreate:
      case NavigationEnum.EmployeeView:
      case NavigationEnum.StoreCreate:
      case NavigationEnum.StoreView:
      case NavigationEnum.ProductCreate:
      case NavigationEnum.ProductView:
        return true;
      default:
        return false;
    }
  }, [pathname]);
  const { can } = useAuthorization();
  const employeePermission = useCrudPermission('employees');
  const storePermission = useCrudPermission('stores');
  const productPermission = useCrudPermission('products');
  const wholesalePermission = useCrudPermission('wholesales');
  const productReportPermission = can(PERMISSIONS.AccessProductReport);
  const salesReportPermission = can(PERMISSIONS.AccessSalesReport);

  const menus = [
    {
      type: 'single',
      label: 'Staff Management',
      to: NavigationEnum.EmployeeList,
      Icon: AdminIcon,
      isAllowed: employeePermission.page,
    } as SingleMenuProps,
    {
      type: 'single',
      label: 'Store Management',
      to: NavigationEnum.StoreList,
      Icon: StoreIcon,
      isAllowed: storePermission.page,
    } as SingleMenuProps,
    {
      type: 'single',
      label: 'Stock Management',
      to: NavigationEnum.ProductList,
      Icon: Package2Icon,
      isAllowed: productPermission.page,
    } as SingleMenuProps,
    {
      type: 'single',
      label: 'Wholesale Order Management',
      to: NavigationEnum.WholesaleOrderList,
      Icon: Inventory2Icon,
      isAllowed: wholesalePermission.page,
    } as SingleMenuProps,
    {
      type: 'multiple',
      label: 'Report Management',
      Icon: AssignmentIcon,
      menus: [
        {
          type: 'single',
          label: 'Sales Report',
          to: NavigationEnum.SalesReport,
          Icon: AssignmentIcon,
          isAllowed: salesReportPermission,
          isHidden: true,
        },
        {
          type: 'single',
          label: 'Product Report',
          to: NavigationEnum.ProductReport,
          Icon: AssignmentIcon,
          isAllowed: productReportPermission,
          isHidden: true,
        },
      ],
    } as MultipleMenuProps,
  ];

  const menuComponent = (
    <>
      <div style={styles.menuContainer}>
        {menus.map((menu) => {
          const key = menu.label + menu.type;
          if (menu.type === 'single') {
            return <SingleMenu key={key} {...menu} />;
          }
          return <MultipleMenu key={key} {...menu} />;
        })}
      </div>
    </>
  );

  const additionalMenus = [
    {
      type: 'single',
      label: 'View Profile',
      to: NavigationEnum.Profile,
      Icon: AdminIcon,
      isAllowed: true,
    } as SingleMenuProps,
    {
      type: 'single',
      label: 'Change Password',
      to: NavigationEnum.ProfileChangePassword,
      Icon: Lock,
      isAllowed: true,
    } as SingleMenuProps,
  ];

  const additionalMenuComponent = (
    <>
      <div style={styles.menuContainer}>
        {additionalMenus.map((additionalMenu) => {
          const key = additionalMenu.label + additionalMenu.type;
          return <SingleMenu key={key} {...additionalMenu} />;
        })}
      </div>
    </>
  );

  const header = (
    <header
      style={{
        ...styles.header,
        display: isMobile ? 'flex' : 'none',
      }}
    >
      <HumburgerIcon
        width={32}
        height={32}
        color={color.primary20}
        onClick={setOpenMenu.open}
        style={{ cursor: 'pointer' }}
      />
      <Link href={NavigationEnum.Home} style={{ cursor: 'pointer' }}>
        <Image src="/logo.png" width={75} height={30} alt="logo" />
      </Link>
      <NotificationsUnreadIcon
        width={32}
        height={32}
        color={color.neutral100}
        onClick={setOpenMenu.open}
      />
      {isMobile && (
        <Drawer
          onClose={setOpenMenu.close}
          size={380}
          opened={isOpenMenu}
          withCloseButton={false}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              height: 'calc(100dvh - 32px)',
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 16,
                }}
              >
                <Image src="/logo.png" width={125} height={50} alt="logo" />
                <ActionIcon
                  actionIconsVariants={{
                    type: 'texted',
                    size: 'medium',
                  }}
                  onClick={setOpenMenu.close}
                >
                  {(size) => (
                    <CloseIcon width={36} height={36} color={color.primary20} />
                  )}
                </ActionIcon>
              </div>
              <Border />
              <Space h={16} />
              <MeView isView />
              <Space h={16} />
              <Border />
              <Space h={16} />
              {menuComponent}
            </div>

            <div>
              {additionalMenuComponent}
              <Space h={12} />
              <Border />
              <Space h={12} />
              <Button
                onClick={onClickLogout}
                color={color.neutral60}
                leftSection={<LogoutIcon />}
                fullWidth
                justify="flex-start"
                px={16}
                variant="subtle"
              >
                Logout
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </header>
  );

  const sideNavigationWidth = isOpenMenu ? 300 : 104;
  const backgroundColor = isBackgroundWhite
    ? color.neutral100
    : color.neutral90;

  const mainContentStyle: React.CSSProperties = isMobile
    ? {
        ...styles.mainContentMobile,
        backgroundColor,
      }
    : {
        ...styles.mainContentDesktop,
        minWidth: `calc(100dvw - ${sideNavigationWidth}px)`,
        maxWidth: `calc(100dvw - ${sideNavigationWidth}px)`,
        backgroundColor,
      };

  const sizeNavigationStyle: React.CSSProperties = isMobile
    ? styles.sideNavigationMobile
    : {
        ...styles.sideNavigationDesktop,
        minWidth: sideNavigationWidth,
        maxWidth: sideNavigationWidth,
        alignItems: isOpenMenu ? undefined : 'center',
      };

  const logoSize = isOpenMenu ? 150 : 60;

  React.useEffect(() => {
    Object.keys(NavigationEnum).map((key) => {
      prefetch(NavigationEnum[key]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="main-wrapper"
      style={{
        ...styles.mainWrapper,
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <MenuDisclosure.Provider value={[isOpenMenu, setOpenMenu]}>
        {header}
        {!isMobile && (
          <div className="side-navigation" style={sizeNavigationStyle}>
            <div>
              <Link href={NavigationEnum.Home} style={{ cursor: 'pointer' }}>
                <Image
                  src="/logo.png"
                  width={logoSize}
                  height={logoSize / 2.5}
                  alt="logo"
                />
              </Link>

              <Space h={40} />

              {menuComponent}
            </div>
            <div>
              <MeMenu />
              <Space h={12} />
              <Border />
              <Space h={12} />
              <ActionIcon
                actionIconsVariants={{
                  type: 'filled',
                }}
                onClick={setOpenMenu.toggle}
              >
                {(size) => {
                  return isOpenMenu ? (
                    <ChevronLeftIcon width={size} height={size} />
                  ) : (
                    <ChevronRightIcon width={size} height={size} />
                  );
                }}
              </ActionIcon>
            </div>
          </div>
        )}
      </MenuDisclosure.Provider>
      <div className="main-content" style={mainContentStyle}>
        <React.Suspense fallback={<Loader size={24} />}>
          {props.children}
        </React.Suspense>
      </div>
    </div>
  );
}

const styles = {
  mainWrapper: {
    display: 'flex',
    overflow: 'visible',
    minWidth: '100dvw',
    maxWidth: '100dvw',
    minHeight: '100dvh',
    maxHeight: '100dvh',
  } as React.CSSProperties,
  sideNavigationMobile: { display: 'none' } as React.CSSProperties,
  sideNavigationDesktop: {
    // transition: 'all 0.5s ease-out allow-discrete',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    backgroundColor: color.neutral100,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 24,
    paddingRight: 24,
    // overflow: 'hidden',
    overflowY: 'auto',
  } as React.CSSProperties,
  mainContentMobile: {
    position: 'relative',
    minWidth: '100dvw',
    maxWidth: '100dvw',
    minHeight: 'calc(100dvh - 73px)',
    maxHeight: 'calc(100dvh - 73px)',
    overflow: 'auto',
    backgroundColor: color.neutral100,
    padding: `32px 24px`,
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  mainContentDesktop: {
    // transition: 'all 0.5s ease-out allow-discrete',
    position: 'relative',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    overflow: 'auto',
    backgroundColor: color.neutral100,
    padding: `20px 16px`,
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottom: `1px solid ${color.neutral80}`,
  } as React.CSSProperties,
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
} as const;
