import { Flex, FlexProps } from '@mantine/core';
import { NavigationEnum } from 'constant/navigation';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import { useRouter } from 'next/router';
import React from 'react';

interface FormScrollerProps extends FlexProps {
  isResponsive?: boolean;
}

export default function FormScroller(props: FormScrollerProps) {
  const { isResponsive = true } = props;
  const isMobile = useCheckMobileScreen();
  const { pathname } = useRouter();
  const isFullScreen = React.useMemo(() => {
    switch (pathname as NavigationEnum) {
      case NavigationEnum.EmployeeList:
      case NavigationEnum.StoreList:
      case NavigationEnum.ProductList:
      case NavigationEnum.SalesReport:
      case NavigationEnum.ProductReport:
      case NavigationEnum.Login:
      case NavigationEnum.WholesaleOrderList:
      case NavigationEnum.Home:
        return false;
      default:
        return true;
    }
  }, [pathname]);

  const height = React.useMemo(() => {
    if (isMobile && isResponsive) {
      return 'calc(100dvh - 206px)';
    }

    if (isFullScreen) {
      return 'calc(100dvh - 120px)';
    }

    return 'calc(100dvh - 100px)';
  }, [isFullScreen, isMobile, isResponsive]);

  return <Flex direction="column" mah={height} mih={height} {...props} />;
}
