import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const checkboxStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-Checkbox-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-Checkbox-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-Checkbox-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-Checkbox-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-Checkbox-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
