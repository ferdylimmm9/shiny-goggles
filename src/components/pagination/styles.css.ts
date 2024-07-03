import { style } from '@vanilla-extract/css';
import breakpoints from 'common/breakpoint';
import { color } from 'styles/color';
import { fontWeights, textVariants } from 'styles/typography';

export const PaginationStyle = {
  root: style({
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  }),
  control: style({
    borderRadius: 8,
    border: 'none',
    width: `32px !important`,
    height: `32px !important`,
    padding: 8,
    ...textVariants.body3,
    fontWeight: fontWeights['regular'],
    ':hover': {
      backgroundColor: color.secondary100,
      color: color.primary20,
    },
    [breakpoints.screenMaxSm]: {
      ...textVariants.caption1,
    },
    '&[data-active]': {
      backgroundColor: `${color.secondary70} !important`,
      color: `${color.neutral100} !important  `,
    },
    '&[data-disabled]': {
      color: `${color.neutral80} !important`,
    },
  } as any),
};
