export const Poppins = `var(--font-poppins)`;
export const Inter = 'var(--font-inter)';

export const textVariants = {
  title1: {
    fontFamily: Poppins,
    fontSize: '48px',
    lineHeight: '72px',
  },

  title2: {
    fontFamily: Poppins,
    fontSize: '32px',
    lineHeight: '48px',
  },

  title3: {
    fontFamily: Poppins,
    fontSize: '24px',
    lineHeight: '36px',
  },
  body1: {
    fontFamily: Inter,
    fontSize: '18px',
    lineHeight: '27px',
  },

  body2: {
    fontFamily: Inter,
    fontSize: '16px',
    lineHeight: '24px',
  },
  body3: {
    fontFamily: Inter,
    fontSize: '14px',
    lineHeight: '21px',
  },

  caption1: {
    fontFamily: Inter,
    fontSize: '12px',
    lineHeight: '18px',
  },

  caption2: {
    fontFamily: Inter,
    fontSize: '10px',
    lineHeight: '15px',
  },
};

export const fontWeights = {
  bold: 700,
  semibold: 600,
  regular: 400,
  light: 300,
} as const;

export type TextVariantType = keyof typeof textVariants;
export type FontWeightType = keyof typeof fontWeights;
