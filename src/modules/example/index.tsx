import { Flex } from '@mantine/core';
import { color } from 'styles/color';

import ActionIconExample from './action-icon-example';
import ButtonExample from './button-example';
import ColorExample from './color-example';
import IconExample from './icon-example';
import IllustrationExample from './illustration-example';
import InputExample from './input-example';
import TableExample from './table-example';
import TypographyExample from './typography-example';

export default function ExamplePage() {
  return (
    <Flex
      direction="column"
      gap={16}
      bg={color.neutral90}
      h="100%"
      mih="100dvh"
      maw="100dvw"
      miw="100dvw"
      c={color.primary10}
    >
      <TableExample />
      <TypographyExample />
      <ColorExample />
      <ButtonExample />
      <ActionIconExample />
      <InputExample />
      <IconExample />
      <IllustrationExample />
    </Flex>
  );
}
