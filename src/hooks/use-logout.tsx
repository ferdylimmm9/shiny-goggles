import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRevoke } from 'api-hooks/auth/mutation';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import { clearMeStorage, clearTokenStorage } from 'common/utils/storage';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import { NavigationEnum } from 'constant/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { color } from 'styles/color';

export default function useLogout() {
  const logoutMutate = useRevoke();
  const { replace } = useRouter();

  const onLogout = React.useCallback(async () => {
    try {
      // setIsLoading(true);
      // await logoutMutate.mutateAsync({});
    } catch (e) {
      console.error(e);
    } finally {
      clearTokenStorage();
      clearMeStorage();
      queryClient.invalidateQueries();
      replace(NavigationEnum.Login);
      // setIsLoading(false);
      notification.success({
        title: 'Logout Account',
        message: 'Logout Account Success',
      });
    }
  }, [replace]);

  const onClickLogout = React.useCallback(() => {
    const modalId = `logout-modal`;
    const onClose = () => modals.close(modalId);

    modals.open({
      modalId,
      withCloseButton: false,
      children: (
        <>
          <Flex align="center" gap={8} mb={8}>
            <InfoIcon width={24} height={24} color={color.red40} />
            <Text textVariant="body1" fontWeightVariant="semibold">
              Logout
            </Text>
          </Flex>
          <Text mb={28}>Are you sure you want to logout ?</Text>
          <SimpleGrid cols={logoutMutate.isLoading ? 1 : 2}>
            {!logoutMutate.isLoading && (
              <Button
                onClick={onClose}
                buttonVariants={{
                  color: 'quaternary',
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              loading={logoutMutate.isLoading}
              onClick={async () => {
                await onLogout();
                onClose();
              }}
              buttonVariants={{
                color: 'primary',
              }}
            >
              Logout
            </Button>
          </SimpleGrid>
        </>
      ),
    });
  }, [logoutMutate.isLoading, onLogout]);

  return {
    ...logoutMutate,
    onLogout,
    onClickLogout,
  };
}
