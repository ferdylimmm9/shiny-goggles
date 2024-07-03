import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const switchStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-Switch-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-Switch-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-Switch-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
