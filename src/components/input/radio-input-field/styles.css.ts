import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { fontWeights, textVariants } from 'styles/typography';

export const radioStyles = style({});

globalStyle(`.mantine-RadioGroup-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-Radio-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-Radio-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-Radio-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

export const radioGroupStyles = recipe({
  base: {
    display: 'flex',
    rowGap: 8,
    columnGap: 32,
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

globalStyle(`.mantine-RadioGroup-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-RadioGroup-input`, {
  ...textVariants.body2,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-RadioGroup-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-RadioGroup-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
