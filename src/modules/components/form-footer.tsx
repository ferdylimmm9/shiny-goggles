import { Grid, Space } from '@mantine/core';
import Border from 'components/border';
import Button, { ButtonProps } from 'components/button';
import Input from 'components/input';
import { useFormContext } from 'react-hook-form';

interface FormFooterProps {
  secondaryButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
  onClose?: () => void;
}

export default function FormFooter(props: FormFooterProps) {
  const { secondaryButtonProps, submitButtonProps } = props;
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <div>
      <Space h={24} />
      <Border />
      <Space h={24} />
      <Grid>
        {!isSubmitting && (
          <Grid.Col span={4}>
            <Button
              fullWidth
              buttonVariants={{
                color: 'secondary',
              }}
              onClick={props.onClose}
              {...secondaryButtonProps}
            >
              {secondaryButtonProps?.children ?? 'Cancel'}
            </Button>
          </Grid.Col>
        )}

        <Grid.Col span={isSubmitting ? 12 : 8}>
          <Input {...submitButtonProps} fullWidth type="submit" />
        </Grid.Col>
      </Grid>
    </div>
  );
}
