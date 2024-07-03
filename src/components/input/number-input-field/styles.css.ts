import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const numberInputStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-NumberInput-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-NumberInput-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-NumberInput-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-NumberInput-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-NumberInput-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
