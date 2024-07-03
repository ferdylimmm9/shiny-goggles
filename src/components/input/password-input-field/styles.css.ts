import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const passwordInputStyles = styleVariants(noMargin, (margin) => [base]);

globalStyle(`.mantine-PasswordInput-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-PasswordInput-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-PasswordInput-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-PasswordInput-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-PasswordInput-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
