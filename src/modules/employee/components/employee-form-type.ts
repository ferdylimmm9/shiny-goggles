import { EmployeeModel } from 'api-hooks/employee/model';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const EmployeeFormSchema = () =>
  Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    status: Yup.boolean().default(true),
    password: Yup.string().default(''),
    permissions: Yup.array(Yup.string().default('')).default([]),
  });

export type EmployeeFormType = Yup.InferType<
  ReturnType<typeof EmployeeFormSchema>
> & {
  data?: EmployeeModel;
};

export type EmployeeMethodType = ReturnType<typeof useForm<EmployeeFormType>>;

export const EmployeeFilterFormSchema = () =>
  Yup.object({
    name: Yup.string().default(''),
    username: Yup.string().default(''),
    email: Yup.string().default(''),
    status: Yup.string().default(''),
    startAt: Yup.date().nullable(),
    endAt: Yup.date().nullable(),
  });

export type EmployeeFilterFormType = Yup.InferType<
  ReturnType<typeof EmployeeFilterFormSchema>
>;
