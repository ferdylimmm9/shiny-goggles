import * as Yup from 'yup';

export const MeFormSchema = () =>
  Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
  });

export type MeFormType = Yup.InferType<ReturnType<typeof MeFormSchema>>;

export const ChangePasswordFormSchema = () =>
  Yup.object({
    oldPassword: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .default('')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

export type ChangePasswordFormType = Yup.InferType<
  ReturnType<typeof ChangePasswordFormSchema>
>;
