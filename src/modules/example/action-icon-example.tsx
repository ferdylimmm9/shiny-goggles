import { SimpleGrid } from '@mantine/core';
import { Plus } from '@phosphor-icons/react';
import ActionIcon from 'components/action-icon';

export default function ActionIconExample() {
  const types = ['outlined', 'filled', 'texted'] as const;
  const sizes = ['normal', 'medium', 'small'] as const;
  return (
    <SimpleGrid cols={3}>
      {types.map((type) => {
        return sizes.map((size) => {
          return (
            <ActionIcon
              key={type + size}
              actionIconsVariants={{
                type,
                size,
              }}
            >
              {(size) => <Plus size={size} />}
            </ActionIcon>
          );
        });
      })}
    </SimpleGrid>
  );
}
