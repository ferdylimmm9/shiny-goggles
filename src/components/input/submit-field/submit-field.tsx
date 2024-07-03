import Button, { ButtonProps } from 'components/button';
import { useFormContext } from 'react-hook-form';

export interface SubmitFieldProps extends ButtonProps {
  type: 'submit';
}

export default function SubmitField(props: SubmitFieldProps) {
  const { children = 'Save', ...rest } = props;
  const { formState } = useFormContext();
  return (
    <Button
      {...rest}
      type="submit"
      children={children}
      loading={formState.isSubmitting}
      disabled={formState.isSubmitting}
    />
  );
}
