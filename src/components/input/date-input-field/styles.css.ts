import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { fontWeights, textVariants } from 'styles/typography';

const base = style({});
const noMargin = {
  true: 0,
};

export const datePickerInputStyles = styleVariants(noMargin, (margin) => [
  base,
]);

globalStyle(`.mantine-DatePickerInput-label`, {
  ...textVariants.body3,
  fontWeight: fontWeights.semibold,
});

globalStyle(`.mantine-DatePickerInput-input`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-DatePickerInput-placeholder`, {
  ...textVariants.body3,
  fontWeight: fontWeights.regular,
});

globalStyle(`.mantine-DatePickerInput-description`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});

globalStyle(`.mantine-DatePickerInput-error`, {
  ...textVariants.caption1,
  fontWeight: fontWeights.light,
});
