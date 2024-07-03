import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { color } from 'styles/color';

export const actionIcon = recipe({
  base: {
    transition: 'all 0.1s ease-in-out',
    borderRadius: 10,
    ':disabled': {
      backgroundColor: `${color.neutral90} !important`,
      color: `${color.neutral60} !important`,
    },
    '&[data-disabled]': {
      backgroundColor: `${color.neutral90} !important`,
      color: `${color.neutral60} !important`,
    },
  } as any,

  variants: {
    type: {
      filled: {
        backgroundColor: `${color.neutral90} !important`,
        color: `${color.primary20} !important`,
        ':hover': {
          backgroundColor: `${color.primary80} !important`,
          color: `${color.primary20} !important`,
        },
        ':active': {
          backgroundColor: `${color.primary70} !important`,
          color: `${color.primary20} !important`,
        },
      },
      outlined: {
        backgroundColor: 'transparent !important',
        color: `${color.neutral40} ! important`,
        border: `1px solid ${color.neutral40} !important`,
        ':hover': {
          border: `1px solid ${color.neutral50}`,
          backgroundColor: 'rgba(122, 125, 133, 0.1) !important',
          color: `${color.neutral50} !important`,
        },
        ':active': {
          border: `1px solid ${color.neutral30} !important`,
          backgroundColor: 'rgba(73, 76, 80, 0.1) !important',
          color: `${color.neutral30} !important`,
        },
      },
      texted: {
        backgroundColor: 'transparent !important',
        color: `${color.neutral40} !important`,
        ':hover': {
          backgroundColor: 'transparent !important',
          color: `${color.neutral50} !important`,
        },
        ':active': {
          backgroundColor: 'rgba(73, 76, 80, 0.1) !important',
          color: `${color.neutral30} !important`,
        },
      },
    },
    size: {
      normal: {
        borderRadius: 10,
        padding: 16,
        width: 56,
        height: 56,
      },
      medium: {
        borderRadius: 6,
        padding: 8,
        width: 40,
        height: 40,
      },
      small: {
        borderRadius: 4,
        padding: 4,
        width: 28,
        height: 28,
      },
    },
  },

  defaultVariants: {
    type: 'filled',
    size: 'normal',
  },
});

export type ActionIconVariants = RecipeVariants<typeof actionIcon>;
