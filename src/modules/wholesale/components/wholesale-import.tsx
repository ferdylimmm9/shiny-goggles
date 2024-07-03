import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Button from 'components/button';
import DrawerTitle from 'components/drawer/drawer-title';
import { PERMISSIONS } from 'constant/permissions';
import useAuthorization from 'hooks/use-authorization';

import WholesaleImportForm from './wholesale-import-form';

export default function WholesaleImport() {
  const [openImportForm, handleImportForm] = useDisclosure();
  const { can } = useAuthorization();

  if (!can(PERMISSIONS.ImportWholesaleOrderData)) return null;

  return (
    <>
      <Button
        onClick={handleImportForm.open}
        buttonVariants={{
          color: 'tertiary',
        }}
      >
        Import
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
          <DrawerTitle
            close={handleImportForm.close}
            title="Import Wholesale Order"
          />
          <WholesaleImportForm onClose={handleImportForm.close} />
        </div>
      </Drawer>
    </>
  );
}
