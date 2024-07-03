import { Card, Container, Flex, Image as MantineImage } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import lamp from 'assets/illustration/lamp.svg';
// import logo from 'assets/illustration/logo.svg';
import okay from 'assets/illustration/okay.svg';
import typing from 'assets/illustration/typing.svg';
import breakpoints from 'common/breakpoint';
import Image from 'next/image';
import React from 'react';
import { color } from 'styles/color';

import LoginForm from './login-form';

export default function Login() {
  const isMobile = useMediaQuery(breakpoints.screenMaxLg);
  const card = (
    <Card
      mt={20}
      w="100%"
      maw={464}
      padding={isMobile ? 16 : 32}
      radius={isMobile ? 12 : 20}
      h="100%"
      style={{
        position: 'relative',
        zIndex: 3,
      }}
    >
      <LoginForm />
    </Card>
  );

  const typingComponent = (
    <MantineImage
      src={typing.src}
      w="100%"
      h="100%"
      bg={color.primary90}
      maw={isMobile ? 244 : 488}
      mah={isMobile ? 250 : 500}
      alt="lamp"
      style={
        isMobile
          ? {
              position: 'absolute',
              bottom: 0,
              left: 0,
              zIndex: 2,
            }
          : undefined
      }
    />
  );

  const okayComponent = (
    <MantineImage
      src={okay.src}
      w="100%"
      h="100%"
      bg={color.primary90}
      maw={isMobile ? 160 : 486}
      mah={isMobile ? 256 : 475}
      alt="lamp"
      style={
        isMobile
          ? {
              position: 'absolute',
              bottom: -35.5,
              right: 0,
              zIndex: 2,
            }
          : {
              position: 'relative',
              top: 66,
            }
      }
    />
  );
  return (
    <Container
      mih="100vh"
      mah="100vh"
      miw="100vw"
      bg={color.primary90}
      style={{
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        src="/logo.png"
        width={125}
        height={50}
        alt="logo"
        style={
          isMobile
            ? undefined
            : {
                position: 'absolute',
                top: 36,
                left: 36,
              }
        }
      />
      <Image
        src={lamp.src}
        width={isMobile ? 108 : 144}
        height={isMobile ? 109 : 144}
        alt="lamp"
        style={{
          position: 'absolute',
          top: 0,
        }}
      />
      {isMobile && typingComponent}
      {isMobile && okayComponent}
      {isMobile ? (
        card
      ) : (
        <Flex direction="row" w="100%" pos="relative" align="center">
          <Flex flex={1}>{typingComponent}</Flex>
          <Flex flex={1} h="fit-content">
            {card}
          </Flex>
          <Flex flex={1}>{okayComponent}</Flex>
        </Flex>
      )}
    </Container>
  );
}
