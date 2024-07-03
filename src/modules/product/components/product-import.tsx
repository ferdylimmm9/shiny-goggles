import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Button from 'components/button';
import DrawerTitle from 'components/drawer/drawer-title';
import { PERMISSIONS } from 'constant/permissions';
import useAuthorization from 'hooks/use-authorization';

import ProductImportForm from './product-import-form';

export default function ProductImport() {
  const [openImportForm, handleImportForm] = useDisclosure();
  const { can } = useAuthorization();

  if (!can(PERMISSIONS.ImportProductData)) return null;

  return (
    <>
      <Button
        onClick={handleImportForm.open}
        buttonVariants={{
          color: 'tertiary',
        }}
      >
        Import Product
      </Button>
      <Drawer
        onClose={handleImportForm.close}
        opened={openImportForm}
        position="right"
        size="lg"
        withCloseButton={false}
        padding={0}
      >
        <div
          style={{
            position: 'relative',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <DrawerTitle close={handleImportForm.close} title="Import Data" />
          <ProductImportForm onClose={handleImportForm.close} />
        </div>
      </Drawer>
    </>
  );
}
