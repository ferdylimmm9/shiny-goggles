import { useGetMe } from 'api-hooks/auth/query';
import LoaderView from 'components/loader-view';

import MeForm from './me-form';

interface MePageProps {
  onClose?: () => void;
}

export default function MePage(props: MePageProps) {
  const queryMe = useGetMe();

  return (
    <LoaderView query={queryMe}>
      {(data) => {
        return <MeForm data={data.data} onClose={props.onClose} />;
      }}
    </LoaderView>
  );
}
