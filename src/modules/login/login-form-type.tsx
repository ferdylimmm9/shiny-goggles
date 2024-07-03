import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const LoginFormSchema = () =>
  Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;

export type LoginMethodType = ReturnType<typeof useForm<LoginFormType>>;
