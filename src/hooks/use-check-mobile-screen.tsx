import { useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/breakpoint';

export default function useCheckMobileScreen() {
  const isMobile = useMediaQuery(breakpoints.screenMaxSm);

  return isMobile;
}
