import { Download2Icon } from 'assets/svg';
import ActionIcon from 'components/action-icon';
import Button from 'components/button';
import React from 'react';
import { color } from 'styles/color';

import useGetInvoiceHooks from '../hooks/use-get-invoice-hooks';

interface WholesaleDownloadProps {
  type?: 'icon' | 'button' | 'action-icon';
  id: string;
}

export default function WholesaleDownload(props: WholesaleDownloadProps) {
  const { type = 'icon', id } = props;

  const { onClickDownload, permission, isLoading } = useGetInvoiceHooks();

  if (!permission) return null;
  if (type === 'icon') {
    return (
      <Download2Icon
        color={color.neutral50}
        cursor="pointer"
        onClick={() => onClickDownload(id)}
      />
    );
  } else if (type === 'button') {
    return (
      <Button
        leftSection={<Download2Icon />}
        loading={isLoading}
        onClick={() => onClickDownload(id)}
      >
        Download
      </Button>
    );
  }

  return (
    <ActionIcon
      onClick={() => onClickDownload(id)}
      loading={isLoading}
      children={(size) => <Download2Icon width={size} height={size} />}
    />
  );
}
