import { Flex, SimpleGrid } from '@mantine/core';
import Text from 'components/text';
import { ColorType, color } from 'styles/color';

export default function ColorExample() {
  const colors = Object.keys(color) as ColorType[];

  return (
    <SimpleGrid cols={3}>
      {colors.map((c) => {
        return (
          <Flex key={c} direction="column" gap={4}>
            <div
              style={{
                width: 64,
                height: 64,
                border: '1px solid black',
                backgroundColor: color[c],
              }}
            />
            <Text>{c}</Text>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}
