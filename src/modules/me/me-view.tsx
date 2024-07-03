import { Tooltip } from '@mantine/core';
import { useGetMe } from 'api-hooks/auth/query';
import { ChevronRightIcon } from 'assets/svg';
import ActionIcon from 'components/action-icon';
import LoaderView from 'components/loader-view';
import Text from 'components/text';
import { useMenuDisclosure } from 'hooks/use-menu-disclosure';
import Image from 'next/image';
import { color } from 'styles/color';

interface MeViewProps {
  isView?: boolean;
}

export default function MeView(props: MeViewProps) {
  const { isView = false } = props;
  const query = useGetMe();

  const [isOpenMenu] = useMenuDisclosure();
  const isMenu = typeof isOpenMenu === 'boolean' && !isView;
  const showText = isOpenMenu === true || !isMenu || isView;

  return (
    <LoaderView query={query}>
      {(data) => {
        const me = data.data;
        const name = me.name;
        const username = me.username;
        return (
          <Tooltip label={`${name} - ${username}`}>
            <div
              style={{
                display: 'flex',
                justifyContent: showText ? undefined : 'center',
                alignItems: 'center',
                gap: 8,
                color: '#D9D9D9',
                width: '100%',
              }}
            >
              <Image
                width={40}
                height={40}
                alt={name}
                style={{
                  borderRadius: '50%',
                }}
                src={`https://ui-avatars.com/api/?name=${name}&background=F95E49&color=FFFFFF`}
              />

              {showText && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 40px - 28px - 16px)',
                  }}
                >
                  <Text
                    textVariant="body2"
                    fontWeightVariant="semibold"
                    c={color.primary20}
                    truncate
                  >
                    {name}
                  </Text>
                  <Text
                    textVariant="caption1"
                    fontWeightVariant="regular"
                    c={color.neutral60}
                    truncate
                  >
                    {username}
                  </Text>
                </div>
              )}
              {isMenu && (
                <ActionIcon
                  actionIconsVariants={{
                    type: 'texted',
                    size: 'small',
                  }}
                >
                  {(size) => {
                    return <ChevronRightIcon width={size} height={size} />;
                  }}
                </ActionIcon>
              )}
            </div>
          </Tooltip>
        );
      }}
    </LoaderView>
  );
}
