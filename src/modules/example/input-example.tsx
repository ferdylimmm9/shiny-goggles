import { SimpleGrid } from '@mantine/core';
import { RawDateInput } from 'components/input/date-input-field';
import { RawNumberInput } from 'components/input/number-input-field';
import { RawPasswordInput } from 'components/input/password-input-field';
import { RawRadioInput } from 'components/input/radio-input-field';
import { RawSelect } from 'components/input/select-input-field';
import { RawTextInput } from 'components/input/text-input-field';

export default function InputExample() {
  return (
    <SimpleGrid cols={3}>
      <RawDateInput label="test" placeholder="test" />
      <RawNumberInput label="test" placeholder="test" />
      <RawPasswordInput label="test" placeholder="test" />
      <RawRadioInput
        label="test"
        data={[
          {
            value: 'test',
            label: 'test',
          },
          {
            value: 'test1',
            label: 'test1',
          },
        ]}
      />
      <RawSelect label="test" placeholder="test" data={['test', 'test1']} />
      <RawTextInput label="test" placeholder="test" />
    </SimpleGrid>
  );
}
