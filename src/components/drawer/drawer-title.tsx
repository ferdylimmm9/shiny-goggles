import { Flex, Space } from '@mantine/core';
import { CloseIcon } from 'assets/svg';
import ActionIcon from 'components/action-icon';
import Border from 'components/border';
import Text from 'components/text';

interface DrawerTitleProps {
  title: string;
  close: () => void;
}

export default function DrawerTitle(props: DrawerTitleProps) {
  const { title, close } = props;
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 3,
        backgroundColor: 'white',
        paddingTop: 16,
      }}
    >
      <Flex w="100%" direction="row" align="center" justify="space-between">
        <Text textVariant="title3" fontWeightVariant="semibold">
          {title}
        </Text>
        <ActionIcon
          actionIconsVariants={{
            type: 'texted',
            size: 'medium',
          }}
          onClick={close}
        >
          {(size) => <CloseIcon width={24} height={24} />}
        </ActionIcon>
      </Flex>
      <Space h={10} />
      <Border />
      <Space h={20} />
    </div>
  );
}
