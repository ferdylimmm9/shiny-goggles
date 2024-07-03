import { DateInput, DateInputProps } from '@mantine/dates';
import { CalendarTodayIcon } from 'assets/svg';
import { classNames } from 'common/utils/string';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useController } from 'react-hook-form';

import { datePickerInputStyles } from './styles.css';
import { useFormState } from '../../form';

dayjs.locale('id');
dayjs.extend(customParseFormat);

export interface DateInputFieldProps extends Omit<DateInputProps, 'type'> {
  type: 'date';
  name: string;
  onAfterChange?: (value: Date | null) => void;
}

export function RawDateInput(props: DateInputProps) {
  const { className, valueFormat = 'DD/MM/YYYY', ...rest } = props;
  const dateParser = (value) => dayjs(value, valueFormat).toDate();

  return (
    <DateInput
      className={classNames(datePickerInputStyles, className)}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      radius={10}
      placeholder={valueFormat}
      valueFormat={valueFormat}
      dateParser={dateParser}
      rightSection={<CalendarTodayIcon width={20} height={20} />}
      disabled
      {...rest}
    />
  );
}

export default function DateInputField(props: DateInputFieldProps) {
  const { type, name, disabled, readOnly, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });
  const _disabled = disabled || readOnly || formState.disabled;

  const error = fieldState.error?.message;

  return (
    <RawDateInput
      {...rest}
      {...(field as any)}
      disabled={_disabled}
      value={field.value}
      onChange={(val) => {
        field.onChange(val);
        onAfterChange?.(val);
      }}
      error={error}
    />
  );
}
