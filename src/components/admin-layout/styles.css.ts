import { style } from '@vanilla-extract/css';
import { color } from 'styles/color';

export const AdminLayoutStyle = {
  menuIdle: style({
    color: `${color.neutral60} !important`,
    cursor: 'pointer',
    backgroundColor: 'transparent !important',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10,
    ':hover': {
      color: `${color.secondary80} !important`,
      backgroundColor: `${color.secondary90} !important`,
    },
  }),
  menuActive: style({
    borderRadius: 10,
    color: `${color.secondary70} !important`,
    backgroundColor: `${color.secondary90} !important`,
    cursor: 'pointer',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    opacity: 1,
    ':hover': {
      opacity: 0.8,
    },
  }),
};
