import { PERMISSIONS } from 'constant/permissions';

import useAuthorization from './use-authorization';

export type MenuType = 'employees' | 'products' | 'stores' | 'wholesales';
export default function useCrudPermission(type: MenuType) {
  const { can } = useAuthorization();
  switch (type) {
    case 'employees':
      return {
        create: can(PERMISSIONS.AddNewStaff),
        update: can(PERMISSIONS.UpdateStaff),
        delete: can(PERMISSIONS.DeleteStaff),
        view: can(PERMISSIONS.AccessStaffDetail),
        list: can(PERMISSIONS.AccessStaffList),
        page: can(PERMISSIONS.AccessStaffTab),
      };
    case 'products':
      return {
        create: can(PERMISSIONS.AddNewProduct),
        update: can(PERMISSIONS.UpdateProduct),
        delete: can(PERMISSIONS.DeleteProduct),
        view: can(PERMISSIONS.AccessProductDetail),
        list: can(PERMISSIONS.AccessProductList),
        page: can(PERMISSIONS.AccessProductTab),
      };
    case 'stores':
      return {
        create: can(PERMISSIONS.AddNewStore),
        update: can(PERMISSIONS.UpdateStore),
        delete: can(PERMISSIONS.DeleteStore),
        view: can(PERMISSIONS.AccessStoreDetail),
        list: can(PERMISSIONS.AccessStoreList),
        page: can(PERMISSIONS.AccessStoreTab),
      };
    case 'wholesales':
      return {
        create: false,
        update: false,
        delete: can(PERMISSIONS.DeleteWholesaleOrder),
        view: can(PERMISSIONS.AccessWholesaleOrderDetail),
        list: can(PERMISSIONS.AccessWholesaleOrderList),
        page: can(PERMISSIONS.AccessWholesaleOrderTab),
      };
    default:
      return {
        create: true,
        update: true,
        delete: true,
        view: true,
        list: true,
        page: true,
      };
  }
}
