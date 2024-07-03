import DateInputField, { DateInputFieldProps } from './date-input-field';
import FileInputField, { FileInputProps } from './file-input-field';
import NumberInputField, { NumberInputFieldProps } from './number-input-field';
import PasswordInputField, {
  PasswordInputFieldProps,
} from './password-input-field';
import RadioInputField, { RadioInputFieldProps } from './radio-input-field';
import SelectField, { SelectFieldProps } from './select-input-field';
import SubmitField, { SubmitFieldProps } from './submit-field/submit-field';
import SwitchField, { SwitchFieldProps } from './switch-input-field';
import TextInputField, { TextInputFieldProps } from './text-input-field';

export type InputProps =
  | TextInputFieldProps
  | PasswordInputFieldProps
  | DateInputFieldProps
  | NumberInputFieldProps
  | RadioInputFieldProps
  | SubmitFieldProps
  | SwitchFieldProps
  | FileInputProps
  | SelectFieldProps;

export default function Input(props: InputProps) {
  switch (props.type) {
    case 'date':
      return <DateInputField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'password':
      return <PasswordInputField {...props} />;
    case 'number':
      return <NumberInputField {...props} />;
    case 'radio':
      return <RadioInputField {...props} />;
    case 'switch':
      return <SwitchField {...props} />;
    case 'submit':
      return <SubmitField {...props} />;
    case 'files':
      return <FileInputField {...props} />;
    case 'text':
    case 'email':
    case 'tel':
    default:
      return <TextInputField {...props} />;
  }
}
