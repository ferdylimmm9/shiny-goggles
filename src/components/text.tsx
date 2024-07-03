import { Text as RawText } from '@mantine/core';
import useCheckMobileScreen from 'hooks/use-check-mobile-screen';
import React from 'react';
import {
  FontWeightType,
  TextVariantType,
  textVariants,
  fontWeights,
} from 'styles/typography';

export interface TextProps extends React.ComponentProps<typeof RawText<'div'>> {
  isResponsive?: boolean;
  textVariant?: TextVariantType;
  fontWeightVariant?: FontWeightType;
}

export function getResponsiveText(
  textVariant: TextVariantType,
): TextVariantType {
  switch (textVariant) {
    case 'title1':
    case 'title2':
      return 'title3';
    case 'title3':
      return 'body1';
    case 'body1':
    case 'body2':
      return 'body3';
    case 'body3':
      return 'caption1';
    case 'caption1':
    case 'caption2':
    default:
      return 'caption2';
  }
}

export default function Text(props: TextProps) {
  const {
    textVariant = 'body3',
    fontWeightVariant = 'regular',
    style,
    isResponsive = true,
    ...rest
  } = props;

  const isMobile = useCheckMobileScreen();

  const _textVariant =
    isMobile && isResponsive ? getResponsiveText(textVariant) : textVariant;

  const _style = {
    ...textVariants[_textVariant],
    ...style,
  };

  return (
    <RawText style={_style} fw={fontWeights[fontWeightVariant]} {...rest} />
  );
}
