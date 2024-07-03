import { yupResolver } from '@hookform/resolvers/yup';
import { Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useLogin } from 'api-hooks/auth/mutation';
import breakpoints from 'common/breakpoint';
import { setTokenStorage } from 'common/utils/storage';
import Form from 'components/form';
import Input from 'components/input';
import notification from 'components/notification';
import Text from 'components/text';
// import { NavigationEnum } from 'constant/navigation';
import { NavigationEnum } from 'constant/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormSchema, LoginFormType } from './login-form-type';

export default function LoginForm() {
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      password: '',
      username: '',
    };
  }, []);

  const resolver = yupResolver(LoginFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { mutateAsync: loginAsync } = useLogin();

  const { replace } = useRouter();

  const onSubmit = React.useCallback(
    async (values: LoginFormType) => {
      try {
        const result = await loginAsync(values);
        const expiresIn = 1 * 30 * 24 * 60 * 60 * 1000; // 1 month

        const data = {
          ...result.data,
          refreshTokenExpiredAt: new Date(new Date().getTime() + expiresIn),
        };

        setTokenStorage(data);

        notification.success({
          title: 'Login',
          message: 'Login Success',
        });

        replace(NavigationEnum.Home);
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Login',
            message: e.message,
          });
      }
    },
    [loginAsync, replace],
  );

  const isMobile = useMediaQuery(breakpoints.screenMaxLg);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Text
        textVariant={isMobile ? 'title3' : 'title1'}
        fontWeightVariant="semibold"
      >
        Login
      </Text>
      <Space h={isMobile ? 12 : 16} />

      <Input
        type="text"
        name="username"
        label="Username"
        placeholder="Username"
      />
      <Space h={isMobile ? 16 : 20} />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Space h={isMobile ? 32 : 48} />
      <Input type="submit" fullWidth>
        Login
      </Input>
    </Form>
  );
}
