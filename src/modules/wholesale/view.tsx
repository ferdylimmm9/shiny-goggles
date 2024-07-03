import { useGetWholesale } from 'api-hooks/wholesale-order/query';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import WholesaleDetailPreview from './components/wholesale-detail-preview';

interface WholesaleViewProps {
  id?: string;
  onClose?: () => void;
}

export default function WholesaleView(props: WholesaleViewProps) {
  const { query } = useRouter();
  const id = (props?.id ?? query.id) as string;
  const getWholesale = useGetWholesale({ input: { id } });

  return (
    <LoaderView query={getWholesale}>
      {(data) => {
        return <WholesaleDetailPreview data={data.data} />;
      }}
    </LoaderView>
  );
}
