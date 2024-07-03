import { SimpleGrid } from '@mantine/core';
import Text from 'components/text';
import {
  FontWeightType,
  TextVariantType,
  fontWeights,
  textVariants,
} from 'styles/typography';

export default function TypographyExample() {
  const fontVariant = Object.keys(textVariants) as TextVariantType[];
  const fontWeight = Object.keys(fontWeights) as FontWeightType[];

  return (
    <SimpleGrid cols={3}>
      {fontVariant.map((fv) => {
        return fontWeight.map((fw) => {
          const label = [fv, fw].join(' - ');
          return (
            <Text key={fw + fv} fontWeightVariant={fw} textVariant={fv}>
              {label}
            </Text>
          );
        });
      })}
    </SimpleGrid>
  );
}
