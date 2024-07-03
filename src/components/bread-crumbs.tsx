import { Breadcrumbs } from '@mantine/core';
import { ChevronRightIcon } from 'assets/svg';
import { NavigationEnum } from 'constant/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { color } from 'styles/color';

import Text from './text';

interface BreadCrumbsProps {}

export default function BreadCrumbs(props: BreadCrumbsProps) {
  const { pathname } = useRouter();
  const items = React.useMemo(() => {
    switch (pathname as NavigationEnum) {
      case NavigationEnum.EmployeeCreate:
        return [
          {
            href: NavigationEnum.EmployeeList,
            children: 'Staff Management',
          },
          {
            href: NavigationEnum.EmployeeCreate,
            children: 'Add New Staff',
          },
        ];
      case NavigationEnum.EmployeeView:
        return [
          {
            href: NavigationEnum.EmployeeList,
            children: 'Staff Management',
          },
          {
            href: NavigationEnum.EmployeeView,
            children: 'Add New Staff',
          },
        ];
      case NavigationEnum.StoreCreate:
        return [
          {
            href: NavigationEnum.StoreList,
            children: 'Store Management',
          },
          {
            href: NavigationEnum.StoreCreate,
            children: 'Add New Store',
          },
        ];
      case NavigationEnum.StoreView:
        return [
          {
            href: NavigationEnum.StoreList,
            children: 'Store Management',
          },
          {
            href: NavigationEnum.StoreView,
            children: 'View Store',
          },
        ];
      case NavigationEnum.ProductCreate:
        return [
          {
            href: NavigationEnum.ProductList,
            children: 'Product Management',
          },
          {
            href: NavigationEnum.ProductCreate,
            children: 'Add New Product',
          },
        ];
      case NavigationEnum.ProductView:
        return [
          {
            href: NavigationEnum.ProductList,
            children: 'Product Management',
          },
          {
            href: NavigationEnum.ProductView,
            children: 'View Product',
          },
        ];
      case NavigationEnum.Profile:
        return [
          {
            href: NavigationEnum.Home,
            children: 'Home',
          },
          {
            href: NavigationEnum.Profile,
            children: 'Profile',
          },
        ];
      case NavigationEnum.ProfileChangePassword:
        return [
          {
            href: NavigationEnum.Home,
            children: 'Home',
          },
          {
            href: NavigationEnum.Profile,
            children: 'Profile',
          },
          {
            href: NavigationEnum.ProfileChangePassword,
            children: 'Change Password',
          },
        ];
      case NavigationEnum.SalesReport:
        return [
          {
            href: NavigationEnum.Report,
            children: 'Report',
          },
          {
            href: NavigationEnum.SalesReport,
            children: 'Sales Report',
          },
        ];
      case NavigationEnum.ProductReport:
        return [
          {
            href: NavigationEnum.Report,
            children: 'Report',
          },
          {
            href: NavigationEnum.ProductReport,
            children: 'Product Report',
          },
        ];
      case NavigationEnum.WholesaleOrderView:
        return [
          {
            href: NavigationEnum.WholesaleOrderList,
            children: 'Wholesale Order Management',
          },
          {
            href: NavigationEnum.WholesaleOrderView,
            children: 'View Wholesale Order',
          },
        ];
      default:
        return [];
    }
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <Breadcrumbs
      {...props}
      separator={<ChevronRightIcon width={12} height={12} color="#D9D9D9" />}
      mb={8}
    >
      {items.map((item) => {
        const isActive = item.href === pathname;
        return (
          <Text
            isResponsive={false}
            key={item.href}
            textVariant="caption1"
            fontWeightVariant={isActive ? 'semibold' : 'regular'}
            c={isActive ? color.red70 : color.neutral70}
          >
            {item.children}
          </Text>
        );
      })}
    </Breadcrumbs>
  );
}
