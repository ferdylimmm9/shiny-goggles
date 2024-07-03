import { NavigationEnum } from 'constant/navigation';
import { useRouter } from 'next/router';

import Text, { TextProps } from './text';

export function generatePageLabel(pathname) {
  switch (pathname as NavigationEnum) {
    case NavigationEnum.EmployeeList:
      return 'Staff Management';
    case NavigationEnum.EmployeeCreate:
      return 'Add New Staff';
    case NavigationEnum.EmployeeView:
      return 'View Staff';
    case NavigationEnum.StoreList:
      return 'Store Management';
    case NavigationEnum.StoreCreate:
      return 'Add New Store';
    case NavigationEnum.StoreView:
      return 'View Store';
    case NavigationEnum.ProductList:
      return 'Stock Management';
    case NavigationEnum.ProductCreate:
      return 'Add New Stock';
    case NavigationEnum.ProductView:
      return 'View Stock';
    case NavigationEnum.SalesReport:
      return 'Sales Report';
    case NavigationEnum.Login:
      return 'Login';
    case NavigationEnum.Profile:
      return 'Profile';
    case NavigationEnum.ProfileChangePassword:
      return 'Change Password';
    case NavigationEnum.ProductReport:
      return 'Product Report';
    case NavigationEnum.Home:
      return 'Home';
    case NavigationEnum.WholesaleOrderList:
      return 'Wholesale Order Management';
    case NavigationEnum.WholesaleOrderView:
      return 'View Wholesale Order';
    default:
      return null;
  }
}

export interface PageLabelProps extends TextProps {}

export default function PageLabel(props: PageLabelProps) {
  const { pathname } = useRouter();
  const label = generatePageLabel(pathname);
  if (label === null) return null;

  return (
    <Text {...props} textVariant="title3" fontWeightVariant="semibold">
      {label}
    </Text>
  );
}
