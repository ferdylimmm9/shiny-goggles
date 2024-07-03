import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { color } from 'styles/color';
import { fontWeights, textVariants } from 'styles/typography';

export const button = recipe({
  base: {
    transition: 'all 0.1s ease-in-out',
    borderRadius: 10,
    ':disabled': {
      backgroundColor: color.neutral90,
      color: color.neutral60,
    },
    '&[data-disabled]': {
      backgroundColor: color.neutral90,
      color: color.neutral60,
    },
  } as any,

  variants: {
    color: {
      primary: {
        backgroundColor: color.secondary70,
        color: color.neutral100,
        ':hover': {
          backgroundColor: color.secondary80,
          color: color.neutral100,
        },
        ':active': {
          backgroundColor: color.secondary60,
          color: color.neutral100,
        },
      },
      secondary: {
        backgroundColor: color.neutral90,
        color: color.neutral40,
        ':hover': {
          backgroundColor: 'rgba(202, 203, 206, 0.3)',
          color: color.neutral50,
        },
        ':active': {
          backgroundColor: 'rgba(202, 203, 206, 0.4)',
          color: color.neutral30,
        },
      },
      tertiary: {
        border: `1px solid ${color.secondary70}`,
        color: color.secondary70,
        backgroundColor: 'transparent',
        ':hover': {
          border: `1px solid ${color.secondary80}`,
          color: color.secondary80,
          backgroundColor: 'rgba(252, 180, 170, 0.1)',
        },
        ':active': {
          border: `1px solid ${color.secondary60}`,
          color: color.secondary60,
          backgroundColor: 'rgba(249, 94, 73, 0.1)',
        },
      },
      quaternary: {
        backgroundColor: color.neutral100,
        color: color.primary20,
        ':hover': {
          backgroundColor: 'rgba(236, 207, 182, 0.4)',
          color: color.primary30,
        },
        ':active': {
          backgroundColor: 'rgba(236, 207, 182, 0.6)',
          color: color.primary10,
        },
      },
    },
    size: {
      default: {
        height: 40,
        fontWeight: fontWeights.regular,
        ...textVariants.body2,
        // '@media': {
        //   [breakpoints.screenMaxSm]: {
        //     height: 30,
        //     fontWeight: fontWeights.regular,
        //     ...textVariants.caption1,
        //   },
        // },
      },
      small: {
        height: 30,
        fontWeight: fontWeights.regular,
        ...textVariants.caption1,
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'default',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
