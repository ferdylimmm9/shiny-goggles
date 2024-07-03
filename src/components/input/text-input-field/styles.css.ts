import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const textInputStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-TextInput-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-TextInput-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-TextInput-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-TextInput-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-TextInput-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
