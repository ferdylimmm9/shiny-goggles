import { Image, SimpleGrid } from '@mantine/core';
import lamp from 'assets/illustration/lamp.svg';
import logo from 'assets/illustration/logo.svg';
import noData from 'assets/illustration/no-data.svg';
import okay from 'assets/illustration/okay.svg';
import typing from 'assets/illustration/typing.svg';

export default function IllustrationExample() {
  return (
    <SimpleGrid cols={3}>
      <Image src={lamp.src} />
      <Image src={logo.src} />
      <Image src={noData.src} />
      <Image src={okay.src} />
      <Image src={typing.src} />
    </SimpleGrid>
  );
}
