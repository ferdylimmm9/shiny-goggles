import { SimpleGrid } from '@mantine/core';
import { Plus } from '@phosphor-icons/react';
import Button from 'components/button';

export default function ButtonExample() {
  const colors = ['primary', 'secondary', 'tertiary', 'quaternary'] as const;

  const sizes = ['default', 'small'] as const;

  return (
    <SimpleGrid cols={2}>
      {colors.map((color) => {
        return sizes.map((size) => {
          return (
            <Button
              key={size + color}
              buttonVariants={{
                color,
                size,
              }}
              leftSection={<Plus size={16} />}
            >
              Test
            </Button>
          );
        });
      })}
    </SimpleGrid>
  );
}
