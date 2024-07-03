import { useGetInvoice } from 'api-hooks/wholesale-order/mutation';
import notification from 'components/notification';
import { PERMISSIONS } from 'constant/permissions';
import * as FileSaver from 'file-saver';
import useAuthorization from 'hooks/use-authorization';
import React from 'react';

export default function useGetInvoiceHooks() {
  const { can } = useAuthorization();
  const getInvoice = useGetInvoice();
  const { mutateAsync } = getInvoice;
  const permission = can(PERMISSIONS.GetWholesaleOrderInvoice);
  const onClick = React.useCallback(
    async (id: string) => {
      try {
        const result = await mutateAsync({ id });
        if (result) {
          const name = `invoice-${id}`;
          window.open(URL.createObjectURL(result));
          FileSaver.saveAs(result, name);
        }
      } catch (e) {
        console.error(e);
        notification.error({
          message: e.message,
        });
      }
    },
    [mutateAsync],
  );

  return {
    ...getInvoice,
    onClickDownload: onClick,
    permission,
  };
}
