import { color } from './color';

export type BadgeColorType = 'blue' | 'red' | 'green' | 'yellow' | 'brown';

export function badgeColorGenerator(
  value: BadgeColorType,
): React.CSSProperties {
  switch (value) {
    case 'blue':
      return {
        backgroundColor: color.blue90,
        color: color.blue40,
      };
    case 'red':
      return {
        backgroundColor: color.red90,
        color: color.red40,
      };
    case 'green':
      return {
        backgroundColor: color.green90,
        color: color.green40,
      };
    case 'yellow':
      return {
        backgroundColor: color.yellow90,
        color: color.yellow50,
      };
    case 'brown':
    default:
      return {
        backgroundColor: color.primary90,
        color: color.primary40,
      };
  }
}
