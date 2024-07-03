import 'reflect-metadata';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'common/query-client';
import { getTokenStorage } from 'common/utils/storage';
import AdminLayout from 'components/admin-layout';
import { NavigationEnum } from 'constant/navigation';
import RefreshTokenHandler from 'modules/components/refresh-token-handler';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { inter, poppins } from 'styles/font-family';

const theme = createTheme({});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  //generate layout
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return <AdminLayout>{page}</AdminLayout>;
    });

  const { prefetch, replace } = useRouter();

  React.useEffect(() => {
    prefetch(NavigationEnum.Login);
    prefetch(NavigationEnum.Profile);
    prefetch(NavigationEnum.ProfileChangePassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = getTokenStorage();
    if (!token) {
      //running

      replace(NavigationEnum.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${inter.variable} ${poppins.variable}`}>
      <Head>
        <title>Made By Caramel</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Notifications position="top-right" zIndex={1000} />
          <ModalsProvider
            modalProps={{
              centered: true,
            }}
          >
            <RefreshTokenHandler />
            {getLayout(<Component {...pageProps} />)}
          </ModalsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </div>
  );
}
