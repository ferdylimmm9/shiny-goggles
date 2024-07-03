import Text from 'components/text';
import { color } from 'styles/color';

export interface StatusBadgesProps {
  status: boolean;
}

export default function StatusBadge(props: StatusBadgesProps) {
  const c = props.status ? color.green40 : color.red40;
  const bg = props.status ? color.green90 : color.red90;
  return (
    <Text
      textVariant="body3"
      px={17}
      p={4}
      c={c}
      bg={bg}
      style={{
        borderRadius: 8,
      }}
      ta="center"
    >
      {props.status ? 'Active' : 'Inactive'}
    </Text>
  );
}
