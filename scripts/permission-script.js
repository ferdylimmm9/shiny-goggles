const fs = require('fs/promises');
const { pascalize } = require('humps');

const permissions = [
  {
    id: 'employee.employees:manage',
    name: 'Manage Employee',
    permissions: [
      {
        id: 'employee.employees.page',
        name: 'Access Staff Tab',
      },
      {
        id: 'employee.employees.list',
        name: 'Access Staff List',
      },
      {
        id: 'employee.employees.view',
        name: 'Access Staff Detail',
      },
      {
        id: 'employee.employees.create',
        name: 'Add New Staff',
      },
      {
        id: 'employee.employees.update',
        name: 'Update Staff',
      },
      {
        id: 'employee.employees.delete',
        name: 'Delete Staff',
      },
    ],
  },
  {
    id: 'employee.stores:manage',
    name: 'Manage Store',
    permissions: [
      {
        id: 'employee.stores.page',
        name: 'Access Store Tab',
      },
      {
        id: 'employee.stores.list',
        name: 'Access Store List',
      },
      {
        id: 'employee.stores.view',
        name: 'Access Store Detail',
      },
      {
        id: 'employee.stores.create',
        name: 'Add New Store',
      },
      {
        id: 'employee.stores.update',
        name: 'Update Store',
      },
      {
        id: 'employee.stores.delete',
        name: 'Delete Store',
      },
    ],
  },
  {
    id: 'employee.products:manage',
    name: 'Manage Product',
    permissions: [
      {
        id: 'employee.products.page',
        name: 'Access Product Tab',
      },
      {
        id: 'employee.products.list',
        name: 'Access Product List',
      },
      {
        id: 'employee.products.view',
        name: 'Access Product Detail',
      },
      {
        id: 'employee.products.create',
        name: 'Add New Product',
      },
      {
        id: 'employee.products.update',
        name: 'Update Product',
      },
      {
        id: 'employee.products.delete',
        name: 'Delete Product',
      },
      {
        id: 'employee.products.import',
        name: 'Import Product Data',
      },
      {
        id: 'employee.products.import-sales',
        name: 'Import Sales Product Data',
      },
    ],
  },
  {
    id: 'employee.reports:manage',
    name: 'Manage Report',
    permissions: [
      {
        id: 'employee.reports.page',
        name: 'Access Report Tab',
      },
      {
        id: 'employee.reports.sales',
        name: 'Access Sales Report',
      },
      {
        id: 'employee.reports.products',
        name: 'Access Product Report',
      },
    ],
  },
  {
    id: 'employee.wholesale-orders:manage',
    name: 'Manage Wholesale Order',
    permissions: [
      {
        id: 'employee.wholesale-orders.import',
        name: 'Import Wholesale Order Data',
      },
      {
        id: 'employee.wholesale-orders.page',
        name: 'Access Wholesale Order Tab',
      },
      {
        id: 'employee.wholesale-orders.list',
        name: 'Access Wholesale Order List',
      },
      {
        id: 'employee.wholesale-orders.view',
        name: 'Access Wholesale Order Detail',
      },
      {
        id: 'employee.wholesale-orders.delete',
        name: 'Delete Wholesale Order',
      },
      {
        id: 'employee.wholesale-orders.paid',
        name: 'Update Wholesale Order to Paid',
      },
      {
        id: 'employee.wholesale-orders.unpaid',
        name: 'Update Wholesale Order to Unpaid',
      },
      {
        id: 'employee.wholesale-orders.invoice',
        name: 'Get Wholesale Order Invoice',
      },
    ],
  },
];

const list = permissions
  .map((permission) => {
    const { permissions, ...rest } = permission;
    permissions.push(rest);
    return permissions;
  })
  .flat();

const dict = {};

for (const item of list) {
  dict[pascalize(item.name)] = item.id;
}

const content = `export const PERMISSIONS = ${JSON.stringify(dict)} as const; \nexport type PermissionValuesType =
(typeof PERMISSIONS)[keyof typeof PERMISSIONS];`;

try {
  fs.writeFile('./src/constant/permissions.ts', content);
} catch (e) {
  console.log(e);
}
