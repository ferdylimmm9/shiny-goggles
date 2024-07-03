import { SimpleGrid } from '@mantine/core';
import * as Icons from 'assets/svg';
import React from 'react';

export default function IconExample() {
  const keys = Object.keys(Icons);
  return (
    <SimpleGrid cols={12}>
      {keys.map((key) => (
        <React.Fragment key={key}>{Icons[key]()}</React.Fragment>
      ))}
    </SimpleGrid>
  );
}
