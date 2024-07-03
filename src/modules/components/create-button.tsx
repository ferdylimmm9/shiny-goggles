import { AddCircleIcon } from 'assets/svg';
import Button, { ButtonProps } from 'components/button';
import { NavigationEnum } from 'constant/navigation';
import { useRouter } from 'next/router';
import React from 'react';

interface CreateButtonProps extends ButtonProps {}

export default function CreateButton(props: CreateButtonProps) {
  const { pathname, push } = useRouter();
  const { label, href } = React.useMemo(() => {
    switch (pathname as NavigationEnum) {
      case NavigationEnum.EmployeeList:
        return { label: 'Add Staff', href: NavigationEnum.EmployeeCreate };
      case NavigationEnum.StoreList:
        return { label: 'Add Store', href: NavigationEnum.StoreCreate };
      case NavigationEnum.ProductList:
        return { label: 'Add Product', href: NavigationEnum.ProductCreate };
      default:
        return {};
    }
  }, [pathname]);

  if (!!label && !!href) {
    return (
      <Button
        w="fit-content"
        onClick={() => push(href)}
        leftSection={<AddCircleIcon />}
        {...props}
      >
        {label}
      </Button>
    );
  }

  return null;
}
