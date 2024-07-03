import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const selectStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-Select-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-Select-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
  borderRadius: 10,
});

globalStyle(`.mantine-Select-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-Select-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-Select-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-Select-option`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});
