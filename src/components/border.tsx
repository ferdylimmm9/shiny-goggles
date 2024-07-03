import { color } from 'styles/color';

export default function Border() {
  return (
    <hr
      style={{
        color: 'transparent',
        backgroundColor: 'transparent',
        height: 1,
        width: '100%',
        borderTop: 0,
        borderBottom: `1px solid ${color.neutral80}`,
      }}
    />
  );
}
