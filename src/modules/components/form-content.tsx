import { Flex, FlexProps } from '@mantine/core';

interface FormContentProps extends FlexProps {}

export default function FormContent(props: FormContentProps) {
  return (
    <Flex
      flex={1}
      direction="column"
      style={{
        overflow: 'auto',
      }}
      {...props}
    />
  );
}
